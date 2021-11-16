const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CardsSchema = new Schema(
  {
    MonsterImage: {
      type: String,
    },
    MonsterName: {
      type: String,
      required: true,
    },
    MonsterType: {
      type: String,
      required: true,
    },
    MonsterRace: {
      type: String,
      required: true,
    },
    MonsterIsNormal: {
      type: Boolean,
      required: true,
    },
    MonsterEffDesc: {
      type: String,
      required: true,
    },
    MonsterAttribute: {
      type: String,
      required: true,
    },
    MonsterStar: {
      type: Number,
      required: true,
    },
    MonsterAttack: {
      type: Number,
      required: true,
    },
    MonsterDefense: {
      type: Number,
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

const MonsterCards = mongoose.model("MonsterCards", CardsSchema);

module.exports = MonsterCards;
