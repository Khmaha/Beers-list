import React, { useEffect, Suspense } from "react";
import "./BeersList.scss";
import { useSelector, useDispatch, useStore } from "react-redux";
import { Spin, Pagination } from "antd";
import CardList from "../CardList/CardList.jsx";
import useHooks from "../../useHooks";
const BeersList = () => {
  const state = useSelector((state) => state);
  const { getAllBeersCallApi } = useHooks();

  useEffect(() => {
    getAllBeersCallApi({ page: 1, pageSize: 10 });
  }, []);

  return (
    <div className="beers-list">
      <Suspense fallback={<Spin />}>
        {state && !state.loading && <CardList type="beers"></CardList>}
      </Suspense>
    </div>
  );
};

export default BeersList;
