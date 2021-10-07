const initialState = {
  loading: false,
  monsterCards: [],
  error: "",
};

const monsterCardsReducer = (state = initialState, action) => {
  switch (action.type) {
    // fetch all monsters
    case "FETCH_ALL_MONSTER_REQUEST":
      return { ...state, loading: true };
    case "FETCH_ALL_MONSTER_SUCCESS":
      return {
        loading: false,
        monsterCards: action.payload,
        error: "",
      };
    case "FETCH_ALL_MONSTER_FAILS":
      return { loading: false, monsterCards: [], error: action.payload };
    // add 1 monster
    case "ADD_MONSTER_CARD_REQUEST":
      return { ...state, loading: true };
    case "ADD_MONSTER_CARD_SUCCESS":
      return {
        loading: false,
        monsterCards: [...state.monsterCards, action.payload],
        error: "",
      };
    case "ADD_MONSTER_CARD_FAILS":
      return {
        loading: false,
        monsterCards: state.monsterCards,
        error: action.payload,
      };
    // delete 1 monster
    case "DELETE_MONSTER_CARD_REQUEST":
      return { ...state, loading: true };
    case "DELETE_MONSTER_CARD_SUCCESS":
      return {
        loading: false,
        monsterCards: state.monsterCards.filter(
          (monster) => monster._id !== action.payload._id
        ),
        error: "",
      };
    case "DELETE_MONSTER_CARD_FAILS":
      return {
        loading: false,
        monsterCards: state.monsterCards,
        error: action.payload,
      };
    // edit monster
    case "EDIT_MONSTER_CARD_REQUEST":
      return { ...state, loading: true };
    case "EDIT_MONSTER_CARD_SUCCESS":
      for (let i in state.monsterCards) {
        if (action.payload._id === state.monsterCards[i]._id) {
          state.monsterCards[i] = action.payload;
          break;
        }
      }
      return {
        loading: false,
        monsterCards: state.monsterCards,
        error: "",
      };
    case "EDIT_MONSTER_CARD_FAILS":
      return {
        loading: false,
        monsterCards: state.monsterCards,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default monsterCardsReducer;
