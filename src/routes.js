import BeersList from "./components/BeersList/BeersList.jsx";
import BeersDetail from "./components/BeersDetail/BeersDetail";
import BeersCart from "./components/BeersCart/BeersCart";

import { Routes, Route } from "react-router-dom";
const GetRoutes = () => (
  <Routes>
    <Route exact path={"/"} element={<BeersList />} />
    <Route exact path={"/detail/:id"} element={<BeersDetail />} />
    <Route exact path={"/cart"} element={<BeersCart />} />
  </Routes>
);
export default GetRoutes;
