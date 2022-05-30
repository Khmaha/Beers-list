import React, { useState } from "react";
import CardComponent from "../CardComponent/CardComponent";
import { useSelector, useDispatch, useStore } from "react-redux";
import { Pagination } from "antd";
import { setPageSize } from "../../store/actions";
import "./CardList.scss";
import useHooks from "../../useHooks";
const CardList = ({ type }) => {
  const state = useSelector((state) => state);
  const getBeers = state
    ? state.searchWord
      ? state.filtredBeers
      : state.allBeers
    : {};

  return (
    <>
      <div
        className={`card-list card-list${
          type === "order" ? "--horizontal" : "--vertical"
        }`}
      >
        {state &&
          getBeers &&
          getBeers.length > 0 &&
          getBeers.map((beer) => (
            <CardComponent
              key={beer.id}
              beer={beer}
              type={type}
            ></CardComponent>
          ))}
      </div>
    </>
  );
};

export default React.memo(CardList);
