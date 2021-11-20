import { React } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../redux/index";
import { EyeIcon, XIcon } from "@heroicons/react/solid";

function SpellCardCard({ cardInfo }) {
  const dispatch = useDispatch();
  const { deleteSpellCard } = bindActionCreators(actionCreators, dispatch);

  const deleteHandler = () => {
    deleteSpellCard(cardInfo._id);
  };
  return (
    <div className="card-card-container">
      <img
        alt="Spell"
        src={"/image/" + cardInfo.SpellImage}
        className="card-card-image"
      />
      <div className="card-details-container">
        <p className="card-card-name">{cardInfo.SpellName}</p>
        <p>{cardInfo.SpellType} Spell</p>
        <div className="card-btn-container">
          <button className="view-card-btn">
            <EyeIcon className="EyeIconStyles" />
            <Link to={"/spells/" + cardInfo._id}>View</Link>
          </button>
          <button className="delete-card-btn" onClick={deleteHandler}>
            <XIcon className="XIconStyles" /> Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default SpellCardCard;
