import { React, useState, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators } from "../redux/index";
import { bindActionCreators } from "redux";
import Loading from "../Components/Loading";

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
    <div className="flex h-screen">
      <div className="signup-login-form">
        <h1 className="signup-login-title">Log In</h1>
        <form onSubmit={loginUserForm}>
          <div>
            <label className="signup-login-input-label">Username</label>
            <br />
            <input
              onChange={(e) => setUsername(e.target.value)}
              type="text"
              name="Username"
              className="signup-login-input-textbox"
              placeholder="Enter your Username"
            />
          </div>
          <div>
            <label className="signup-login-input-label">Password</label>
            <br />
            <input
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              name="Password"
              className="signup-login-input-textbox"
              placeholder="Enter your Password"
            />
          </div>
          {state.loginState.isAuth ? (
            <Redirect to="/" />
          ) : (
            <p className="signup-login-error-message">
              {state.loginState.loginError}
            </p>
          )}
          <button className="signup-login-form-submit">Login</button>
          <p className="signup-login-link-btn">
            <span className="text-gray-900">Not registered yet? </span>
            <Link to="/signup">Signup now</Link>
          </p>
          {state.loading ? <Loading /> : ""}
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
