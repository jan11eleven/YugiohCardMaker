import { React } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../redux/index";

function SpellCardCard({ cardInfo }) {
  const dispatch = useDispatch();
  const { deleteSpellCard } = bindActionCreators(actionCreators, dispatch);
  const state = useSelector((state) => state.spellCard);

  const deleteHandler = () => {
    deleteSpellCard(cardInfo._id);
  };
  return (
    <div>
      <img alt="Spell" src={"/image/" + cardInfo.SpellImage} />
      <p>
        Name: {cardInfo.SpellName}
        <br />
        Spell Type: {cardInfo.SpellType}
      </p>
      <button>
        <Link to={"/spells/" + cardInfo._id}>View</Link>
      </button>
      <button onClick={deleteHandler}>Delete</button>
    </div>
  );
}

export default SpellCardCard;
