import { useEffect } from "react";
import "./css/App.css";
import "./css/Monster.css";
import "./css/Trap.css";
import "./css/Spell.css";
import { useLocation, Switch, Route, Redirect } from "react-router-dom";
import NavigationBar from "./Components/Navigation";
import MonsterCardPage from "./Screens/MonsterCardPage";
import MonsterCardView from "./Screens/MonsterCardView";
import MonsterCardEdit from "./Screens/MonsterCardEdit";
import AddMonsterCardPage from "./Screens/AddMonsterCardPage";
import SpellCardPage from "./Screens/SpellCardPage";
import AddSpellCardPage from "./Screens/AddSpellCardPage";
import SpellCardView from "./Screens/SpellCardView";
import SpellCardEdit from "./Screens/SpellCardEdit";
import AddTrapCardPage from "./Screens/AddTrapCardPage";
import TrapCardPage from "./Screens/TrapCardPage";
import TrapCardView from "./Screens/TrapCardView";
import TrapCardEdit from "./Screens/TrapCardEdit";
import RegisterPage from "./Screens/RegisterPage";
import LoginPage from "./Screens/LoginPage";
import HomePage from "./Screens/HomePage";
import Footer from "./Components/Footer";

import { useDispatch, useSelector } from "react-redux";
import { actionCreators } from "./redux/index";
import { bindActionCreators } from "redux";

function App() {
  const location = useLocation();
  const dispatch = useDispatch();
  const { authUser } = bindActionCreators(actionCreators, dispatch);

  const state = useSelector((state) => state.loginUser);

  useEffect(() => {
    const authUserOnLoad = () => {
      authUser({ Username: undefined, Password: undefined });
    };

    authUserOnLoad();
  }, []);

  return (
    <div>
      {location.pathname !== "/login" && location.pathname !== "/signup" && (
        <NavigationBar />
      )}
      <Switch>
        {/* Login and Sign-up Page */}
        <Route exact path="/signup">
          <RegisterPage />
        </Route>
        <Route exact path="/login">
          {/* check if user is NOT authenticated, then user cannot go to this route */}
          {state.loginState.redirect ? (
            <Redirect to={state.loginState.redirect} />
          ) : (
            <LoginPage />
          )}
        </Route>

        {/* monster card routes */}
        <Route exact path="/monsters/add">
          {/* check if user is authenticated, proceed to login page if not */}
          {state.loginState.isAuth ? (
            <AddMonsterCardPage />
          ) : (
            <Redirect to="/login" />
          )}
        </Route>
        <Route exact path="/monsters">
          {/* check if user is authenticated, proceed to login page if not */}
          {state.loginState.isAuth ? (
            <MonsterCardPage />
          ) : (
            <Redirect to="/login" />
          )}
        </Route>
        <Route exact path="/monster/edit/:card_id">
          {/* check if user is authenticated, proceed to login page if not */}
          {state.loginState.isAuth ? (
            <MonsterCardEdit />
          ) : (
            <Redirect to="/login" />
          )}
        </Route>
        <Route exact path="/monsters/:card_id">
          {/* check if user is authenticated, proceed to login page if not */}
          {state.loginState.isAuth ? (
            <MonsterCardView />
          ) : (
            <Redirect to="/login" />
          )}
        </Route>
        {/* spell card routes */}
        <Route exact path="/spells/add">
          {/* check if user is authenticated, proceed to login page if not */}
          {state.loginState.isAuth ? (
            <AddSpellCardPage />
          ) : (
            <Redirect to="/login" />
          )}
        </Route>
        <Route exact path="/spells">
          {/* check if user is authenticated, proceed to login page if not */}
          {state.loginState.isAuth ? (
            <SpellCardPage />
          ) : (
            <Redirect to="/login" />
          )}
        </Route>
        <Route exact path="/spells/edit/:card_id">
          {/* check if user is authenticated, proceed to login page if not */}
          {state.loginState.isAuth ? (
            <SpellCardEdit />
          ) : (
            <Redirect to="/login" />
          )}
        </Route>
        <Route exact path="/spells/:card_id">
          {/* check if user is authenticated, proceed to login page if not */}
          {state.loginState.isAuth ? (
            <SpellCardView />
          ) : (
            <Redirect to="/login" />
          )}
        </Route>
        {/* trap card routes */}
        <Route exact path="/traps">
          {/* check if user is authenticated, proceed to login page if not */}
          {state.loginState.isAuth ? (
            <TrapCardPage />
          ) : (
            <Redirect to="/login" />
          )}
        </Route>
        <Route exact path="/traps/add">
          {/* check if user is authenticated, proceed to login page if not */}
          {state.loginState.isAuth ? (
            <AddTrapCardPage />
          ) : (
            <Redirect to="/login" />
          )}
        </Route>
        <Route exact path="/traps/:card_id">
          {/* check if user is authenticated, proceed to login page if not */}
          {state.loginState.isAuth ? (
            <TrapCardView />
          ) : (
            <Redirect to="/login" />
          )}
        </Route>
        <Route exact path="/traps/edit/:card_id">
          {/* check if user is authenticated, proceed to login page if not */}
          {state.loginState.isAuth ? (
            <TrapCardEdit />
          ) : (
            <Redirect to="/login" />
          )}
        </Route>
        <Route exact path="/">
          {state.loginState.isAuth ? <HomePage /> : <Redirect to="/login" />}
        </Route>
      </Switch>
      {/* {location.pathname !== "/login" && location.pathname !== "/signup" && (
        <Footer />
      )} */}
    </div>
  );
}

export default App;
