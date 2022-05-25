export const getAllBeers = ({ payload }) => {
  return {
    type: "GET_ALL_BEERS",
    payload,
  };
};
export const getBeerDetail = ({ payload }) => {
  return {
    type: "GET_BEER_DETAIL",
    payload,
  };
};

export const setPageSize = ({ payload }) => {
  return {
    type: "SET_PAGE_SIZE",
    payload,
  };
};
export const setLoading = ({ payload }) => {
  return {
    type: "SET_LOADING",
    payload,
  };
};

export const addToCardBeerList = ({ payload }) => {
  return {
    type: "ADD_TO_CARD_BEER_LIST",
    payload,
  };
};

export const deleteBeerFromPannier = ({ payload }) => {
  return {
    type: "DELETE_BEER_FROM_PANNIER",
    payload,
  };
};

export const searchBeerList = ({ payload }) => {
  return {
    type: "SEARCH_BEER_LIST",
    payload,
  };
};
