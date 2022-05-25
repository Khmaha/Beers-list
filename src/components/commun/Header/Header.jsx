import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./Header.scss";
import { Badge } from "antd";

import SearchComponent from "../SearchComponent/SearchComponent";
import { useSelector } from "react-redux";
const Header = () => {
  const state = useSelector((state) => state);
  const cardBeerList = state.cardBeerList;
  const navigate = useNavigate();
  let location = useLocation();
  return (
    <div className="header">
      <div className="header__left">
        {location.pathname === "/" ? (
          <SearchComponent></SearchComponent>
        ) : (
          <span
            className="icon-arrow-left"
            onClick={() => navigate("/")}
          ></span>
        )}
      </div>
      <div className="header__right">
        <Badge count={cardBeerList && state.cardBeerList.length}>
          <span className="icon-card" onClick={() => navigate("/cart")}></span>
        </Badge>
      </div>
    </div>
  );
};

export default Header;
