import { React, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import downloadImage from "../cards_img/downloadImage";

function TrapCardView() {
  const { card_id } = useParams();
  const [cardInfo, setCardInfo] = useState([]);
  const imgUrl = "/image/" + cardInfo.ConvertedImage;

  // get card on load
  useEffect(() => {
    const fetchCardInfo = async () => {
      const { data } = await axios.get("/api/cards/traps/" + card_id);

      setCardInfo(data);
    };

    fetchCardInfo();
  }, [card_id]);

  return (
    <div>
      <h1>{cardInfo.TrapName}</h1>
      {cardInfo.length === 0 ? (
        <p>Loading..</p>
      ) : (
        <div>
          <img alt="Trap" src={imgUrl} className="converted-image" />
          <button
            onClick={() => {
              downloadImage(imgUrl, cardInfo.TrapName);
            }}
          >
            download
          </button>
          <Link to={"/traps/edit/" + cardInfo._id}>
            <button>Edit</button>
          </Link>
        </div>
      )}
    </div>
  );
}

export default TrapCardView;
