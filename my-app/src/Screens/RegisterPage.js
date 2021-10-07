import { React, useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../redux/index";

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
    <div>
      <h1>Sign Up</h1>
      <form onSubmit={userSignupForm}>
        <input
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="Email"
        />
        <input
          onChange={(e) => setUsername(e.target.value)}
          type="text"
          placeholder="Username"
        />
        <input
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="Password"
        />
        {stateSignup.signupError ? <p>{stateSignup.signupError}</p> : ""}
        <button>Sign Up</button>
      </form>
      {stateSignup.loading && <p>Loading...</p>}
      {stateSignup.isSuccess && <Redirect to="/login" />}
      {stateLogin.loginState.isAuth ? (
        <Redirect to="/" />
      ) : (
        <label>{stateLogin.loginState.loginError}</label>
      )}
    </div>
  );
}

export default RegisterPage;
