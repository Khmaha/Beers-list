import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import useHooks from "../../useHooks";
import { Tag } from "antd";
import "./BeersDetail.scss";
import SkeletonComponent from "../commun/SkeletonComponent/SkeletonComponent";
const BeersDetail = () => {
  const state = useSelector((state) => state);
  const cardBeerList = state.cardBeerList;
  const { getBeersByIdCallApi, loading } = useHooks();
  const { id } = useParams();
  const beerDetail = state.beerDetail;
  const beerOrdred = cardBeerList.filter((x) => x.id === parseInt(id));
  useEffect(() => {
    getBeersByIdCallApi(parseInt(id));
  }, []);

  return (
    <div className="beer-detail">
      {loading ? (
        <SkeletonComponent
          shape={"square"}
          size="large"
          rows="4"
        ></SkeletonComponent>
      ) : (
        beerDetail && (
          <>
            <div className="beer-detail__img">
              <img src={beerDetail.image_url} />
            </div>
            <div className="beer-detail__content">
              <span className="beer-detail__content-subtitle">
                <span className="beer-detail__content--title">
                  <span>{beerDetail.name}</span>
                  <span className="beer-detail__content--ordred">
                    <Tag color="orange">
                      {beerOrdred && beerOrdred.length > 0
                        ? "Bière commandée"
                        : "Bière non commandée"}
                    </Tag>
                  </span>
                </span>
                <span className="beer-detail__content--tagline">
                  {beerDetail.tagline}
                </span>
              </span>

              <span className="beer-detail__content--description">
                <span style={{ fontWeight: "bold" }}>Description:</span>
                <span style={{ fontWeight: "400" }}>
                  {beerDetail.description}
                </span>
              </span>

              {/* <span className='beer-detail__content--ingredients'>{
                                beerDetail.ingredients && Object.keys(beerDetail.ingredients).length &&
                                beerDetail.ingredients.malt
                                }</span> */}

              <span className="beer-detail__content--volume">
                <span style={{ fontWeight: "bold" }}>Volume:</span>
                {beerDetail.boil_volume.value +
                  " " +
                  beerDetail.boil_volume.unit}
              </span>
              <span className="beer-detail__content--brewers_tips">
                <span style={{ fontWeight: "bold" }}>Conseils:</span>
                {beerDetail.brewers_tips}
              </span>
              <span className="beer-detail__content--ingredients">
                <span style={{ fontWeight: "bold" }}>Ingédients:</span>
                {/* {beerDetail.ingredients} */}
              </span>
            </div>
          </>
        )
      )}
    </div>
  );
};

export default BeersDetail;
