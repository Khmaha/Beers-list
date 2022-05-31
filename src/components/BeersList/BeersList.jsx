import React, { useEffect, Suspense } from "react";
import "./BeersList.scss";
import { useSelector, useDispatch, useStore } from "react-redux";
import { Spin, Pagination } from "antd";
import CardList from "../CardList/CardList.jsx";
import useHooks from "../../useHooks";
import { setPageSize } from "../../store/actions";
const BeersList = () => {
  const state = useSelector((state) => state);
  const searchWord = state.searchWord;
  const { getAllBeersCallApi } = useHooks();
  const getBeers = state && state.allBeers;
  const maxSize = searchWord ? (getBeers.length < 10 ? 1 : 25) : 80;
  const pageSizeOptions = [10, 20, 50, 80];
  const dispatch = useDispatch();

  const onShowSizeChange = (page, pageSize) => {
    dispatch(setPageSize({ payload: { page: page, pageSize: pageSize } }));
    var params = { page: page, pageSize: pageSize };
    if (searchWord) {
      params.beerWord = searchWord;
    }
    getAllBeersCallApi(params);
  };
  useEffect(() => {
    dispatch(setPageSize({ payload: { page: 1, pageSize: 10 } }));
    getAllBeersCallApi({ page: 1, pageSize: 10 });
  }, []);

  return (
    <>
      <div className={`beers-list`}>
        <Suspense fallback={<Spin />}>
          {state && !state.loading && <CardList type="beers"></CardList>}
        </Suspense>
      </div>
      <Pagination
        className="beers-list-pagination"
        defaultCurrent={1}
        total={getBeers.length ? maxSize : 1}
        showSizeChanger
        defaultPageSize={state.pageSize}
        onChange={onShowSizeChange}
        pageSizeOptions={pageSizeOptions}
        disabled={!getBeers.length}
      />
    </>
  );
};

export default BeersList;
