import axios from "axios";

const DELETE_SPELL_CARD_REQUEST = "DELETE_SPELL_CARD_REQUEST";
const DELETE_SPELL_CARD_SUCCESS = "DELETE_SPELL_CARD_SUCCESS";
const DELETE_SPELL_CARD_FAILS = "DELETE_SPELL_CARD_FAILS";

const deleteSpellCardRequestAction = () => ({
  type: DELETE_SPELL_CARD_REQUEST,
});

const deleteSpellCardSuccessAction = (data) => ({
  type: DELETE_SPELL_CARD_SUCCESS,
  payload: data,
});

const deleteSpellCardFailsAction = (error) => ({
  type: DELETE_SPELL_CARD_FAILS,
  payload: error,
});

const deleteSpellCard = (id) => {
  return (dispatch) => {
    dispatch(deleteSpellCardRequestAction());
    axios
      .delete("/api/cards/spells/" + id)
      .then((res) => {
        if (res.data) {
          dispatch(deleteSpellCardSuccessAction(res.data));
        }
      })
      .catch((err) => {
        dispatch(deleteSpellCardFailsAction(err.message));
      });
  };
};

export default deleteSpellCard;
