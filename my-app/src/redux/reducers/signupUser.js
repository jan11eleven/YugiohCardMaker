const initialState = {
  loading: false,
  newUser: undefined,
  error: "",
  signupError: undefined,
  isSuccess: false,
};

const SignupUserReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SIGNUP_USER_REQUEST":
      return { ...state, loading: true };
    case "SIGNUP_USER_SUCCESS":
      return {
        loading: false,
        newUser: action.payload,
        error: "",
        signupError: undefined,
        isSuccess: true,
      };
    case "SIGNUP_USER_ERROR":
      return {
        loading: false,
        newUser: undefined,
        error: "",
        signupError: action.payload,
        isSuccess: false,
      };
    case "SIGNUP_USER_FAILS":
      return {
        loading: false,
        newUser: undefined,
        error: action.payload,
        signupError: undefined,
        isSuccess: false,
      };
    default:
      return state;
  }
};

export default SignupUserReducer;
