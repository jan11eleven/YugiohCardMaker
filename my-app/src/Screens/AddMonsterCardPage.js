import { React, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../redux/index";
import {
  monsterTypeArr,
  monsterAttributeArr,
  monsterRaceArr,
} from "../card_meta_data/index";

function AddMonsterCardPage() {
  const dispatch = useDispatch();
  const { addMonsterCard } = bindActionCreators(actionCreators, dispatch);

  const { loginUser } = useSelector((state) => state);

  const [file, setFile] = useState(undefined);
  const [selectedImage, setSelectedImage] = useState({});
  const [monsterName, setMonsterName] = useState("");
  const [cardType] = useState("Monster");
  const [monsterRace, setMonsterRace] = useState(monsterRaceArr[0]);
  const [monsterType, setMonsterType] = useState("Normal");
  const [monsterEffDesc, setMonsterEffDesc] = useState("");
  const [monsterIsNormal, setMonsterIsNormal] = useState(true);
  const [monsterAttribute, setMonsterAttribute] = useState("Dark");
  const [monsterStar, setMonsterStar] = useState(1);
  const [monsterAttack, setMonsterAttack] = useState(0);
  const [monsterDefense, setMonsterDefense] = useState(0);
  const [cardAuthor] = useState(loginUser.credentials.username);

  const addMonsterCardForm = (e) => {
    e.preventDefault();

    const monsterCard = {
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

    addMonsterCard({ monsterCard, selectedImage });
  };

  const imageChangeHandler = (e) => {
    setSelectedImage(e.target.files[0]);
    setFile(URL.createObjectURL(e.target.files[0]));
  };

  return (
    <form onSubmit={addMonsterCardForm} encType="multipart/form-data">
      <h1>Add Monster</h1>
      {file && (
        <div>
          <img alt="Monster" src={file} />
        </div>
      )}
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
        <label>Name: </label>
        <input
          value={monsterName}
          onChange={(e) => setMonsterName(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Type: </label>
        <select onChange={(e) => setMonsterType(e.target.value)}>
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
          required
        ></textarea>
      </div>
      <div>
        <label>Attribute: </label>
        <select onChange={(e) => setMonsterAttribute(e.target.value)}>
          {monsterAttributeArr.map((attri) => (
            <option key={attri} value={attri}>
              {attri}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label>Level: </label>
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
  );
}

export default AddMonsterCardPage;
