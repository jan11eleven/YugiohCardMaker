import { React, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import downloadImage from "../cards_img/downloadImage";

function SpellCardView() {
  const { card_id } = useParams();
  const [cardInfo, setCardInfo] = useState([]);
  const imgUrl = "/image/" + cardInfo.ConvertedImage;

  // get card on load
  useEffect(() => {
    const fetchCardInfo = async () => {
      const { data } = await axios.get("/api/cards/spells/" + card_id);

      setCardInfo(data);
    };

    fetchCardInfo();
  }, [card_id]);

  return (
    <div>
      <h1>{cardInfo.SpellName}</h1>
      {cardInfo.length === 0 ? (
        <p>Loading..</p>
      ) : (
        <div>
          <img
            alt="Spell"
            src={"/image/" + cardInfo.ConvertedImage}
            className="converted-image"
          />
          <button
            onClick={() => {
              downloadImage(imgUrl, cardInfo.SpellName);
            }}
          >
            download
          </button>
          <Link to={"/spells/edit/" + cardInfo._id}>
            <button>Edit</button>
          </Link>
        </div>
      )}
    </div>
  );
}

export default SpellCardView;
