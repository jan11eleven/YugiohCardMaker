import axios from "axios";

const EDIT_TRAP_CARD_REQUEST = "EDIT_TRAP_CARD_REQUEST";
const EDIT_TRAP_CARD_SUCCESS = "EDIT_TRAP_CARD_SUCCESS";
const EDIT_TRAP_CARD_FAILS = "EDIT_TRAP_CARD_FAILS";

const editTrapCardRequest = () => ({
  type: EDIT_TRAP_CARD_REQUEST,
});

const editTrapCardSuccess = (data) => ({
  type: EDIT_TRAP_CARD_SUCCESS,
  payload: data,
});

const editTrapCardFails = (error) => ({
  type: EDIT_TRAP_CARD_FAILS,
  payload: error,
});

const editTrapCard = ({ trapCard, selectedImage, fileData }) => {
  return (dispatch) => {
    dispatch(editTrapCardRequest());

    let bodyFormData = new FormData();

    bodyFormData.append("TrapImage", trapCard.TrapImage);
    bodyFormData.append("TrapName", trapCard.TrapName);
    bodyFormData.append("TrapType", trapCard.TrapType);
    bodyFormData.append("TrapEff", trapCard.TrapEff);
    bodyFormData.append("CardType", trapCard.CardType);
    bodyFormData.append("CardAuthor", trapCard.CardAuthor);
    bodyFormData.append("ConvertedImage", trapCard.ConvertedImage);

    bodyFormData.append("file", selectedImage);
    bodyFormData.append("file", fileData);

    axios({
      method: "patch",
      url: "/api/cards/traps/" + trapCard._id,
      data: bodyFormData,
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then((res) => {
        dispatch(editTrapCardSuccess(res.data));
      })
      .catch((err) => {
        dispatch(editTrapCardFails(err.message));
      });
  };
};

export default editTrapCard;
