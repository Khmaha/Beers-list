import React, { useEffect, Suspense } from "react";
import "./BeersList.scss";
import { useSelector, useDispatch, useStore } from "react-redux";
import { Spin, Pagination } from "antd";
import CardList from "../CardList/CardList.jsx";
import useHooks from "../../useHooks";
import { setPageSize } from "../../store/actions";
const BeersList = () => {
  const state = useSelector((state) => state);
  const { getAllBeersCallApi } = useHooks();
  const getBeers = state
    ? state.searchWord
      ? state.filtredBeers
      : state.allBeers
    : {};
  const maxSize = 80;
  const pageSizeOptions = [10, 20, 50, 80];
  const dispatch = useDispatch();

  const onShowSizeChange = (page, pageSize) => {
    console.log("page", page);
    console.log("pageSize", pageSize);
    dispatch(setPageSize({ payload: pageSize }));
    getAllBeersCallApi({ page: page, pageSize: pageSize });
  };
  useEffect(() => {
    getAllBeersCallApi({ page: 1, pageSize: 10 });
  }, []);

  return (
    <>
      <div className="beers-list">
        <Suspense fallback={<Spin />}>
          {state && !state.loading && <CardList type="beers"></CardList>}
        </Suspense>
      </div>
      {state && getBeers && getBeers.length > 0 && (
        <Pagination
          className="beers-list-pagination"
          defaultCurrent={1}
          total={maxSize}
          showSizeChanger
          defaultPageSize={state.pageSize}
          onChange={onShowSizeChange}
          pageSizeOptions={pageSizeOptions}
        />
      )}
    </>
  );
};

export default BeersList;
