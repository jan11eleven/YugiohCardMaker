import axios from "axios";

const FETCH_ALL_MONSTER_REQUEST = "FETCH_ALL_MONSTER_REQUEST";
const FETCH_ALL_MONSTER_SUCCESS = "FETCH_ALL_MONSTER_SUCCESS";
const FETCH_ALL_MONSTER_FAILS = "FETCH_ALL_MONSTER_FAILS";

// fetch all monster cards
const fetchAllMonsterCardsRequest = () => ({
  type: FETCH_ALL_MONSTER_REQUEST,
});

const fetchAllMonsterCardsSuccess = (monsterCards) => ({
  type: FETCH_ALL_MONSTER_SUCCESS,
  payload: monsterCards,
});

const fetchAllMonsterCardsFails = (error) => ({
  type: FETCH_ALL_MONSTER_FAILS,
  payload: error,
});

// actions-creators
const fetchAllMonsters = () => {
  return (dispatch) => {
    dispatch(fetchAllMonsterCardsRequest());
    axios
      .get("/api/cards/monsters")
      .then((res) => {
        dispatch(fetchAllMonsterCardsSuccess(res.data.cards));
      })
      .catch((err) => {
        dispatch(fetchAllMonsterCardsFails(err.message));
      });
  };
};

export default fetchAllMonsters;
