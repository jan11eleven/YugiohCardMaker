import axios from "axios";

const DELETE_MONSTER_CARD_REQUEST = "DELETE_MONSTER_CARD_REQUEST";
const DELETE_MONSTER_CARD_SUCCESS = "DELETE_MONSTER_CARD_SUCCESS";
const DELETE_MONSTER_CARD_FAILS = "DELETE_MONSTER_CARD_FAILS";

// actions
const deleteMonsterCardRequest = () => ({
  type: DELETE_MONSTER_CARD_REQUEST,
});

const deleteMonsterCardSuccess = (deletedMonster) => ({
  type: DELETE_MONSTER_CARD_SUCCESS,
  payload: deletedMonster,
});

const deleteMonsterCardFails = (error) => ({
  type: DELETE_MONSTER_CARD_FAILS,
  payload: error,
});

// action-creators
const deleteMonsterCard = (id) => {
  return (dispatch) => {
    dispatch(deleteMonsterCardRequest());
    axios
      .delete("/api/cards/monsters/" + id)
      .then((res) => {
        if (res.data) {
          dispatch(deleteMonsterCardSuccess(res.data));
        }
      })
      .catch((err) => {
        dispatch(deleteMonsterCardFails(err.message));
      });
  };
};

export default deleteMonsterCard;
