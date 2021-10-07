import axios from "axios";

const DELETE_TRAP_CARD_REQUEST = "DELETE_TRAP_CARD_REQUEST";
const DELETE_TRAP_CARD_SUCCESS = "DELETE_TRAP_CARD_SUCCESS";
const DELETE_TRAP_CARD_FAILS = "DELETE_TRAP_CARD_FAILS";

const deleteTrapCardRequest = () => ({
  type: DELETE_TRAP_CARD_REQUEST,
});

const deleteTrapCardSuccess = (data) => ({
  type: DELETE_TRAP_CARD_SUCCESS,
  payload: data,
});

const deleteTrapCardFails = (error) => ({
  type: DELETE_TRAP_CARD_FAILS,
  payload: error,
});

const deleteTrapCard = (id) => {
  return (dispatch) => {
    dispatch(deleteTrapCardRequest());
    axios
      .delete("/api/cards/traps/" + id)
      .then((res) => {
        dispatch(deleteTrapCardSuccess(res.data));
      })
      .catch((err) => {
        dispatch(deleteTrapCardFails(err.message));
      });
  };
};

export default deleteTrapCard;
