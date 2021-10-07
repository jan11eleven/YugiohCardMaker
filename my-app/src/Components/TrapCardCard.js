import { React } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../redux/index";

function TrapCardCard({ cardInfo }) {
  const dispatch = useDispatch();
  const { deleteTrapCard } = bindActionCreators(actionCreators, dispatch);
  const state = useSelector((state) => state.trapCard);

  const deleteHandler = () => {
    deleteTrapCard(cardInfo._id);
  };
  return (
    <div>
      <img alt="Trap" src={"/image/" + cardInfo.TrapImage} />
      <p>
        Name: {cardInfo.TrapName}
        <br />
        Spell Type: {cardInfo.TrapType}
      </p>
      <button>
        <Link to={"/traps/" + cardInfo._id}>View</Link>
      </button>
      <button onClick={deleteHandler}>Delete</button>
    </div>
  );
}

export default TrapCardCard;
