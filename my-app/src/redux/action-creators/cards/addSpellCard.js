import axios from "axios";

const ADD_SPELL_CARD_REQUEST = "ADD_SPELL_CARD_REQUEST";
const ADD_SPELL_CARD_SUCCESS = "ADD_SPELL_CARD_SUCCESS";
const ADD_SPELL_CARD_FAILS = "ADD_SPELL_CARD_FAILS";

const addSpellCardRequestAction = () => ({
  type: ADD_SPELL_CARD_REQUEST,
});

const addSpellCardSuccessAction = (data) => ({
  type: ADD_SPELL_CARD_SUCCESS,
  payload: data,
});

const addSpellCardFailsAction = (error) => ({
  type: ADD_SPELL_CARD_FAILS,
  payload: error,
});

const addSpellCard = ({ spellCard, selectedImage, fileData }) => {
  return (dispatch) => {
    dispatch(addSpellCardRequestAction());
    let bodyFormData = new FormData();

    bodyFormData.append("SpellName", spellCard.SpellName);
    bodyFormData.append("SpellEff", spellCard.SpellEff);
    bodyFormData.append("SpellType", spellCard.SpellType);
    bodyFormData.append("CardType", spellCard.CardType);
    bodyFormData.append("CardAuthor", spellCard.CardAuthor);

    bodyFormData.append("file", selectedImage);
    bodyFormData.append("file", fileData);
    axios({
      method: "post",
      url: "/api/cards/spells",
      data: bodyFormData,
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then((res) => {
        dispatch(addSpellCardSuccessAction(res.data));
      })
      .catch((err) => {
        dispatch(addSpellCardFailsAction(err.message));
      });
  };
};

export default addSpellCard;
