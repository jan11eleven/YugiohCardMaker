import { React, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import downloadImage from "../cards_img/downloadImage";
import AllPageTitles from "../Components/AllPageTitles";
import Loading from "../Components/Loading";
import { DownloadIcon, PencilIcon } from "@heroicons/react/solid";

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
      <AllPageTitles title={cardInfo.SpellName} />
      {cardInfo.length === 0 ? (
        <Loading />
      ) : (
        <div className="view-card-container">
          <img
            alt="Spell"
            src={"/image/" + cardInfo.ConvertedImage}
            className="converted-image view-card-converted"
          />
          <div className="view-card-btn-container">
            <button
              onClick={() => {
                downloadImage(imgUrl, cardInfo.SpellName);
              }}
              className="view-card-download-btn"
            >
              <DownloadIcon className="DownloadIconStyles" />
              Download
            </button>
            <Link to={"/spells/edit/" + cardInfo._id}>
              <button className="view-card-edit-btn">
                <PencilIcon className="PencilIconStyles" />
                Edit
              </button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default SpellCardView;
