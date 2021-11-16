import { React, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import downloadImage from "../cards_img/downloadImage";
import axios from "axios";
import AllPageTitles from "../Components/AllPageTitles";
import { DownloadIcon, PencilIcon } from "@heroicons/react/solid";
import Loading from "../Components/Loading";

function MonsterCardView() {
  const { card_id } = useParams();
  const [cardInfo, setCardInfo] = useState([]);
  const [loading, setLoading] = useState(true);
  const imgUrl = "/image/" + cardInfo.ConvertedImage;
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
      <AllPageTitles title={cardInfo.MonsterName} />

      {cardInfo.length === 0 ? (
        <Loading />
      ) : (
        <div className="view-card-container ">
          <img
            alt="Monster"
            className="converted-image view-card-converted"
            src={"/image/" + cardInfo.ConvertedImage}
            onLoad={() => setLoading(false)}
          />
          <div className="view-card-btn-container">
            <button
              onClick={() => {
                downloadImage(imgUrl, cardInfo.MonsterName);
              }}
              className="view-card-download-btn"
            >
              <DownloadIcon className="DownloadIconStyles" />
              Download
            </button>
            <Link to={"/monster/edit/" + cardInfo._id}>
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

export default MonsterCardView;
