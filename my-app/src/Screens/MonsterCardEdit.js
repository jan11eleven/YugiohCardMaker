import { React, useState, useEffect, useRef } from "react";
import axios from "axios";
import { useParams, useHistory } from "react-router-dom";
import domtoimage from "dom-to-image";
import {
  monsterTypeArr,
  monsterAttributeArr,
  monsterRaceArr,
} from "../card_meta_data/index";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../redux/index";
import NormalMonster from "../cards_img/monster_cards/NormalMonster.webp";
import EffectMonster from "../cards_img/monster_cards/EffectMonster.webp";
import FusionMonster from "../cards_img/monster_cards/FusionMonster.webp";
import RitualMonster from "../cards_img/monster_cards/RitualMonster.webp";
import SynchroMonster from "../cards_img/monster_cards/SynchroMonster.webp";
import Fire from "../cards_img/monsterAttrib/Fire.webp";
import Dark from "../cards_img/monsterAttrib/Dark.webp";
import Water from "../cards_img/monsterAttrib/Water.webp";
import Light from "../cards_img/monsterAttrib/Light.webp";
import Earth from "../cards_img/monsterAttrib/Earth.webp";
import Wind from "../cards_img/monsterAttrib/Wind.webp";
import Divine from "../cards_img/monsterAttrib/Divine.webp";
import Star from "../cards_img/Star.webp";
import dataURLtoFile from "../cards_img/dataUrlToFile";
import AllPageTitles from "../Components/AllPageTitles";
import { CheckCircleIcon } from "@heroicons/react/solid";
import ErrorMessage from "../Components/ErrorMessage";

