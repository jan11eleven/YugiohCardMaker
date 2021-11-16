import axios from "axios";

const ADD_MONSTER_CARD_REQUEST = "ADD_MONSTER_CARD";
const ADD_MONSTER_CARD_SUCCESS = "ADD_MONSTER_CARD_SUCCESS";
const ADD_MONSTER_CARD_FAILS = "ADD_MONSTER_CARD_FAILS";

// add monster card
const addMonsterCardRequest = () => ({
  type: ADD_MONSTER_CARD_REQUEST,
});

const addMonsterCardSuccess = (data) => ({
  type: ADD_MONSTER_CARD_SUCCESS,
  payload: data,
});

const addMonsterCardFails = (error) => ({
  type: ADD_MONSTER_CARD_FAILS,
  payload: error,
});
// action creator
const addMonsterCard = ({ monsterCard, selectedImage, fileData }) => {
  return (dispatch) => {
    dispatch(addMonsterCardRequest());
    let bodyFormData = new FormData();
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

    bodyFormData.append("file", selectedImage);
    bodyFormData.append("file", fileData);
    axios({
      method: "post",
      url: "/api/cards/monsters",
      data: bodyFormData,
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then((res) => {
        dispatch(addMonsterCardSuccess(res.data));
      })
      .catch((err) => {
        dispatch(addMonsterCardFails(err.message));
      });
  };
};

export default addMonsterCard;
