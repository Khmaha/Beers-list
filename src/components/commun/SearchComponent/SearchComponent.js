import useHooks from "../../../useHooks";
import { Input } from "antd";
import { useSelector } from "react-redux";
const { Search } = Input;

const SearchComponent = () => {
  const state = useSelector((state) => state);
  const searchWord = state.searchWord;
  const { searchBeer } = useHooks();

  const handleSearchBeer = (value) => {
    searchBeer(value);
  };
  return (
    <Search
      placeholder="Rechercher un bière"
      onSearch={handleSearchBeer}
      style={{ width: 200 }}
      defaultValue={searchWord}
      className="search-comp"
    />
  );
};

export default SearchComponent;
