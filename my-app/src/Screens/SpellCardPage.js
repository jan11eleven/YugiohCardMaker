import { useEffect, React } from "react";
import { NavLink } from "react-router-dom";
import { bindActionCreators } from "redux";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators } from "../redux/index";
import SpellCardCard from "../Components/SpellCardCard";
import AllPageTitles from "../Components/AllPageTitles";
import { PlusCircleIcon } from "@heroicons/react/solid";
import Loading from "../Components/Loading";
import CardIsEmpty from "../Components/CardIsEmpty";

function SpellCardPage() {
  const dispatch = useDispatch();
  const { fetchAllSpells } = bindActionCreators(actionCreators, dispatch);

  const state = useSelector((state) => state.spellCard);

  useEffect(() => {
    fetchAllSpells();
  }, []);

  return (
    <div>
      <AllPageTitles title="Your Spell Cards" />
      <button className="add-card-btn">
        <PlusCircleIcon className="PlusCircleIconStyles" />
        <NavLink to="/spells/add">Add Spell Card</NavLink>
      </button>

      {state.loading ? (
        <Loading />
      ) : state.error === "" ? (
        state.spellCards.length !== 0 ? (
          state.spellCards.map((card) => (
            <SpellCardCard cardInfo={card} key={card._id} />
          ))
        ) : (
          <CardIsEmpty card="Spell" />
        )
      ) : (
        <p>{state.error}</p>
      )}
    </div>
  );
}

export default SpellCardPage;
