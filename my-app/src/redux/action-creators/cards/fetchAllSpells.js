import axios from "axios";

const FETCH_ALL_SPELLS_REQUEST = "FETCH_ALL_SPELLS_REQUEST";
const FETCH_ALL_SPELLS_SUCCESS = "FETCH_ALL_SPELLS_SUCCESS";
const FETCH_ALL_SPELLS_FAILS = "FETCH_ALL_SPELLS_FAILS";

const fetchAllSpellsRequestAction = () => ({
  type: FETCH_ALL_SPELLS_REQUEST,
});

const fetchAllSpellsSuccessAction = (data) => ({
  type: FETCH_ALL_SPELLS_SUCCESS,
  payload: data,
});

const fetchAllSpellsFailsAction = (error) => ({
  type: FETCH_ALL_SPELLS_FAILS,
  payload: error,
});

const fetchAllSpells = () => {
  return (dispatch) => {
    dispatch(fetchAllSpellsRequestAction());

    axios
      .get("/api/cards/spells")
      .then((res) => {
        dispatch(fetchAllSpellsSuccessAction(res.data.cards));
      })
      .catch((err) => {
        dispatch(fetchAllSpellsFailsAction(err.message));
      });
  };
};

export default fetchAllSpells;
