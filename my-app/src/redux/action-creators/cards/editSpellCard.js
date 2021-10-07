import axios from "axios";

const EDIT_SPELL_CARD_REQUEST = "EDIT_SPELL_CARD_REQUEST";
const EDIT_SPELL_CARD_SUCCESS = "EDIT_SPELL_CARD_SUCCESS";
const EDIT_SPELL_CARD_FAILS = "EDIT_SPELL_CARD_FAILS";

const editSpellCardRequest = () => ({
  type: EDIT_SPELL_CARD_REQUEST,
});

const editSpellCardSuccess = (data) => ({
  type: EDIT_SPELL_CARD_SUCCESS,
  payload: data,
});

const editSpellCardFails = (error) => ({
  type: EDIT_SPELL_CARD_FAILS,
  payload: error,
});

const editSpellCard = ({ spellCard, selectedImage, fileData }) => {
  return (dispatch) => {
    dispatch(editSpellCardRequest());

    let bodyFormData = new FormData();

    bodyFormData.append("SpellImage", spellCard.SpellImage);
    bodyFormData.append("SpellName", spellCard.SpellName);
    bodyFormData.append("SpellType", spellCard.SpellType);
    bodyFormData.append("SpellEff", spellCard.SpellEff);
    bodyFormData.append("CardType", spellCard.CardType);
    bodyFormData.append("CardAuthor", spellCard.CardAuthor);
    bodyFormData.append("ConvertedImage", spellCard.ConvertedImage);

    bodyFormData.append("file", selectedImage);
    bodyFormData.append("file", fileData);

    axios({
      method: "patch",
      url: "/api/cards/spells/" + spellCard._id,
      data: bodyFormData,
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then((res) => {
        dispatch(editSpellCardSuccess(res.data));
      })
      .catch((err) => {
        dispatch(editSpellCardFails(err.message));
      });
  };
};

export default editSpellCard;
