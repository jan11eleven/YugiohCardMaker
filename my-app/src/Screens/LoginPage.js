import { React, useState, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators } from "../redux/index";
import { bindActionCreators } from "redux";

function LoginPage() {
  const dispatch = useDispatch();
  const { loginUser, authUser } = bindActionCreators(actionCreators, dispatch);
  const state = useSelector((state) => state.loginUser);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const loginUserForm = (e) => {
    e.preventDefault();

    const userCred = {
      Username: username,
      Password: password,
    };

    loginUser(userCred);
  };

  return (
    <div>
      <h1>Login Page</h1>
      <form onSubmit={loginUserForm}>
        <label>Username</label>
        <input
          onChange={(e) => setUsername(e.target.value)}
          type="text"
          name="Username"
        />
        <label>Password</label>
        <input
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          name="Password"
        />
        <button>Login</button>
        <Link to="/signup">Sign Up here!</Link>
        {state.loginState.isAuth ? (
          <Redirect to="/" />
        ) : (
          <label>{state.loginState.loginError}</label>
        )}
        {state.loading ? <p>Loading...</p> : ""}
      </form>
    </div>
  );
}

export default LoginPage;
