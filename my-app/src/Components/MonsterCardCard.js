import { React } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../redux/index";

function MonsterCardCard({ cardInfo }) {
  const dispatch = useDispatch();
  const { deleteMonsterCard } = bindActionCreators(actionCreators, dispatch);

  return (
    <div>
      <img alt="Monster" src={"/image/" + cardInfo.MonsterImage} />
      <p>
        Name: {cardInfo.MonsterName}
        <br />
        Monster Type: {cardInfo.MonsterType}
      </p>
      <button>
        <Link to={"/monsters/" + cardInfo._id}>View</Link>
      </button>
      <button onClick={() => deleteMonsterCard(cardInfo._id)}>Delete</button>
    </div>
  );
}

export default MonsterCardCard;
