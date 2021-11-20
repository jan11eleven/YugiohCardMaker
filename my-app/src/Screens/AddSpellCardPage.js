import domtoimage from "dom-to-image";
import { React, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { bindActionCreators } from "redux";
import { actionCreators } from "../redux/index";
import { spellTypeArr } from "../card_meta_data/index";
import NormalSpell from "../cards_img/NormalSpell.webp";
import FieldSpell from "../cards_img/FieldSpell.webp";
import EquipSpell from "../cards_img/EquipSpell.webp";
import QuickSpell from "../cards_img/QuickSpell.webp";
import RitualSpell from "../cards_img/RitualSpell.webp";
import ContinuousSpell from "../cards_img/ContinuousSpell.webp";
import dataURLtoFile from "../cards_img/dataUrlToFile";
import AllPageTitles from "../Components/AllPageTitles";
import { CheckCircleIcon } from "@heroicons/react/solid";
import ErrorMessage from "../Components/ErrorMessage";

function AddSpellCardPage() {
  const dispatch = useDispatch();
  const spellImgContainer = useRef(null);
  const regex = /^[A-Za-z0-9 .,!-]*$/;

  const { addSpellCard } = bindActionCreators(actionCreators, dispatch);

  const history = useHistory();

  const { loginUser } = useSelector((state) => state);

  const [selectedImageError, setSelectedImageError] = useState(undefined);
  const [spellNameError, setSpellNameError] = useState(undefined);
  const [spellEffError, setSpellEffError] = useState(undefined);

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

        if (!selectedImage.name) {
          setSelectedImageError("Spell Image is required!");
          alert("Please select image for the card.");
          return;
        }

        if (spellName.length === 0) {
          setSpellNameError("Spell Name is required!");
          return;
        }

        if (spellEff.length === 0) {
          setSpellEffError("Spell Effect is required!");
          return;
        }

        const spellCard = {
          SpellName: spellName,
          SpellEff: spellEff,
          SpellType: spellType,
          CardType: cardType,
          CardAuthor: cardAuthor,
        };

        addSpellCard({ spellCard, selectedImage, fileData });

        history.push("/spells");
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
      setSpellName(e.target.value);
      setSpellNameError("Spell Name is invalid!");
    }
  };

  const setSpellEffHandler = (e) => {
    if (e.target.value.length > 168) {
      setSpellEffError("Characters shouldn't exceed in 168");
    } else if (regex.test(e.target.value)) {
      setSpellEff(e.target.value);
      setSpellEffError(undefined);
    } else {
      setSpellEff(e.target.value);
      setSpellEffError("Spell Effect is invalid!");
    }
  };

  return (
    <div>
      <AllPageTitles title="Add Spell" />
      <div className="add-card-form-container">
        <form
          onSubmit={addSpellCardForm}
          encType="multipart/form-data"
          className="add-card-form"
        >
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
          {selectedImageError ? (
            <ErrorMessage error={selectedImageError} />
          ) : (
            ""
          )}
          <div>
            <label className="add-card-label">Spell Name: </label>
            <input
              value={spellName}
              onChange={setSpellNameHandler}
              className="add-card-input-textbox"
              placeholder="Spell Name"
            />
            {spellNameError ? <ErrorMessage error={spellNameError} /> : ""}
          </div>
          <div>
            <label className="add-card-label">Spell Type: </label>
            <select
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
            <label className="add-card-label">Effect: </label>
            <textarea
              value={spellEff}
              onChange={setSpellEffHandler}
              row="4"
              col="50"
              className="add-card-textarea"
            ></textarea>
            {spellEffError ? <ErrorMessage error={spellEffError} /> : ""}
          </div>
          <button
            className={
              spellNameError || spellEffError
                ? "add-card-btn-disabled"
                : "add-card-btn"
            }
            disabled={spellNameError || spellEffError ? true : false}
          >
            <CheckCircleIcon className="CheckCircleIconStyles" />
            Submit
          </button>
        </form>
        <div className="add-card-converted">
          <div className="card-container" ref={spellImgContainer}>
            <img src={selectSpellTypeImg()} className="card" />
            <div className="spell-card-name">{spellName}</div>
            {file && (
              <div className="spell-card-img-container">
                <img className="spell-card-img" alt="Spell" src={file} />
              </div>
            )}
            <div className="spell-card-eff">{spellEff}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddSpellCardPage;
