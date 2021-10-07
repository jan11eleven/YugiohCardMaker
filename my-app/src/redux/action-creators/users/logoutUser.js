import axios from "axios";

const LOGOUT_USER_REQUEST = "LOGOUT_USER_REQUEST";
const LOGOUT_USER_SUCCESS = "LOGOUT_USER_SUCCESS";
const LOGOUT_USER_ERROR = "LOGOUT_USER_ERROR";

const logoutUserRequest = () => ({
  type: LOGOUT_USER_REQUEST,
});

const logoutUserSuccess = ({ loginState, credentials }) => ({
  type: LOGOUT_USER_SUCCESS,
  payload: {
    loginState,
    credentials,
  },
});

const logoutUserError = (error) => ({
  type: LOGOUT_USER_ERROR,
  payload: error,
});

const logoutUser = () => {
  return (dispatch) => {
    dispatch(logoutUserRequest());

    axios
      .delete("/api/users/logout")
      .then((res) => {
        dispatch(logoutUserSuccess(res.data));
      })
      .catch((err) => {
        dispatch(logoutUserError(err.message));
      });
  };
};

export default logoutUser;
