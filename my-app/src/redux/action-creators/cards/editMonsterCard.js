import axios from "axios";

const EDIT_MONSTER_CARD_REQUEST = "EDIT_MONSTER_CARD_REQUEST";
const EDIT_MONSTER_CARD_SUCCESS = "EDIT_MONSTER_CARD_SUCCESS";
const EDIT_MONSTER_CARD_FAILS = "EDIT_MONSTER_CARD_FAILS";

// actions
const editMonsterCardRequest = () => ({
  type: EDIT_MONSTER_CARD_REQUEST,
});

const editMonsterCardSuccess = (updated) => ({
  type: EDIT_MONSTER_CARD_SUCCESS,
  payload: updated,
});

const editMonsterCardFails = (error) => ({
  type: EDIT_MONSTER_CARD_FAILS,
});

// action-creator
const editMonsterCard = ({ monsterCard, selectedImage, fileData }) => {
  return (dispatch) => {
    dispatch(editMonsterCardRequest());
    let bodyFormData = new FormData();

    bodyFormData.append("MonsterImage", monsterCard.MonsterImage);
    bodyFormData.append("MonsterName", monsterCard.MonsterName);
    bodyFormData.append("CardType", monsterCard.CardType);
    bodyFormData.append("MonsterType", monsterCard.MonsterType);
    bodyFormData.append("MonsterRace", monsterCard.MonsterRace);
    bodyFormData.append("MonsterIsNormal", monsterCard.MonsterIsNormal);
    bodyFormData.append("MonsterEffDesc", monsterCard.MonsterEffDesc);
    bodyFormData.append("MonsterAttribute", monsterCard.MonsterAttribute);
    bodyFormData.append("MonsterStar", monsterCard.MonsterStar);
    bodyFormData.append("MonsterAttack", monsterCard.MonsterAttack);
    bodyFormData.append("MonsterDefense", monsterCard.MonsterDefense);
    bodyFormData.append("CardAuthor", monsterCard.CardAuthor);
    bodyFormData.append("ConvertedImage", monsterCard.ConvertedImage);

    bodyFormData.append("file", selectedImage);
    bodyFormData.append("file", fileData);

    axios({
      method: "patch",
      url: "/api/cards/monsters/" + monsterCard._id,
      data: bodyFormData,
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then((res) => {
        dispatch(editMonsterCardSuccess(res.data));
      })
      .catch((err) => {
        dispatch(editMonsterCardFails(err.message));
      });
  };
};

export default editMonsterCard;
