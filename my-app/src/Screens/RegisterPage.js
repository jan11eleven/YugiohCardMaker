import { React, useState, useEffect } from "react";
import { Redirect, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../redux/index";
import Loading from "../Components/Loading";

function RegisterPage() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const { signupUser, authUser } = bindActionCreators(actionCreators, dispatch);
  const stateSignup = useSelector((state) => state.signupUser);
  const stateLogin = useSelector((state) => state.loginUser);

  const userSignupForm = (e) => {
    e.preventDefault();

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

  return (
    <div className="flex h-screen">
      <div className="signup-login-form">
        <h1 className="signup-login-title">Sign Up</h1>
        <form onSubmit={userSignupForm}>
          <div>
            <label className="signup-login-input-label">Email</label>
            <br />
            <input
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="Enter your Email"
              className="signup-login-input-textbox"
            />
          </div>
          <div>
            <label className="signup-login-input-label">Username</label>
            <br />
            <input
              onChange={(e) => setUsername(e.target.value)}
              type="text"
              placeholder="Enter your Username"
              className="signup-login-input-textbox"
            />
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
