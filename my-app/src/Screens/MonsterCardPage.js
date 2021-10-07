import { React, useEffect } from "react";
import { NavLink } from "react-router-dom";
import MonsterCardCard from "../Components/MonsterCardCard";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../redux/index";

function MonsterCardPage() {
  const dispatch = useDispatch();
  const { fetchAllMonsters } = bindActionCreators(actionCreators, dispatch);

  const state = useSelector((state) => state.monsterCard);

  useEffect(() => {
    fetchAllMonsters();
  }, []);

  return (
    <div>
      <h1>Your Monster Cards</h1>
      <p>
        <NavLink to="/monsters/add">Add Monster Card</NavLink>
      </p>

      {state.loading ? (
        "Loading.."
      ) : state.error === "" ? (
        state.monsterCards.length !== 0 ? (
          state.monsterCards.map((card) => (
            <MonsterCardCard cardInfo={card} key={card._id} />
          ))
        ) : (
          "Monster card bag is empty!"
        )
      ) : (
        <p>{state.error}</p>
      )}
    </div>
  );
}

export default MonsterCardPage;
