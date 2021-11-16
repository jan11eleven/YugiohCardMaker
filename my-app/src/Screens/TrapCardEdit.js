import { React, useState, useEffect, useRef } from "react";
import axios from "axios";
import { useParams, useHistory } from "react-router-dom";
import { trapTypeArr } from "../card_meta_data/index";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../redux/index";
import dataURLtoFile from "../cards_img/dataUrlToFile";
import NormalTrap from "../cards_img/NormalTrap.jpg";
import ContinuousTrap from "../cards_img/ContinuousTrap.jpg";
import CounterTrap from "../cards_img/CounterTrap.jpg";
import domtoimage from "dom-to-image";
import AllPageTitles from "../Components/AllPageTitles";
import { CheckCircleIcon } from "@heroicons/react/solid";
import ErrorMessage from "../Components/ErrorMessage";

function TrapCardEdit() {
  const { card_id } = useParams();
  const dispatch = useDispatch();
  const trapImgContainer = useRef(null);
  const { editTrapCard } = bindActionCreators(actionCreators, dispatch);
  const regex = /^[A-Za-z0-9 .,!-]*$/;

  const history = useHistory();

  const [trapNameError, setTrapNameError] = useState(undefined);
  const [trapEffError, setTrapEffError] = useState(undefined);

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

        if (trapName.length === 0) {
          setTrapNameError("Trap Name is required!");
          return;
        }

        if (trapEff.length === 0) {
          setTrapEffError("Trap Effect is required!");
          return;
        }

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

        history.push("/traps/" + card_id);
      })
      .catch(function (error) {
        console.error("oops, something went wrong!", error);
      });
  };

  const setTrapNameHandler = (e) => {
    if (e.target.value.length > 20) {
      setTrapNameError("Characters shouldn't exceed in 20");
    } else if (regex.test(e.target.value)) {
      setTrapName(e.target.value);
      setTrapNameError(undefined);
    } else {
      setTrapNameError(
        '"' +
          e.target.value[e.target.value.length - 1] +
          '"' +
          " character is not allowed!"
      );
    }
  };

  const setTrapEffHandler = (e) => {
    if (e.target.value.length > 168) {
      setTrapEffError("Characters shouldn't exceed in 168");
    } else if (regex.test(e.target.value)) {
      setTrapEff(e.target.value);
      setTrapEffError(undefined);
    } else {
      setTrapEffError(
        '"' +
          e.target.value[e.target.value.length - 1] +
          '"' +
          " character is not allowed!"
      );
    }
  };

  return (
    <div>
      <AllPageTitles title="Edit Trap Card" />
      <div className="add-card-form-container">
        <form onSubmit={editTrapCardForm} className="add-card-form">
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
            <label className="add-card-input-label">Trap Name: </label>
            <input
              value={trapName}
              onChange={setTrapNameHandler}
              className="add-card-input-textbox"
            />
            {trapNameError ? <ErrorMessage error={trapNameError} /> : ""}
          </div>
          <div>
            <label className="add-card-input-label">Trap Type: </label>
            <select
              value={trapType}
              onChange={(e) => setTrapType(e.target.value)}
              className="add-card-select"
            >
              {trapTypeArr.map((type) => (
                <option key={type} value={type} className="add-card-option">
                  {type}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="add-card-input-label">Effect: </label>
            <textarea
              value={trapEff}
              onChange={setTrapEffHandler}
              row="4"
              col="50"
              className="add-card-textarea"
            ></textarea>
            {trapEffError ? <ErrorMessage error={trapEffError} /> : ""}
          </div>
          <button className="add-card-btn">
            <CheckCircleIcon className="CheckCircleIconStyles" /> Submit
          </button>
        </form>
        <div className="add-card-converted">
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
      </div>
    </div>
  );
}

export default TrapCardEdit;
