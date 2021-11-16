import { React, useState, useEffect, useRef } from "react";
import axios from "axios";
import { useParams, useHistory } from "react-router-dom";
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
import AllPageTitles from "../Components/AllPageTitles";
import { CheckCircleIcon } from "@heroicons/react/solid";
import ErrorMessage from "../Components/ErrorMessage";

function SpellCardEdit() {
  const { card_id } = useParams();
  const dispatch = useDispatch();
  const spellImgContainer = useRef(null);
  const { editSpellCard } = bindActionCreators(actionCreators, dispatch);

  const regex = /^[A-Za-z0-9 .,!-]*$/;

  const history = useHistory();

  const [spellNameError, setSpellNameError] = useState(undefined);
  const [spellEffError, setSpellEffError] = useState(undefined);

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

        if (spellEff.length === 0) {
          setSpellEffError("Spell Effect is required!");
          return;
        }

        if (spellName.length === 0) {
          setSpellNameError("Spell Name is required!");
          return;
        }

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

        history.push("/spells" + card_id);
      })
      .catch(function (error) {
        console.error("oops, something went wrong!", error);
      });
  };

  const setSpellNameHandler = (e) => {
    if (e.target.value.length > 20) {
      setSpellNameError("Characters shouldn't exceed in 20");
    } else if (regex.test(e.target.value)) {
      setSpellName(e.target.value);
      setSpellNameError(undefined);
    } else {
      setSpellNameError(
        '"' +
          e.target.value[e.target.value.length - 1] +
          '"' +
          " character is not allowed!"
      );
    }
  };

  const setSpellEffHandler = (e) => {
    if (e.target.value.length > 168) {
      setSpellEffError("Characters shouldn't exceed in 168");
    } else if (regex.test(e.target.value)) {
      setSpellEff(e.target.value);
      setSpellEffError(undefined);
    } else {
      setSpellEffError(
        '"' +
          e.target.value[e.target.value.length - 1] +
          '"' +
          " character is not allowed!"
      );
    }
  };

  return (
    <div>
      <AllPageTitles title="Edit Spell Card" />
      <div className="add-card-form-container">
        <form onSubmit={editSpellCardForm} className="add-card-form">
          <div className="flex w-full items-center justify-center">
            <label className="w-64 flex flex-col items-center px-4 py-6 text-green-400 rounded-lg tracking-wide uppercase border border-green-400 cursor-pointer hover:bg-green-400 hover:text-gray-100">
              <svg
                className="w-8 h-8"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
              </svg>
              <span className="mt-2 text-base leading-normal">
                {selectedImage.name ? selectedImage.name : "Select image"}
              </span>
              <input
                type="file"
                className="hidden"
                name="file"
                accept="image/*"
                onChange={imageChangeHandler}
              />
            </label>
          </div>
          <div>
            <label className="add-card-input-label">Spell Name: </label>
            <input
              value={spellName}
              onChange={setSpellNameHandler}
              className="add-card-input-textbox"
            />
            {spellNameError ? <ErrorMessage error={spellNameError} /> : ""}
          </div>
          <div>
            <label className="add-card-input-label">Spell Type: </label>
            <select
              value={spellType}
              onChange={(e) => setSpellType(e.target.value)}
              className="add-card-select"
            >
              {spellTypeArr.map((type) => (
                <option key={type} value={type} className="add-card-option">
                  {type}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="add-card-input-label">Effect: </label>
            <textarea
              value={spellEff}
              onChange={setSpellEffHandler}
              row="4"
              col="50"
              className="add-card-textarea"
            ></textarea>
            {spellEffError ? <ErrorMessage error={spellEffError} /> : ""}
          </div>
          <button className="add-card-btn">
            <CheckCircleIcon className="CheckCircleIconStyles" />
            Submit
          </button>
        </form>
        <div className="add-card-converted">
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
      </div>
    </div>
  );
}

export default SpellCardEdit;
