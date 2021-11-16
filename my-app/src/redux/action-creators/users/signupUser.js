import axios from "axios";

const SIGNUP_USER_REQUEST = "SIGNUP_USER_REQUEST";
const SIGNUP_USER_SUCCESS = "SIGNUP_USER_SUCCESS";
const SIGNUP_USER_ERROR = "SIGNUP_USER_ERROR";
const SIGNUP_USER_FAILS = "SIGNUP_USER_FAILS";

const signupUserRequest = () => ({
  type: SIGNUP_USER_REQUEST,
});

const signupUserSuccess = (data) => ({
  type: SIGNUP_USER_SUCCESS,
  payload: data,
});

const signupUserError = (error) => ({
  type: SIGNUP_USER_ERROR,
  payload: error,
});

const signupUserFails = (error) => ({
  type: SIGNUP_USER_FAILS,
  payload: error,
});

const signupUser = (user) => {
  return (dispatch) => {
    dispatch(signupUserRequest());

    axios
      .post("/api/users/signup", user)
      .then((res) => {
        if (res.data.signupError) {
          dispatch(signupUserError(res.data.signupError));
        } else {
          dispatch(signupUserSuccess(res.data.newUser));
        }
      })
      .catch((err) => {
        dispatch(signupUserFails(err.message));
      });
  };
};

export default signupUser;
