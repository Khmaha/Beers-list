import React, { useState } from "react";
import CardComponent from "../CardComponent/CardComponent";
import { useSelector, useDispatch, useStore } from "react-redux";
import EmptyData from "../commun/EmptyData/EmptyData";
import "./CardList.scss";
const CardList = ({ type }) => {
  const state = useSelector((state) => state);
  const getBeers = state && state.allBeers;

  return (
    <>
      <div
        className={`card-list card-list${
          type === "order"
            ? "--horizontal"
            : !getBeers.length
            ? "--empty"
            : "--vertical"
        }`}
      >
        {state && getBeers && getBeers.length > 0 ? (
          getBeers.map((beer) => (
            <CardComponent
              key={beer.id}
              beer={beer}
              type={type}
            ></CardComponent>
          ))
        ) : (
          <EmptyData></EmptyData>
        )}
      </div>
    </>
  );
};

export default React.memo(CardList);
