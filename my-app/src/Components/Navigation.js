import { React, useState } from "react";
import { NavLink } from "react-router-dom";
import { actionCreators } from "../redux";
import { bindActionCreators } from "redux";
import { useDispatch, useSelector } from "react-redux";
import { MenuIcon, XIcon } from "@heroicons/react/solid";

function Navigation() {
  const dispatch = useDispatch();
  const [hambar, setHamBar] = useState(false);

  const { logoutUser } = bindActionCreators(actionCreators, dispatch);
  const state = useSelector((state) => state.loginUser);

  return (
    <div className="w-full bg-green-400">
      <nav className="flex w-11/12 mx-auto justify-between items-center py-2 sm:py-4">
        <h3 className="font-bold text-gray-800 text-xl">Yugioh! Card Maker!</h3>
        {/* pc screen navlinks */}
        <ul className="hidden sm:block sm:flex w-6/12 justify-between sm:max-w-sm items-center text-gray-800">
          <li className="">
            <NavLink exact to="/" activeClassName="selected">
              Home
            </NavLink>
          </li>
          <li className="">
            <NavLink to="/monsters" activeClassName="selected">
              Monsters
            </NavLink>
          </li>
          <li className="">
            <NavLink to="/spells" activeClassName="selected">
              Spells
            </NavLink>
          </li>
          <li className="">
            <NavLink to="/traps" activeClassName="selected">
              Traps
            </NavLink>
          </li>
          <li>
            <button
              onClick={() => {
                logoutUser();
              }}
              className="bg-red-500 py-2 px-3 rounded-md text-gray-100"
            >
              Logout
            </button>
          </li>
        </ul>
        {/* mobile navlinks */}
        <div className="relative sm:hidden">
          <button
            className="sm:hidden"
            onClick={() => setHamBar(hambar ? false : true)}
          >
            {hambar ? (
              <XIcon className="h-9 w-9 text-gray-900" />
            ) : (
              <MenuIcon className="h-9 w-9 text-gray-900" />
            )}
          </button>
          <ul
            className={
              hambar
                ? "absolute bg-gray-800 text-white py-1 px-5 right-1 mt-2"
                : "absolute hidden"
            }
          >
            <li
              onClick={() => setHamBar(false)}
              className="py-2 px-2 text-center"
            >
              <NavLink exact to="/" activeClassName="selected">
                Home
              </NavLink>
            </li>
            <li
              onClick={() => setHamBar(false)}
              className="py-2 px-2 text-center"
            >
              <NavLink to="/monsters" activeClassName="selected">
                Monsters
              </NavLink>
            </li>
            <li
              onClick={() => setHamBar(false)}
              className="py-2 px-2 text-center"
            >
              <NavLink to="/spells" activeClassName="selected">
                Spells
              </NavLink>
            </li>
            <li
              onClick={() => setHamBar(false)}
              className="py-2 px-2 text-center"
            >
              <NavLink to="/traps" activeClassName="selected">
                Traps
              </NavLink>
            </li>
            <li className="py-2 px-2 text-center">
              {state.credentials.username}
            </li>
            <li className="py-2 px-2 ">
              <button
                onClick={() => {
                  logoutUser();
                }}
                className="w-full"
              >
                Logout
              </button>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
}

export default Navigation;
