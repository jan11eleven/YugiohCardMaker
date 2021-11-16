import { useEffect, React } from "react";
import { NavLink } from "react-router-dom";
import { bindActionCreators } from "redux";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators } from "../redux/index";
import TrapCardCard from "../Components/TrapCardCard";
import AllPageTitles from "../Components/AllPageTitles";
import { PlusCircleIcon } from "@heroicons/react/solid";
import Loading from "../Components/Loading";
import CardIsEmpty from "../Components/CardIsEmpty";

function TrapCardPage() {
  const dispatch = useDispatch();
  const { fetchAllTraps } = bindActionCreators(actionCreators, dispatch);
  const state = useSelector((state) => state.trapCard);
  useEffect(() => {
    fetchAllTraps();
  }, []);
  return (
    <div>
      <AllPageTitles title="Your Trap Cards" />
      <button className="add-card-btn">
        <PlusCircleIcon className="PlusCircleIconStyles" />
        <NavLink to="/traps/add">Add Trap Card</NavLink>
      </button>

      {state.loading ? (
        <Loading />
      ) : state.error === "" ? (
        state.trapCards.length !== 0 ? (
          state.trapCards.map((card) => (
            <TrapCardCard cardInfo={card} key={card._id} />
          ))
        ) : (
          <CardIsEmpty card="Trap" />
        )
      ) : (
        <p>{state.error}</p>
      )}
    </div>
  );
}

export default TrapCardPage;
