import { useEffect, React } from "react";
import { NavLink } from "react-router-dom";
import { bindActionCreators } from "redux";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators } from "../redux/index";
import SpellCardCard from "../Components/SpellCardCard";

function SpellCardPage() {
  const dispatch = useDispatch();
  const { fetchAllSpells } = bindActionCreators(actionCreators, dispatch);

  const state = useSelector((state) => state.spellCard);

  useEffect(() => {
    fetchAllSpells();
  }, []);

  return (
    <div>
      <h1>Your Spell Cards</h1>
      <p>
        <NavLink to="/spells/add">Add Spell Card</NavLink>
      </p>

      {state.loading ? (
        "Loading.."
      ) : state.error === "" ? (
        state.spellCards.length !== 0 ? (
          state.spellCards.map((card) => (
            <SpellCardCard cardInfo={card} key={card._id} />
          ))
        ) : (
          "Spell card bag is empty!"
        )
      ) : (
        <p>{state.error}</p>
      )}
    </div>
  );
}

export default SpellCardPage;
