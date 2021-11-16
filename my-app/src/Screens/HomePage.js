import { React, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../redux/index";
import AllPageTitles from "../Components/AllPageTitles";
import Loading from "../Components/Loading";

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
    <div className="w-full">
      <AllPageTitles title="Home" />

      <div>
        <div className="w-10/12 sm:w-4/12 mx-auto my-2">
          <h3 className="text-center text-xl font-bold bg-gray-700 text-gray-100 py-4 rounded-t-xl">
            All Your Cards
          </h3>
          <p className="text-center text-2xl font-semibold bg-gray-600 text-gray-100 py-4 rounded-b-xl">
            {monsterCard.monsterCards.length +
              spellCard.spellCards.length +
              trapCard.trapCards.length}
          </p>
        </div>
        <div className="w-10/12 sm:w-4/12 mx-auto my-2">
          <h4 className="text-center text-xl font-bold bg-yellow-500 text-gray-100 py-4 rounded-t-xl">
            Monsters
          </h4>
          <div className="text-center text-2xl font-semibold bg-yellow-400 text-gray-100 py-4 rounded-b-xl">
            {monsterCard.loading ? (
              <Loading />
            ) : (
              <p>{monsterCard.monsterCards.length}</p>
            )}
          </div>
        </div>
        <div className="w-10/12 sm:w-4/12 mx-auto my-2">
          <h4 className="text-center text-xl font-bold bg-green-500 text-gray-100 py-4 rounded-t-xl">
            Spells
          </h4>
          <div className="text-center text-2xl font-semibold bg-green-400 text-gray-100 py-4 rounded-b-xl">
            {spellCard.loading ? (
              <Loading />
            ) : (
              <p> {spellCard.spellCards.length}</p>
            )}
          </div>
        </div>
        <div className="w-10/12 sm:w-4/12 mx-auto my-2">
          <h4 className="text-center text-xl font-bold bg-pink-600 text-gray-100 py-4 rounded-t-xl">
            Traps
          </h4>
          <div className="text-center text-2xl font-semibold bg-pink-500 text-gray-100 py-4 rounded-b-xl">
            {trapCard.loading ? <Loading /> : trapCard.trapCards.length}
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
