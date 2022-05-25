import useHooks from "../../../useHooks";
import { Input } from "antd";
const { Search } = Input;

const SearchComponent = () => {
  const { searchBeer } = useHooks();

  const handleSearchBeer = (value) => {
    searchBeer(value);
  };
  return (
    <Search
      placeholder="Rechercher un bière"
      onSearch={handleSearchBeer}
      style={{ width: 200 }}
      className="search-comp"
    />
  );
};

export default SearchComponent;
