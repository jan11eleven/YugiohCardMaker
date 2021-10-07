const initialState = {
  loading: false,
  spellCards: [],
  error: "",
};

const spellCardReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_SPELL_CARD_REQUEST":
      return { ...state, loading: true };
    case "ADD_SPELL_CARD_SUCCESS":
      return {
        loading: false,
        spellCards: [...state.spellCard, action.payload],
        error: "",
      };
    case "ADD_SPELL_CARD_FAILS":
      return {
        loading: false,
        spellCards: state.spellCards,
        error: action.payload,
      };
    case "FETCH_ALL_SPELLS_REQUEST":
      return { ...state, loading: true };
    case "FETCH_ALL_SPELLS_SUCCESS":
      return { loading: false, spellCards: action.payload, error: "" };
    case "FETCH_ALL_SPELLS_FAILS":
      return { loading: false, spellCards: [], error: action.payload };
    case "EDIT_SPELL_CARD_REQUEST":
      return {
        ...state,
        loading: true,
      };
    case "EDIT_SPELL_CARD_SUCCESS":
      for (let i in state.spellCards) {
        if (state.spellCards[i]._id === action.payload._id) {
          state.spellCards[i] = action.payload;
          return;
        }
      }
      return {
        loading: false,
        spellCards: state.spellCards,
        error: "",
      };
    case "EDIT_SPELL_CARD_FAILS":
      return {
        loading: false,
        spellCards: state.spellCards,
        error: action.payload,
      };
    case "DELETE_SPELL_CARD_REQUEST":
      return { ...state, loading: true };
    case "DELETE_SPELL_CARD_SUCCESS":
      return {
        loading: false,
        spellCards: state.spellCards.filter(
          (card) => card._id !== action.payload._id
        ),
        error: "",
      };
    case "DELETE_SPELL_CARD_FAILS":
      return {
        loading: false,
        spellCards: state.spellCards,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default spellCardReducer;
