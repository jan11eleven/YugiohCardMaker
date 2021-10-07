const initialState = {
  loading: false,
  loginState: {
    isAuth: false,
    loginError: "",
    redirect: undefined,
  },
  credentials: {
    username: undefined,
    password: undefined,
  },
  error: "",
};

const loginUserReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN_USER_REQUEST":
      return { ...state, loading: true };
    case "LOGIN_USER_SUCCESS":
      return {
        loading: false,
        loginState: action.payload.loginState,
        credentials: action.payload.credentials,
        error: "",
      };
    case "LOGIN_USER_ERROR":
      return {
        loading: false,
        loginState: { isAuth: false, loginError: "", redirect: "" },
        credentials: {
          username: undefined,
          password: undefined,
        },
        error: action.payload,
      };
    case "LOGOUT_USER_REQUEST":
      return { ...state, loading: true };
    case "LOGOUT_USER_SUCCESS":
      return {
        loading: false,
        loginState: action.payload.loginState,
        credentials: action.payload.credentials,
        error: "",
      };
    case "LOGOUT_USER_ERROR":
      return {
        loading: false,
        loginState: { isAuth: false, loginError: "", redirect: "" },
        credentials: {
          username: undefined,
          password: undefined,
        },
        error: action.payload,
      };
    case "AUTHENTICATE_USER_REQUEST":
      return {
        ...state,
        loading: true,
      };
    case "AUTHENTICATE_USER_SUCCESS":
      return {
        loading: false,
        loginState: action.payload.loginState,
        credentials: action.payload.credentials,
        error: "",
      };
    case "AUTHENTICATE_USER_FAILS":
      return {
        loading: false,
        loginState: { isAuth: false, loginError: "", redirect: "" },
        credentials: { username: undefined, password: undefined },
        error: action.payload,
      };
    default:
      return state;
  }
};

export default loginUserReducer;
