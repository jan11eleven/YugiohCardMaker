import { React, useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import {
  monsterTypeArr,
  monsterAttributeArr,
  monsterRaceArr,
} from "../card_meta_data/index";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../redux/index";

function MonsterCardEdit() {
  const { card_id } = useParams();
  const dispatch = useDispatch();
  const { editMonsterCard } = bindActionCreators(actionCreators, dispatch);

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

  // need to implement redux in app in order to maintain the data
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
      console.log(data);
    };

    fetchCardInfo();
  }, [card_id]);

  const editMonsterCardForm = (e) => {
    e.preventDefault();

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
    };

    editMonsterCard({ monsterCard, selectedImage });
  };

  const imageChangeHandler = (e) => {
    setSelectedImage(e.target.files[0]);
    setFile(URL.createObjectURL(e.target.files[0]));
  };

  return (
    <div>
      <form onSubmit={editMonsterCardForm}>
        <h1>Edit Monster Card</h1>
        {
          <div>
            <img alt="Monster" src={file ? file : "/image/" + monsterImage} />
          </div>
        }
        <div>
          <label>Change Image: </label>
          <input type="file" name="file" onChange={imageChangeHandler} />
        </div>
        <div>
          <label>Monster Name: </label>
          <input
            value={monsterName}
            onChange={(e) => setMonsterName(e.target.value)}
          />
        </div>
        <div>
          <label>Monster Type: </label>
          <select
            value={monsterType}
            onChange={(e) => setMonsterType(e.target.value)}
          >
            {monsterTypeArr.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Race: </label>
          <select onChange={(e) => setMonsterRace(e.target.value)}>
            {monsterRaceArr.map((race) => (
              <option key={race} value={race}>
                {race}
              </option>
            ))}
          </select>
        </div>
        <div>
          <input
            type="radio"
            id="isNormal"
            name="isNormal"
            value="Normal"
            checked={monsterIsNormal === true}
            onChange={() => setMonsterIsNormal(true)}
          />
          <label htmlFor="isNormal">Normal</label>
          <input
            type="radio"
            id="isEffect"
            name="isNormal"
            value="Effect"
            checked={monsterIsNormal === false}
            onChange={() => setMonsterIsNormal(false)}
          />
          <label htmlFor="isEffect">Effect</label>
          {monsterIsNormal}
        </div>
        <div>
          <label>{monsterIsNormal ? "Description" : "Effect"}: </label>
          <textarea
            value={monsterEffDesc}
            onChange={(e) => setMonsterEffDesc(e.target.value)}
            row="4"
            col="50"
          ></textarea>
        </div>
        <div>
          <label>Monster Attribute: </label>
          <select
            value={monsterAttribute}
            onChange={(e) => setMonsterAttribute(e.target.value)}
          >
            {monsterAttributeArr.map((attri) => (
              <option key={attri} value={attri}>
                {attri}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Star Level: </label>
          <input
            type="number"
            min="1"
            max="12"
            value={monsterStar}
            onChange={(e) => setMonsterStar(e.target.value)}
          />
        </div>
        <div>
          <label>Attack: </label>
          <input
            type="number"
            min="0"
            max="10000"
            value={monsterAttack}
            onChange={(e) =>
              setMonsterAttack(monsterAttack < 1001 ? e.target.value : 0)
            }
          />
        </div>
        <div>
          <label>Defense: </label>
          <input
            type="number"
            min="0"
            max="10000"
            value={monsterDefense}
            onChange={(e) =>
              setMonsterDefense(monsterDefense < 1001 ? e.target.value : 0)
            }
          />
        </div>
        <button>Submit</button>
      </form>
    </div>
  );
}

export default MonsterCardEdit;
