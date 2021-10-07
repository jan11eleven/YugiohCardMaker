import { React, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../redux/index";
function HomePage() {
  const dispatch = useDispatch();
  const { fetchAllMonsters, fetchAllSpells, fetchAllTraps } =
    bindActionCreators(actionCreators, dispatch);

  useEffect(() => {
    fetchAllMonsters();
    fetchAllSpells();
    fetchAllTraps();
  }, []);
  const { monsterCard, trapCard, spellCard } = useSelector((state) => state);

  return (
    <div>
      <h1>Home</h1>
      <h3>
        All Your Cards:{" "}
        {monsterCard.monsterCards.length +
          spellCard.spellCards.length +
          trapCard.trapCards.length}
      </h3>
      <h4>Monster Cards: {monsterCard.monsterCards.length}</h4>
      <h4>Spell Cards: {spellCard.spellCards.length}</h4>
      <h4>Trap Cards: {trapCard.trapCards.length}</h4>
    </div>
  );
}

export default HomePage;
