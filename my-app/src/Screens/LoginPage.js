import { React, useState, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators } from "../redux/index";
import { bindActionCreators } from "redux";
import Loading from "../Components/Loading";
import ErrorMessage from "../Components/ErrorMessage";

function LoginPage() {
  const dispatch = useDispatch();
  const { loginUser } = bindActionCreators(actionCreators, dispatch);
  const state = useSelector((state) => state.loginUser);

  const regex = /^[A-Za-z0-9_]*$/;

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [usernameError, setUsernameError] = useState(undefined);

  const loginUserForm = (e) => {
    e.preventDefault();

    if (usernameError) {
      return;
    }

    const userCred = {
      Username: username,
      Password: password,
    };

    loginUser(userCred);
  };

  const setUsernameHandler = (e) => {
    if (e.target.value.length > 16) {
      setUsernameError("Characters shouldn't exceed in 16");
    } else if (regex.test(e.target.value)) {
      setUsername(e.target.value);
      setUsernameError(undefined);
    } else {
      setUsername(e.target.value);
      setUsernameError(
        "Letters, Numbers and Underscore are the only characters allowed!"
      );
    }
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
              onChange={setUsernameHandler}
              type="text"
              name="Username"
              className="signup-login-input-textbox"
              placeholder="Enter your Username"
              value={username}
              required
            />
            {usernameError ? <ErrorMessage error={usernameError} /> : ""}
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
              required
            />
          </div>
          {state.loginState.isAuth ? (
            <Redirect to="/" />
          ) : (
            <p className="signup-login-error-message">
              {state.loginState.loginError}
            </p>
          )}
          <button
            className={
              usernameError
                ? "signup-login-form-submit-disabled"
                : "signup-login-form-submit"
            }
            disabled={usernameError ? true : false}
          >
            Login
          </button>
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
