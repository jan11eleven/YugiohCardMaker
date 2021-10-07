import axios from "axios";

const ADD_TRAP_CARD_REQUEST = "ADD_TRAP_CARD_REQUEST";
const ADD_TRAP_CARD_SUCCESS = "ADD_TRAP_CARD_SUCCESS";
const ADD_TRAP_CARD_FAILS = "ADD_TRAP_CARD_FAILS";

const addTrapCardRequest = () => ({
  type: ADD_TRAP_CARD_REQUEST,
});

const addTrapCardSuccess = (data) => ({
  type: ADD_TRAP_CARD_SUCCESS,
  payload: data,
});

const addTrapCardFails = (error) => ({
  type: ADD_TRAP_CARD_FAILS,
  payload: error,
});

const addTrapCard = ({ trapCard, selectedImage, fileData }) => {
  return (dispatch) => {
    dispatch(addTrapCardRequest());

    let bodyFormData = new FormData();

    bodyFormData.append("TrapName", trapCard.TrapName);
    bodyFormData.append("TrapType", trapCard.TrapType);
    bodyFormData.append("TrapEff", trapCard.TrapEff);
    bodyFormData.append("CardType", trapCard.CardType);
    bodyFormData.append("CardAuthor", trapCard.CardAuthor);

    bodyFormData.append("file", selectedImage);
    bodyFormData.append("file", fileData);
    axios({
      method: "post",
      url: "/api/cards/traps",
      data: bodyFormData,
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then((res) => {
        dispatch(addTrapCardSuccess(res.data));
      })
      .catch((err) => {
        dispatch(addTrapCardFails(err.message));
      });
  };
};

export default addTrapCard;
