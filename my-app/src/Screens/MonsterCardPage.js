import { React, useEffect } from "react";
import { NavLink } from "react-router-dom";
import MonsterCardCard from "../Components/MonsterCardCard";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../redux/index";
import AllPageTitles from "../Components/AllPageTitles";
import { PlusCircleIcon } from "@heroicons/react/solid";
import Loading from "../Components/Loading";
import CardIsEmpty from "../Components/CardIsEmpty";

function MonsterCardPage() {
  const dispatch = useDispatch();
  const { fetchAllMonsters } = bindActionCreators(actionCreators, dispatch);

  const state = useSelector((state) => state.monsterCard);

  useEffect(() => {
    fetchAllMonsters();
  }, []);

  return (
    <div>
      <AllPageTitles title="Your Monster Cards" />
      <button className="add-card-btn">
        <PlusCircleIcon className="PlusCircleIconStyles" />
        <NavLink to="/monsters/add">Add Monster Card</NavLink>
      </button>

      {state.loading ? (
        <Loading />
      ) : state.error === "" ? (
        state.monsterCards.length !== 0 ? (
          state.monsterCards.map((card) => (
            <MonsterCardCard cardInfo={card} key={card._id} />
          ))
        ) : (
          <CardIsEmpty card="Monster" />
        )
      ) : (
        <p>{state.error}</p>
      )}
    </div>
  );
}

export default MonsterCardPage;
