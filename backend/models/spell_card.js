const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SpellCardSchema = new Schema(
  {
    SpellImage: {
      type: String,
      required: true,
    },
    SpellName: {
      type: String,
      required: true,
    },
    SpellType: {
      type: String,
      required: true,
    },
    SpellEff: {
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

const SpellCard = mongoose.model("SpellCards", SpellCardSchema);

module.exports = SpellCard;
