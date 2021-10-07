import domtoimage from "dom-to-image";
import { React, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../redux/index";
import { spellTypeArr } from "../card_meta_data/index";
import NormalSpell from "../cards_img/NormalSpell.png";
import FieldSpell from "../cards_img/FieldSpell.png";
import EquipSpell from "../cards_img/EquipSpell.png";
import QuickSpell from "../cards_img/QuickSpell.png";
import RitualSpell from "../cards_img/RitualSpell.png";
import ContinuousSpell from "../cards_img/ContinuousSpell.png";
import dataURLtoFile from "../cards_img/dataUrlToFile";

function AddSpellCardPage() {
  const dispatch = useDispatch();
  const spellImgContainer = useRef(null);

  const { addSpellCard } = bindActionCreators(actionCreators, dispatch);

  const { loginUser } = useSelector((state) => state);

  const [file, setFile] = useState(undefined);
  const [selectedImage, setSelectedImage] = useState({});
  const [spellName, setSpellName] = useState("");
  const [spellEff, setSpellEff] = useState("");
  const [spellType, setSpellType] = useState("Normal");
  const [cardType] = useState("Spell");
  const [cardAuthor] = useState(loginUser.credentials.username);

  const addSpellCardForm = (e) => {
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
          SpellName: spellName,
          SpellEff: spellEff,
          SpellType: spellType,
          CardType: cardType,
          CardAuthor: cardAuthor,
        };

        addSpellCard({ spellCard, selectedImage, fileData });
      })
      .catch(function (error) {
        console.error("oops, something went wrong!", error);
      });
  };

  return (
    <div>
      <form onSubmit={addSpellCardForm} encType="multipart/form-data">
        <h1>Add Spell</h1>
        <div>
          <label>Choose Image: </label>
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
          <select onChange={(e) => setSpellType(e.target.value)}>
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
        {file && (
          <div className="spell-card-img-container">
            <img className="spell-card-img" alt="Spell" src={file} />
          </div>
        )}
        <div className="trap-card-eff">{spellEff}</div>
      </div>
    </div>
  );
}

export default AddSpellCardPage;
