import { React, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../redux/index";
import { trapTypeArr } from "../card_meta_data/index";
import dataURLtoFile from "../cards_img/dataUrlToFile";
import NormalTrap from "../cards_img/NormalTrap.jpg";
import ContinuousTrap from "../cards_img/ContinuousTrap.jpg";
import CounterTrap from "../cards_img/CounterTrap.jpg";
import domtoimage from "dom-to-image";

function AddTrapCardPage() {
  const dispatch = useDispatch();
  const trapImgContainer = useRef(null);
  const { addTrapCard } = bindActionCreators(actionCreators, dispatch);

  const { loginUser } = useSelector((state) => state);
  const [file, setFile] = useState(undefined);
  const [selectedImage, setSelectedImage] = useState({});
  const [trapName, setTrapName] = useState("");
  const [trapEff, setTrapEff] = useState("");
  const [trapType, setTrapType] = useState("Normal");
  const [cardType] = useState("Trap");
  const [cardAuthor] = useState(loginUser.credentials.username);

  const addTrapCardForm = (e) => {
    e.preventDefault();

    convertDomToImg();
  };

  const imageChangeHandler = (e) => {
    if (e.target.files[0]) {
      setSelectedImage(e.target.files[0]);

      setFile(URL.createObjectURL(e.target.files[0]));
    }
  };

  const selectTrapTypeImg = () => {
    if (trapType === "Normal") return NormalTrap;
    if (trapType === "Continuous") return ContinuousTrap;
    if (trapType === "Counter") return CounterTrap;
  };

  const convertDomToImg = () => {
    domtoimage
      .toPng(trapImgContainer.current)
      .then(function (dataUrl) {
        const fileData = dataURLtoFile(dataUrl, "trapImg.png");

        const trapCard = {
          TrapName: trapName,
          TrapEff: trapEff,
          TrapType: trapType,
          CardType: cardType,
          CardAuthor: cardAuthor,
        };
        addTrapCard({ trapCard, selectedImage, fileData });
      })
      .catch(function (error) {
        console.error("oops, something went wrong!", error);
      });
  };

  return (
    <div>
      <form onSubmit={addTrapCardForm} encType="multipart/form-data">
        <h1>Add Trap</h1>
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
          <label>Trap Name: </label>
          <input
            value={trapName}
            onChange={(e) => setTrapName(e.target.value)}
          />
        </div>
        <div>
          <label>Trap Type: </label>
          <select onChange={(e) => setTrapType(e.target.value)}>
            {trapTypeArr.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Effect: </label>
          <textarea
            value={trapEff}
            onChange={(e) => setTrapEff(e.target.value)}
            row="4"
            col="50"
          ></textarea>
        </div>
        <button>Submit</button>
      </form>
      <div className="card-container" ref={trapImgContainer}>
        <img src={selectTrapTypeImg()} className="card" />
        <div className="trap-card-name">{trapName}</div>
        {file && (
          <div className="trap-card-img-container">
            <img className="trap-card-img" alt="Trap" src={file} />
          </div>
        )}
        <div className="trap-card-eff">{trapEff}</div>
      </div>
    </div>
  );
}

export default AddTrapCardPage;
