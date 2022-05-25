import React, { useState, useEffect, createContext } from "react";
import CardComponent from "../CardComponent/CardComponent";
import { useSelector, useDispatch, useStore } from "react-redux";
import { Spin, Pagination } from "antd";
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
  const pageSizeOptions = [10, 20, 50, 100];
  const dispatch = useDispatch();
  const { getAllBeersCallApi } = useHooks();

  const onShowSizeChange = (current, pageSize) => {
    console.log(current, pageSize);
    dispatch(setPageSize({ payload: pageSize }));
    getAllBeersCallApi({ page: current, pageSize: pageSize });
  };

  //  state ?   (state.searchWord ?   state.filtredBooks :state[type]  ) :{}
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
      {state && getBeers && getBeers.length > 0 && (
        <Pagination
          className="books-list__pagination"
          defaultCurrent={1}
          total={state && getBeers && getBeers.length > 0 ? getBeers.length : 1}
          showSizeChanger
          defaultPageSize={state.pageSize}
          onShowSizeChange={onShowSizeChange}
          pageSizeOptions={pageSizeOptions}
        />
      )}
    </>
  );
};

export default React.memo(CardList);
