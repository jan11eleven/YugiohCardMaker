const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TrapCardSchema = new Schema(
  {
    TrapImage: {
      type: String,
      required: true,
    },
    TrapName: {
      type: String,
      required: true,
    },
    TrapType: {
      type: String,
      required: true,
    },
    TrapEff: {
      type: String,
      required: true,
    },
    CardType: {
      type: String,
      required: true,
    },
    CardAuthor: {
      type: String,
      required: true,
    },
    ConvertedImage: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const TrapCardModel = mongoose.model("TrapCards", TrapCardSchema);

module.exports = TrapCardModel;
