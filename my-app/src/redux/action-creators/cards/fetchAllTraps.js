import axios from "axios";

const FETCH_TRAP_CARD_REQUEST = "FETCH_TRAP_CARD_REQUEST";
const FETCH_TRAP_CARD_SUCCESS = "FETCH_TRAP_CARD_SUCCESS";
const FETCH_TRAP_CARD_FAILS = "FETCH_TRAP_CARD_FAILS";

const fetchTrapCardRequest = () => ({
  type: FETCH_TRAP_CARD_REQUEST,
});

const fetchTrapCardSuccess = (data) => ({
  type: FETCH_TRAP_CARD_SUCCESS,
  payload: data,
});

const fetchTrapCardFails = (error) => ({
  type: FETCH_TRAP_CARD_FAILS,
  payload: error,
});

const fetchAllTraps = () => {
  return (dispatch) => {
    dispatch(fetchTrapCardRequest);
    axios
      .get("/api/cards/traps")
      .then((res) => {
        dispatch(fetchTrapCardSuccess(res.data.cards));
      })
      .catch((err) => {
        dispatch(fetchTrapCardFails(err.message));
      });
  };
};

export default fetchAllTraps;
