const initialState = {
  allBeers: [],
  loading: true,
  beerDetail: {},
  cardBeerList: [],
  filtredBeers: [],
  searchWord: "",
  countBeers: 0,
  pageSize: 10,
};
const reducer = (state = { ...initialState }, action) => {
  const newState = { ...state };

  switch (action.type) {
    case "GET_ALL_BEERS":
      newState.allBeers = action.payload;
      return newState;

    case "SET_PAGE_SIZE":
      newState.pageSize = action.payload;
      return newState;

    case "GET_BEER_DETAIL":
      newState.beerDetail = action.payload;
      return newState;

    case "SET_LOADING":
      newState.loading = action.payload;
      return newState;

    case "ADD_TO_CARD_BEER_LIST":
      if (!newState.cardBeerList && !newState.countBeers) {
        newState.cardBeerList = [];
        newState.countBeers = 0;
      }
      newState.cardBeerList.push(action.payload);
      newState.countBeers++;
      return newState;

    case "DELETE_BEER_FROM_PANNIER":
      let findIndex = newState.cardBeerList.findIndex(
        (x) => x.id === action.payload
      );
      console.log("findIndex", findIndex);
      if (findIndex >= 0) {
        newState.countBeers--;
        newState.cardBeerList.splice(findIndex, 1);
      }
      return newState;

    case "SEARCH_BEER_LIST":
      newState.searchWord = action.payload;
      newState.filtredBeers = newState.allBeers.filter((beer) =>
        beer.name.toLowerCase().includes(action.payload.toLowerCase())
      );

      return newState;

    default:
      return newState;
  }
};

export default reducer;
