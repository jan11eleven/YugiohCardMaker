import { React } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../redux/index";
import { EyeIcon, XIcon } from "@heroicons/react/solid";

function MonsterCardCard({ cardInfo }) {
  const dispatch = useDispatch();
  const { deleteMonsterCard } = bindActionCreators(actionCreators, dispatch);

  return (
    <div className="card-card-container">
      <img
        alt="Monster"
        src={"/image/" + cardInfo.MonsterImage}
        className="card-card-image"
      />
      <div className="card-details-container">
        <p className="card-card-name">{cardInfo.MonsterName}</p>
        <p>{cardInfo.MonsterType} Monster</p>
        <div className="card-btn-container">
          <button className="view-card-btn">
            <EyeIcon className="EyeIconStyles" />
            <Link to={"/monsters/" + cardInfo._id}>View</Link>
          </button>
          <button
            className="delete-card-btn"
            onClick={() => deleteMonsterCard(cardInfo._id)}
          >
            <XIcon className="XIconStyles" />
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default MonsterCardCard;
