import { React, useState, useEffect } from "react";
import { Redirect, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../redux/index";
import Loading from "../Components/Loading";
import ErrorMessage from "../Components/ErrorMessage";

function RegisterPage() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [emailError, setEmailError] = useState(undefined);
  const [usernameError, setUsernameError] = useState(undefined);
  const dispatch = useDispatch();

  const regex = /^[A-Za-z0-9_]*$/;

  const { signupUser, authUser } = bindActionCreators(actionCreators, dispatch);
  const stateSignup = useSelector((state) => state.signupUser);
  const stateLogin = useSelector((state) => state.loginUser);

  const userSignupForm = (e) => {
    e.preventDefault();

    if (emailError) {
      setEmailError("The email is invalid!");
      return;
    }

    const userData = {
      Email: email,
      Username: username,
      Password: password,
    };

    signupUser(userData);
  };

  useEffect(() => {
    const authUserOnLoad = () => {
      authUser({ Username: undefined, Password: undefined });
    };

    authUserOnLoad();
  }, []);

  const validateEmail = (email) => {
    const emailRegex =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    return emailRegex.test(String(email).toLowerCase());
  };

  const setEmailHandler = (e) => {
    setEmail(e.target.value);
    if (validateEmail(e.target.value)) {
      setEmailError(undefined);
    } else {
      setEmailError(true);
    }
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
        <h1 className="signup-login-title">Sign Up</h1>
        <form onSubmit={userSignupForm}>
          <div>
            <label className="signup-login-input-label">Email</label>
            <br />
            <input
              onChange={setEmailHandler}
              type="email"
              placeholder="Enter your Email"
              className="signup-login-input-textbox"
              value={email}
            />
            {typeof emailError === "string" ? (
              <ErrorMessage error={emailError} />
            ) : (
              ""
            )}
          </div>
          <div>
            <label className="signup-login-input-label">Username</label>
            <br />
            <input
              onChange={setUsernameHandler}
              type="text"
              placeholder="Enter your Username"
              className="signup-login-input-textbox"
            />
            {usernameError ? <ErrorMessage error={usernameError} /> : ""}
          </div>
          <div>
            <label className="signup-login-input-label">Password</label>
            <br />
            <input
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="Enter your Password"
              className="signup-login-input-textbox"
            />
          </div>
          {stateSignup.signupError ? (
            <p className="signup-login-error-message">
              {stateSignup.signupError}
            </p>
          ) : (
            ""
          )}
          <button className="signup-login-form-submit">Sign Up</button>
          <p className="signup-login-link-btn">
            <span className="text-gray-900">Already registered? </span>
            <Link to="/login">Log In</Link>
          </p>
        </form>
        {stateSignup.loading && <Loading />}
        {stateSignup.isSuccess && <Redirect to="/login" />}
        {stateLogin.loginState.isAuth ? (
          <Redirect to="/" />
        ) : (
          <p className="signup-login-error-message"></p>
        )}
      </div>
    </div>
  );
}

export default RegisterPage;
