import axios from "axios";

const AUTHENTICATE_USER_REQUEST = "AUTHENTICATE_USER_REQUEST";
const AUTHENTICATE_USER_SUCCESS = "AUTHENTICATE_USER_SUCCESS";
const AUTHENTICATE_USER_FAILS = "AUTHENTICATE_USER_FAILS";

const authUserRequest = () => ({
  type: AUTHENTICATE_USER_REQUEST,
});

const authUserSuccess = (data) => ({
  type: AUTHENTICATE_USER_SUCCESS,
  payload: data,
});

const authUserFails = (error) => ({
  type: AUTHENTICATE_USER_FAILS,
  payload: error,
});

const authUser = (userCred) => {
  return (dispatch) => {
    dispatch(authUserRequest());

    axios
      .post("/api/users/authenticate", userCred)
      .then((res) => {
        dispatch(authUserSuccess(res.data));
      })
      .catch((err) => {
        dispatch(authUserFails(err.message));
      });
  };
};

export default authUser;
