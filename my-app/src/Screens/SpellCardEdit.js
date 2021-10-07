import { React, useState, useEffect, useRef } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { spellTypeArr } from "../card_meta_data/index";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../redux/index";
import domtoimage from "dom-to-image";
import NormalSpell from "../cards_img/NormalSpell.png";
import FieldSpell from "../cards_img/FieldSpell.png";
import EquipSpell from "../cards_img/EquipSpell.png";
import QuickSpell from "../cards_img/QuickSpell.png";
import RitualSpell from "../cards_img/RitualSpell.png";
import ContinuousSpell from "../cards_img/ContinuousSpell.png";
import dataURLtoFile from "../cards_img/dataUrlToFile";

function SpellCardEdit() {
  const { card_id } = useParams();
  const dispatch = useDispatch();
  const spellImgContainer = useRef(null);
  const { editSpellCard } = bindActionCreators(actionCreators, dispatch);

  const [file, setFile] = useState(undefined);
  const [selectedImage, setSelectedImage] = useState({});
  const [spellImage, setSpellImage] = useState("");
  const [spellName, setSpellName] = useState("");
  const [spellType, setSpellType] = useState("");
  const [spellEff, setSpellEff] = useState("");
  const [cardType, setCardType] = useState("Spell");
  const [cardAuthor, setCardAuthor] = useState("");
  const [convertedImage, setConvertedImage] = useState("");

  // need to implement redux in app in order to maintain the data
  // get card on load
  useEffect(() => {
    const fetchCardInfo = async () => {
      const { data } = await axios.get("/api/cards/spells/" + card_id);

      setSpellImage(data.SpellImage);
      setSpellName(data.SpellName);
      setSpellType(data.SpellType);
      setSpellEff(data.SpellEff);
      setCardType(data.CardType);
      setCardAuthor(data.CardAuthor);
      setConvertedImage(data.ConvertedImage);
    };

    fetchCardInfo();
  }, [card_id]);

  const editSpellCardForm = (e) => {
    e.preventDefault();

    convertDomToImg();
  };

  const imageChangeHandler = (e) => {
    if (e.target.files[0]) {
      setSelectedImage(e.target.files[0]);
      setFile(URL.createObjectURL(e.target.files[0]));
    }
  };

  const selectSpellTypeImg = () => {
    if (spellType === "Normal") return NormalSpell;
    if (spellType === "Continuous") return ContinuousSpell;
    if (spellType === "Equip") return EquipSpell;
    if (spellType === "Ritual") return RitualSpell;
    if (spellType === "Field") return FieldSpell;
    if (spellType === "Quick") return QuickSpell;
  };

  const convertDomToImg = () => {
    domtoimage
      .toPng(spellImgContainer.current)
      .then(function (dataUrl) {
        const fileData = dataURLtoFile(dataUrl, "spellImg.png");

        const spellCard = {
          _id: card_id,
          SpellImage: spellImage,
          SpellName: spellName,
          SpellType: spellType,
          SpellEff: spellEff,
          CardType: cardType,
          CardAuthor: cardAuthor,
          ConvertedImage: convertedImage,
        };

        editSpellCard({ spellCard, selectedImage, fileData });
      })
      .catch(function (error) {
        console.error("oops, something went wrong!", error);
      });
  };

  return (
    <div>
      <form onSubmit={editSpellCardForm}>
        <h1>Edit Spell Card</h1>
        <div>
          <label>Change Image: </label>
          <input
            accept="image/*"
            type="file"
            name="file"
            onChange={imageChangeHandler}
          />
        </div>
        <div>
          <label>Spell Name: </label>
          <input
            value={spellName}
            onChange={(e) => setSpellName(e.target.value)}
          />
        </div>
        <div>
          <label>Spell Type: </label>
          <select
            value={spellType}
            onChange={(e) => setSpellType(e.target.value)}
          >
            {spellTypeArr.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Effect: </label>
          <textarea
            value={spellEff}
            onChange={(e) => setSpellEff(e.target.value)}
            row="4"
            col="50"
          ></textarea>
        </div>
        <button>Submit</button>
      </form>

      <div className="card-container" ref={spellImgContainer}>
        <img src={selectSpellTypeImg()} className="card" />
        <div className="spell-card-name">{spellName}</div>
        {
          <div className="spell-card-img-container">
            <img
              className="spell-card-img"
              alt="Spell"
              src={file ? file : "/image/" + spellImage}
            />
          </div>
        }
        <div className="trap-card-eff">{spellEff}</div>
      </div>
    </div>
  );
}

export default SpellCardEdit;
