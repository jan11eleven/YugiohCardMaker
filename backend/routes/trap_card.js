const express = require("express");
const routes = express.Router();
const TrapCardModel = require("../models/trap_card");

// @routes POST / - create 1 trap card
routes.post("/", globalVariable.upload.array("file", 12), (req, res) => {
  const trapCard = new TrapCardModel({
    TrapImage: req.files[0].filename,
    TrapName: req.body.TrapName,
    TrapType: req.body.TrapType,
    TrapEff: req.body.TrapEff,
    CardType: req.body.CardType,
    CardAuthor: req.body.CardAuthor,
    ConvertedImage: req.files[1].filename,
  });

  trapCard
    .save()
    .then((result) => {
      res.status(201).send(result);
    })
    .catch((err) => {
      res.send({ message: err });
    });
});

// @routes GET / get all trap cards
routes.get("/", async (req, res) => {
  try {
    const cards = await TrapCardModel.find({ CardAuthor: req.user.Username });

    if (cards.length !== 0) {
      globalVariable.gfs.files.find().toArray((err, files) => {
        if (!files || files.length === 0) {
          return res.status(404).json({ error: "No files exists!" });
        }
        res.send({ cards, files });
      });
    } else {
      res.send({ cards: [] });
    }
  } catch (err) {
    res.send({ message: err.stack });
  }
});

// @routes GET /:id get 1 trap card
routes.get("/:id", async (req, res) => {
  try {
    const data = await TrapCardModel.findOne(
      { _id: req.params.id },
      { useFindAndModify: false }
    );

    if (data) {
      res.status(200).send(data);
    } else {
      res.status(404).send({ message: "Card doesn't exists!" });
    }
  } catch (err) {
    res.send({ message: err });
  }
});

// @routes /:id PATCH 1 trap card
routes.patch(
  "/:id",
  globalVariable.upload.array("file", 12),
  async (req, res) => {
    const cardUpdated = {};
    if (req.files.length === 2) {
      // deletes old card image
      globalVariable.gfs.remove(
        { _id: req.body.TrapImage, root: "uploads" },
        (err, gridStore) => {
          if (err) {
            return res.status(404).json({ error: err });
          }
        }
      );
      cardUpdated.TrapImage = req.files[0].filename;
      cardUpdated.ConvertedImage = req.files[1].filename;
    } else {
      cardUpdated.TrapImage = req.body.TrapImage;
      cardUpdated.ConvertedImage = req.files[0].filename;
    }

    cardUpdated.TrapName = req.body.TrapName;
    cardUpdated.TrapType = req.body.TrapType;
    cardUpdated.TrapEff = req.body.TrapEff;
    cardUpdated.CardType = req.body.CardType;
    cardUpdated.CardAuthor = req.body.CardAuthor;

    console.log(req.files);
    console.log(req.body);
    console.log(cardUpdated);
    // deletes old converted image
    globalVariable.gfs.remove(
      { filename: req.body.ConvertedImage, root: "uploads" },
      (err, gridStore) => {
        if (err) {
          return res.status(404).json({ error: err });
        }
      }
    );

    try {
      const data = await TrapCardModel.findByIdAndUpdate(
        { _id: req.params.id },
        cardUpdated,
        { new: true, useFindAndModify: false }
      );
      res.send(data);
    } catch (err) {
      res.status(404).send({ message: err });
    }
  }
);

// @routes /:id DELETE 1 card
routes.delete("/:id", async (req, res) => {
  try {
    const data = await TrapCardModel.findByIdAndRemove(
      {
        _id: req.params.id,
      },
      { useFindAndModify: false }
    );
    if (data) {
      res.send(data);
      globalVariable.gfs.remove(
        { _id: data.TrapImage, root: "uploads" },
        (err, gridStore) => {
          if (err) {
            return res.status(404).json({ error: err });
          }
        }
      );

      globalVariable.gfs.remove(
        { filename: data.ConvertedImage, root: "uploads" },
        (err, gridStore) => {
          if (err) {
            return res.status(404).json({ error: err });
          }
        }
      );
    } else {
      res.status(404).send({ message: "Card doesn't exist!" });
    }
  } catch (err) {
    res.send({ message: err });
  }
});

module.exports = routes;
