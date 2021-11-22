const express = require("express");
const path = require("path");
const app = express();
const port = process.env.PORT || 5000;
require("dotenv").config({ path: "./backend/.env" });
const mongoose = require("mongoose");
const multer = require("multer");
const { GridFsStorage } = require("multer-gridfs-storage");
const Grid = require("gridfs-stream");
const crypto = require("crypto");
const passport = require("passport");
const flash = require("express-flash");
const session = require("express-session");
const initializePassport = require("./passport-config");

initializePassport(passport);

Grid.mongo = mongoose.mongo;
let gfs;

global.globalVariable = {
  gfs: undefined,
  upload: undefined,
  storage: undefined,
};

// connect to db
const mongodbURI =
  "mongodb+srv://" +
  process.env.MONGODB_PW +
  "@cluster0.gqe5d.mongodb.net/YugiohCardDB?retryWrites=true&w=majority";

mongoose.connect(mongodbURI, { useNewUrlParser: true });

const conn = mongoose.createConnection(mongodbURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

conn.once("open", function () {
  gfs = Grid(conn.db);
  gfs.collection("uploads");

  globalVariable.gfs = gfs;
  // all set!
  console.log("Connected to MongoDB");
});
// create storage engine
const storage = new GridFsStorage({
  url: mongodbURI,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err);
        }
        const filename = buf.toString("hex") + path.extname(file.originalname);
        const fileInfo = {
          filename: filename,
          bucketName: "uploads",
        };
        resolve(fileInfo);
      });
    });
  },
});

const upload = multer({
  storage,
  limits: {
    fileSize: 1024 * 1024 * 10,
  },
});

globalVariable.upload = upload;
globalVariable.storage = storage;

//@route GET /files/:id single file object
app.get("/image/:id", (req, res) => {
  globalVariable.gfs.files.findOne({ filename: req.params.id }, (err, file) => {
    if (!file || file.length === 0) {
      return res.status(404).json({ error: "No file exists!" });
    }
    // check if image type
    if (file.contentType === "image/jpeg" || file.contentType === "image/png") {
      //read the image
      const readstream = globalVariable.gfs.createReadStream(file.filename);
      readstream.pipe(res);
    } else {
      res.status(400).send({ error: "Not an image" });
    }
  });
});

// @routes GET /files file object
app.get("/images", (req, res) => {
  globalVariable.gfs.files.find().toArray((err, files) => {
    if (!files || files.length === 0) {
      return res.status(404).json({ error: "No files exists!" });
    }

    return res.json(files);
  });
});

// middlewares
app.use(express.json());
app.use(flash());
app.use(session({ secret: "secret", resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use("/api/cards/monsters", require("./routes/monster_card"));
app.use("/api/cards/spells", require("./routes/spell_card"));
app.use("/api/cards/traps", require("./routes/trap_card"));
app.use("/api/users", require("./routes/user"));

// route error handler
// app.get("*", (req, res) => {
//   res.send({ error: 404, message: "Route doesn't exists!" }).status(404);
// });

// const __dirname = path.resolve();
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(path.resolve(), "/my-app/build")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(path.resolve(), "my-app", "build", "index.html"));
  });
}

app.listen(port, () => {
  console.log("LISTENING AT PORT " + port);
});
