const express = require("express");
const routes = express.Router();
const MonsterCardModel = require("../models/monster_card");

// @routes POST / - create 1 monster card
routes.post("/", globalVariable.upload.single("file"), (req, res) => {
  const monsterCard = new MonsterCardModel({
    MonsterImage: req.file.filename,
    MonsterName: req.body.MonsterName,
    CardType: req.body.CardType,
    MonsterType: req.body.MonsterType,
    MonsterRace: req.body.MonsterRace,
    MonsterIsNormal: req.body.MonsterIsNormal,
    MonsterEffDesc: req.body.MonsterEffDesc,
    MonsterAttribute: req.body.MonsterAttribute,
    MonsterStar: req.body.MonsterStar,
    MonsterAttack: req.body.MonsterAttack,
    MonsterDefense: req.body.MonsterDefense,
    CardAuthor: req.body.CardAuthor,
  });

  monsterCard
    .save()
    .then((result) => {
      res.status(201).send(result);
    })
    .catch((err) => {
      res.send({ error: err.message });
    });
});

// @routes GET / get all monster cards
routes.get("/", async (req, res) => {
  try {
    const cards = await MonsterCardModel.find({
      CardAuthor: req.user.Username,
    });
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

// @routes GET /:id get 1 monster card
routes.get("/:id", async (req, res) => {
  try {
    const data = await MonsterCardModel.findOne(
      { _id: req.params.id },
      { useFindAndModify: false }
    );

    if (data) {
      res.status(200).send(data);
    } else {
      res.status(404).send({ message: "Card doen't exists!" });
    }
  } catch (err) {
    res.send({ message: err });
  }
});

// @routes /:id PATCH 1 monster card
routes.patch("/:id", globalVariable.upload.single("file"), async (req, res) => {
  const cardUpdated = {};
  if (req.file != null) {
    globalVariable.gfs.remove(
      { _id: req.body.MonsterImage, root: "uploads" },
      (err, gridStore) => {
        if (err) {
          return res.status(404).json({ error: err });
        }
      }
    );
    cardUpdated.MonsterImage = req.file.filename;
  } else {
    cardUpdated.MonsterImage = req.body.MonsterImage;
  }
  cardUpdated.MonsterName = req.body.MonsterName;
  cardUpdated.CardType = req.body.CardType;
  cardUpdated.MonsterRace = req.body.MonsterRace;
  cardUpdated.MonsterType = req.body.MonsterType;
  cardUpdated.MonsterEffDesc = req.body.MonsterEffDesc;
  cardUpdated.MonsterAttribute = req.body.MonsterAttribute;
  cardUpdated.MonsterStar = req.body.MonsterStar;
  cardUpdated.MonsterAttack = req.body.MonsterAttack;
  cardUpdated.MonsterDefense = req.body.MonsterDefense;
  cardUpdated.CardAuthor = req.body.CardAuthor;

  try {
    const data = await MonsterCardModel.findByIdAndUpdate(
      { _id: req.params.id },
      cardUpdated,
      { new: true, useFindAndModify: false }
    );
    res.send(data);
  } catch (err) {
    res.status(404).send({ message: err });
  }
});

// @routes /:id DELETE 1 card
routes.delete("/:id", async (req, res) => {
  try {
    const data = await MonsterCardModel.findByIdAndRemove(
      {
        _id: req.params.id,
      },
      { useFindAndModify: false }
    );
    if (data) {
      res.send(data);
      globalVariable.gfs.remove(
        { _id: data.MonsterImage, root: "uploads" },
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
