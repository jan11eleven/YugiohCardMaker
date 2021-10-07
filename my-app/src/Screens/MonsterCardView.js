import { React, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

function MonsterCardView() {
  const { card_id } = useParams();
  const [cardInfo, setCardInfo] = useState([]);

  // get card on load
  useEffect(() => {
    const fetchCardInfo = async () => {
      const { data } = await axios.get("/api/cards/monsters/" + card_id);

      setCardInfo(data);
    };

    fetchCardInfo();
  }, [card_id]);

  return (
    <div>
      <h1>Monster Card</h1>
      {cardInfo.length === 0 ? (
        <p>Loading..</p>
      ) : (
        <div>
          <img alt="Monster" src={"/image/" + cardInfo.MonsterImage} />
          <h2>{cardInfo.MonsterName}</h2>
          <p>Card Type: {cardInfo.CardType}</p>
          <p>Attribute: {cardInfo.MonsterAttribute}</p>
          <p>Star Level: {cardInfo.MonsterStar}</p>
          <p>
            {cardInfo.MonsterRace + " / "}
            {cardInfo.MonsterIsNormal ? "Description" : "Effect"}:{" "}
            {cardInfo.MonsterEffDesc}
          </p>
          <p>Attack: {cardInfo.MonsterAttack}</p>
          <p>Defense: {cardInfo.MonsterDefense}</p>
          <Link to={"/monster/edit/" + cardInfo._id}>
            <button>Edit</button>
          </Link>
        </div>
      )}
    </div>
  );
}

export default MonsterCardView;
