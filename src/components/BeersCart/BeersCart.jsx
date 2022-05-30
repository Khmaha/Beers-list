import React from "react";
import { useSelector } from "react-redux";
import "./BeersCart.scss";
import { Button } from "antd";
import CardComponent from "../CardComponent/CardComponent";
import { useNavigate } from "react-router-dom";
const BeersCart = () => {
  const state = useSelector((state) => state);
  const cardBeerList = state.cardBeerList;
  const navigate = useNavigate();

  return (
    <div
      className={
        "beers-card " +
        (state && cardBeerList && cardBeerList.length > 0 ? "" : "empty")
      }
    >
      {state && cardBeerList && cardBeerList.length > 0 ? (
        cardBeerList.map((beer) => (
          <CardComponent
            key={beer.id}
            beer={beer}
            type={"order"}
          ></CardComponent>
        ))
      ) : (
        <>
          {
            <div className="beers-card__empty">
              <span className="beers-card__empty--text">
                Votre panier est vide.
              </span>
              <Button
                type="primary"
                shape="round"
                className="beers-card__empty--return"
                size={"large"}
                onClick={() => navigate("/")}
              >
                Retourner à la liste des bières
              </Button>
            </div>
          }
        </>
      )}
    </div>
  );
};

export default BeersCart;
