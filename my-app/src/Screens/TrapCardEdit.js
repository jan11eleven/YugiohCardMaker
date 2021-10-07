import { React, useState, useEffect, useRef } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { trapTypeArr } from "../card_meta_data/index";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../redux/index";
import dataURLtoFile from "../cards_img/dataUrlToFile";
import NormalTrap from "../cards_img/NormalTrap.jpg";
import ContinuousTrap from "../cards_img/ContinuousTrap.jpg";
import CounterTrap from "../cards_img/CounterTrap.jpg";
import domtoimage from "dom-to-image";

function TrapCardEdit() {
  const { card_id } = useParams();
  const dispatch = useDispatch();
  const trapImgContainer = useRef(null);
  const { editTrapCard } = bindActionCreators(actionCreators, dispatch);

  const [file, setFile] = useState(undefined);
  const [selectedImage, setSelectedImage] = useState({});
  const [trapImage, setTrapImage] = useState("");
  const [trapName, setTrapName] = useState("");
  const [trapType, setTrapType] = useState("");
  const [trapEff, setTrapEff] = useState("");
  const [cardType, setCardType] = useState("Trap");
  const [cardAuthor, setCardAuthor] = useState("");
  const [convertedImage, setConvertedImage] = useState("");

  // need to implement redux in app in order to maintain the data
  // get card on load
  useEffect(() => {
    const fetchCardInfo = async () => {
      const { data } = await axios.get("/api/cards/traps/" + card_id);

      setTrapImage(data.TrapImage);
      setTrapName(data.TrapName);
      setTrapType(data.TrapType);
      setTrapEff(data.TrapEff);
      setCardType(data.CardType);
      setCardAuthor(data.CardAuthor);
      setConvertedImage(data.ConvertedImage);
    };

    fetchCardInfo();
  }, [card_id]);

  const editTrapCardForm = (e) => {
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
          _id: card_id,
          TrapImage: trapImage,
          TrapName: trapName,
          TrapType: trapType,
          TrapEff: trapEff,
          CardType: cardType,
          CardAuthor: cardAuthor,
          ConvertedImage: convertedImage,
        };

        editTrapCard({ trapCard, selectedImage, fileData });
      })
      .catch(function (error) {
        console.error("oops, something went wrong!", error);
      });
  };

  return (
    <div>
      <form onSubmit={editTrapCardForm}>
        <h1>Edit Trap Card</h1>
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
          <label>Trap Name: </label>
          <input
            value={trapName}
            onChange={(e) => setTrapName(e.target.value)}
          />
        </div>
        <div>
          <label>Trap Type: </label>
          <select
            value={trapType}
            onChange={(e) => setTrapType(e.target.value)}
          >
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
        {
          <div className="trap-card-img-container">
            <img
              className="trap-card-img"
              alt="Trap"
              src={file ? file : "/image/" + trapImage}
            />
          </div>
        }
        <div className="trap-card-eff">{trapEff}</div>
      </div>
    </div>
  );
}

export default TrapCardEdit;
