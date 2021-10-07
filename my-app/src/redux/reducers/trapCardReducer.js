const initialState = {
  loading: false,
  trapCards: [],
  error: "",
};

const trapCardReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_TRAP_CARD_REQUEST":
      return { ...state, loading: true };
    case "ADD_TRAP_CARD_SUCCESS":
      return {
        loading: false,
        trapCards: [...state.trapCards, action.payload],
        error: "",
      };
    case "ADD_TRAP_CARD_FAILS":
      return {
        loading: false,
        trapCards: state.trapCards,
        error: action.payload,
      };
    case "FETCH_TRAP_CARD_REQUEST":
      return {
        ...state,
        loading: true,
      };
    case "FETCH_TRAP_CARD_SUCCESS":
      return {
        loading: false,
        trapCards: action.payload,
        error: "",
      };
    case "FETCH_TRAP_CARD_FAILS":
      return {
        loading: false,
        trapCards: [],
        error: action.payload,
      };
    case "EDIT_TRAP_CARD_REQUEST":
      return {
        ...state,
        loading: true,
      };
    case "EDIT_TRAP_CARD_SUCCESS":
      for (let i in state.trapCards) {
        if (state.trapCards[i]._id === action.payload._id) {
          state.trapCards[i] = action.payload;
          break;
        }
      }
      return {
        loading: false,
        trapCards: state.trapCards,
        error: "",
      };
    case "EDIT_TRAP_CARD_FAILS":
      return {
        loading: false,
        trapCards: state.trapCards,
        error: action.payload,
      };
    case "DELETE_TRAP_CARD_REQUEST":
      return {
        ...state,
        loading: true,
      };
    case "DELETE_TRAP_CARD_SUCCESS":
      return {
        loading: false,
        trapCards: state.trapCards.filter(
          (card) => card._id !== action.payload._id
        ),
        error: "",
      };
    case "DELETE_TRAP_CARD_FAILS":
      return {
        loading: false,
        trapCards: state.trapCards,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default trapCardReducer;