function MonsterCardEdit() {
  const { card_id } = useParams();
  const dispatch = useDispatch();
  const { editMonsterCard } = bindActionCreators(actionCreators, dispatch);
  const monsterImgContainer = useRef(null);

  const regex = /^[A-Za-z0-9 .,!-]*$/;

  const history = useHistory();
  //error messages
  const [monsterEffDescError, setMonsterEffDescError] = useState(undefined);
  const [monsterNameError, setMonsterNameError] = useState(undefined);
  const [selectedImageError, setSelectedImageError] = useState(undefined);

  const [file, setFile] = useState(undefined);
  const [selectedImage, setSelectedImage] = useState({});
  const [monsterImage, setMonsterImage] = useState("");
  const [monsterName, setMonsterName] = useState("");
  const [cardType, setCardType] = useState("Monster");
  const [monsterType, setMonsterType] = useState("Normal");
  const [monsterRace, setMonsterRace] = useState(monsterRaceArr[0]);
  const [monsterIsNormal, setMonsterIsNormal] = useState(true);
  const [monsterEffDesc, setMonsterEffDesc] = useState("");
  const [monsterAttribute, setMonsterAttribute] = useState("Dark");
  const [monsterStar, setMonsterStar] = useState(1);
  const [monsterAttack, setMonsterAttack] = useState(0);
  const [monsterDefense, setMonsterDefense] = useState(0);
  const [cardAuthor, setCardAuthor] = useState("");
  const [convertedImage, setConvertedImage] = useState("");

  // get card on load
  useEffect(() => {
    const fetchCardInfo = async () => {
      const { data } = await axios.get("/api/cards/monsters/" + card_id);

      setMonsterImage(data.MonsterImage);
      setMonsterName(data.MonsterName);
      setCardType(data.CardType);
      setMonsterType(data.MonsterType);
      setMonsterRace(data.MonsterRace);
      setMonsterIsNormal(data.MonsterIsNormal);
      setMonsterEffDesc(data.MonsterEffDesc);
      setMonsterAttribute(data.MonsterAttribute);
      setMonsterStar(data.MonsterStar);
      setMonsterAttack(data.MonsterAttack);
      setMonsterDefense(data.MonsterDefense);
      setCardAuthor(data.CardAuthor);
      setConvertedImage(data.ConvertedImage);
    };

    fetchCardInfo();
  }, [card_id]);

  const editMonsterCardForm = (e) => {
    e.preventDefault();

    convertDomToImg();
  };

  const convertDomToImg = () => {
    domtoimage
      .toPng(monsterImgContainer.current)
      .then(function (dataUrl) {
        const fileData = dataURLtoFile(dataUrl, "monsterImg.png");

        if (monsterName.length === 0) {
          setMonsterNameError("Monster Name is required!");
          return;
        }

        if (monsterEffDesc.length === 0) {
          setMonsterEffDescError("Monster Description is required!");
          return;
        }

        const monsterCard = {
          _id: card_id,
          MonsterImage: monsterImage,
          MonsterName: monsterName,
          CardType: cardType,
          MonsterType: monsterType,
          MonsterRace: monsterRace,
          MonsterIsNormal: monsterIsNormal,
          MonsterEffDesc: monsterEffDesc,
          MonsterAttribute: monsterAttribute,
          MonsterStar: monsterStar,
          MonsterAttack: monsterAttack,
          MonsterDefense: monsterDefense,
          CardAuthor: cardAuthor,
          ConvertedImage: convertedImage,
        };

        editMonsterCard({ monsterCard, selectedImage, fileData });

        history.push("/monsters/" + card_id);
      })
      .catch(function (error) {
        console.error("oops, something went wrong!", error);
      });
  };

  const imageChangeHandler = (e) => {
    if (e.target.files[0]) {
      setSelectedImage(e.target.files[0]);
      setFile(URL.createObjectURL(e.target.files[0]));
    }
  };

  const selectMonsterTypeImg = () => {
    if (monsterType === "Normal") return NormalMonster;
    if (monsterType === "Effect") return EffectMonster;
    if (monsterType === "Fusion") return FusionMonster;
    if (monsterType === "Ritual") return RitualMonster;
    if (monsterType === "Synchro") return SynchroMonster;
  };

  const selectMonsterAttributeImg = () => {
    if (monsterAttribute === "Fire") return Fire;
    if (monsterAttribute === "Wind") return Wind;
    if (monsterAttribute === "Water") return Water;
    if (monsterAttribute === "Dark") return Dark;
    if (monsterAttribute === "Light") return Light;
    if (monsterAttribute === "Divine") return Divine;
    if (monsterAttribute === "Earth") return Earth;
  };

  const selectMonsterAttributeClassName = () => {
    if (selectMonsterAttributeImg() === Earth) return "Earth";
    if (selectMonsterAttributeImg() === Fire) return "Fire";
    if (selectMonsterAttributeImg() === Wind) return "Wind";
    if (selectMonsterAttributeImg() === Water) return "Water";
    if (selectMonsterAttributeImg() === Dark) return "Dark";
    if (selectMonsterAttributeImg() === Light) return "Light";
    if (selectMonsterAttributeImg() === Divine) return "Divine";
  };

  const setMonsterTypeHandler = (e) => {
    setMonsterType(e.target.value);
    if (
      e.target.value === "Normal" &&
      e.target.value !== "Fusion" &&
      e.target.value !== "Ritual" &&
      e.target.value !== "Synchro"
    ) {
      setMonsterIsNormal(true);
    } else {
      setMonsterIsNormal(false);
    }
  };

  useEffect(() => {
    setMonsterStarHandler();
  }, [monsterStar]);

  const setMonsterStarHandler = () => {
    let array = [];
    for (let i = 0; i < monsterStar; i++) {
      array.push(i);
    }

    return array;
  };

  const setMonsterNameHandler = (e) => {
    if (e.target.value.length > 20) {
      setMonsterNameError("Characters shouldn't exceed in 20");
    } else if (regex.test(e.target.value)) {
      setMonsterName(e.target.value);
      setMonsterNameError(undefined);
    } else {
      setMonsterName(e.target.value);
      setMonsterNameError("Monster Name is invalid!");
    }
  };

  const setMonsterEffDescHandler = (e) => {
    if (e.target.value.length > 158) {
      setMonsterEffDescError("Characters shouldn't exceed in 158");
    } else if (regex.test(e.target.value)) {
      setMonsterEffDesc(e.target.value);
      setMonsterEffDescError(undefined);
    } else {
      setMonsterEffDesc(e.target.value);
      setMonsterEffDescError("Monster Effect is invalid!");
    }
  };

  return (
    <div>
      <AllPageTitles title="Edit Monster Card" />
      <div className="add-card-form-container">
        <form onSubmit={editMonsterCardForm} className="add-card-form">
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
                {selectedImage.name ? selectedImage.name : "Select new image"}
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
            <label className="add-card-input-label">Name: </label>
            <input
              value={monsterName}
              onChange={setMonsterNameHandler}
              required
              className="add-card-input-textbox"
              placeholder="Monster Name"
            />
            {monsterNameError ? <ErrorMessage error={monsterNameError} /> : ""}
          </div>
          <div>
            <label className="add-card-input-label">Type: </label>
            <select
              onChange={setMonsterTypeHandler}
              value={monsterType}
              className="add-card-select"
            >
              {monsterTypeArr.map((type) => (
                <option key={type} value={type} className="add-card-option">
                  {type}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="add-card-input-label">Race: </label>
            <select
              onChange={(e) => setMonsterRace(e.target.value)}
              value={monsterRace}
              className="add-card-select"
            >
              {monsterRaceArr.map((race) => (
                <option key={race} value={race} className="add-card-option">
                  {race}
                </option>
              ))}
            </select>
          </div>

          {monsterType === "Normal" || monsterType === "Effect" ? (
            ""
          ) : (
            <div className="flex w-10/12 mx-auto justify-around my-2">
              <div>
                <input
                  type="radio"
                  id="isNormal"
                  name="isNormal"
                  value="Normal"
                  checked={monsterIsNormal === true}
                  onChange={() => setMonsterIsNormal(true)}
                  className="mr-1"
                />
                <label htmlFor="isNormal">Normal</label>
              </div>
              <div>
                <input
                  type="radio"
                  id="isEffect"
                  name="isNormal"
                  value="Effect"
                  checked={monsterIsNormal === false}
                  onChange={() => setMonsterIsNormal(false)}
                  className="mr-1"
                />
                <label htmlFor="isEffect">Effect</label>
              </div>
            </div>
          )}
          <div>
            <label className="add-card-input-label">
              {monsterIsNormal ? "Description" : "Effect"}:{" "}
            </label>
            <textarea
              value={monsterEffDesc}
              onChange={setMonsterEffDescHandler}
              row="4"
              col="50"
              required
              className="add-card-textarea"
            ></textarea>
            {monsterEffDescError ? (
              <ErrorMessage error={monsterEffDescError} />
            ) : (
              ""
            )}
          </div>

          <div>
            <label className="add-card-input-label">Attribute: </label>
            <select
              onChange={(e) => setMonsterAttribute(e.target.value)}
              value={monsterAttribute}
              className="add-card-select"
            >
              {monsterAttributeArr.map((attri) => (
                <option key={attri} value={attri} className="add-card-option">
                  {attri}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="add-card-input-label">Level: </label>
            <input
              type="number"
              min="1"
              max="12"
              value={monsterStar}
              onChange={(e) => setMonsterStar(e.target.value)}
            />
          </div>
          <div>
            <label className="add-card-input-label">Attack: </label>
            <input
              type="number"
              min="0"
              max="10000"
              value={monsterAttack}
              onChange={(e) =>
                setMonsterAttack(monsterAttack < 1001 ? e.target.value : 0)
              }
              className="add-card-select"
            />
          </div>
          <div>
            <label className="add-card-input-label">Defense: </label>
            <input
              type="number"
              min="0"
              max="10000"
              value={monsterDefense}
              onChange={(e) =>
                setMonsterDefense(monsterDefense < 1001 ? e.target.value : 0)
              }
              className="add-card-select"
            />
          </div>
          <button
            className={
              monsterNameError || monsterEffDescError
                ? "add-card-btn-disabled"
                : "add-card-btn"
            }
            disabled={monsterNameError || monsterEffDescError ? true : false}
          >
            <CheckCircleIcon className="CheckCircleIconStyles" />
            Submit
          </button>
        </form>
        <div className="add-card-converted">
          <div className="card-container" ref={monsterImgContainer}>
            <img src={selectMonsterTypeImg()} className="card" />
            <div className="monster-card-name">{monsterName}</div>
            <img
              className={
                "monster-card-attribute " + selectMonsterAttributeClassName()
              }
              src={selectMonsterAttributeImg()}
            />
            {
              <div className="spell-card-img-container">
                <img
                  className="monster-card-img"
                  alt="Monster"
                  src={file ? file : "/image/" + monsterImage}
                />
              </div>
            }
            <div className="monster-card-star-container">
              {setMonsterStarHandler().map((key) => (
                <img src={Star} className="monster-card-star" key={key} />
              ))}
            </div>
            <div className="monster-card-race">
              [{monsterRace}
              {monsterIsNormal ? "" : "/Effect"}]
            </div>
            <div className="monster-card-eff">{monsterEffDesc}</div>
            <div className="monster-card-attack">{monsterAttack}</div>
            <div className="monster-card-defense">{monsterDefense}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MonsterCardEdit;
