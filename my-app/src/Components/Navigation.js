import React from "react";
import { NavLink } from "react-router-dom";
import { actionCreators } from "../redux";
import { bindActionCreators } from "redux";
import { useDispatch, useSelector } from "react-redux";

function Navigation() {
  const dispatch = useDispatch();

  const { logoutUser } = bindActionCreators(actionCreators, dispatch);
  const state = useSelector((state) => state.loginUser);

  return (
    <div>
      <ul>
        <li>
          <NavLink exact to="/" activeClassName="selected">
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/monsters" activeClassName="selected">
            Monsters
          </NavLink>
        </li>
        <li>
          <NavLink to="/spells" activeClassName="selected">
            Spells
          </NavLink>
        </li>
        <li>
          <NavLink to="/traps" activeClassName="selected">
            Traps
          </NavLink>
        </li>
        <li>{state.credentials.username}</li>
        <li>
          <button
            onClick={() => {
              logoutUser();
            }}
          >
            Logout
          </button>
        </li>
      </ul>
    </div>
  );
}

export default Navigation;
