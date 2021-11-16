import { React } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../redux/index";
import { EyeIcon, XIcon } from "@heroicons/react/solid";

function TrapCardCard({ cardInfo }) {
  const dispatch = useDispatch();
  const { deleteTrapCard } = bindActionCreators(actionCreators, dispatch);

  const deleteHandler = () => {
    deleteTrapCard(cardInfo._id);
  };
  return (
    <div className="card-card-container">
      <img
        alt="Trap"
        src={"/image/" + cardInfo.TrapImage}
        className="card-card-image"
      />
      <div className="card-details-container">
        <p className="card-card-name">{cardInfo.TrapName}</p>
        <p>{cardInfo.TrapType} Trap</p>
        <div className="card-btn-container">
          <button className="view-card-btn">
            <EyeIcon className="EyeIconStyles" />
            <Link to={"/traps/" + cardInfo._id}>View</Link>
          </button>
          <button className="delete-card-btn" onClick={deleteHandler}>
            <XIcon className="XIconStyles" /> Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default TrapCardCard;
