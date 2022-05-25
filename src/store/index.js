import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import reducer from "./reducer";
import { loadState, saveState } from "../localStorage";
const persistedState = loadState();
const store = createStore(reducer, persistedState, applyMiddleware(thunk));
store.subscribe(() => {
  saveState({
    cardBeerList: store.getState().cardBeerList,
    countBeers: store.getState().countBeers,
    allBeers: store.getState().allBeers,
  });
});

export default store;
