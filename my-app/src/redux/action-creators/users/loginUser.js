import axios from "axios";

const LOGIN_USER_REQUEST = "LOGIN_USER_REQUEST";
const LOGIN_USER_SUCCESS = "LOGIN_USER_SUCCESS";
const LOGIN_USER_ERROR = "LOGIN_USER_ERROR";

const loginUserRequest = () => ({
  type: LOGIN_USER_REQUEST,
});

const loginUserSuccess = ({ loginState, credentials }) => ({
  type: LOGIN_USER_SUCCESS,
  payload: {
    loginState,
    credentials,
  },
});

const loginUserError = (error) => ({
  type: LOGIN_USER_ERROR,
  payload: error,
});

const loginUser = (userCred) => {
  return (dispatch) => {
    dispatch(loginUserRequest());

    axios
      .post("/api/users/login", userCred)
      .then((res) => {
        dispatch(loginUserSuccess(res.data));
      })
      .catch((err) => {
        dispatch(loginUserError(err.message));
      });
  };
};

export default loginUser;
