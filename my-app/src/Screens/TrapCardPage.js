import { useEffect, React } from "react";
import { NavLink } from "react-router-dom";
import { bindActionCreators } from "redux";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators } from "../redux/index";
import TrapCardCard from "../Components/TrapCardCard";

function TrapCardPage() {
  const dispatch = useDispatch();
  const { fetchAllTraps } = bindActionCreators(actionCreators, dispatch);
  const state = useSelector((state) => state.trapCard);
  useEffect(() => {
    fetchAllTraps();
  }, []);
  return (
    <div>
      <h1>Your Trap Cards</h1>
      <p>
        <NavLink to="/traps/add">add trap card</NavLink>
      </p>

      {state.loading ? (
        "Loading.."
      ) : state.error === "" ? (
        state.trapCards.length !== 0 ? (
          state.trapCards.map((card) => (
            <TrapCardCard cardInfo={card} key={card._id} />
          ))
        ) : (
          "Trap card bag is empty!"
        )
      ) : (
        <p>{state.error}</p>
      )}
    </div>
  );
}

export default TrapCardPage;
