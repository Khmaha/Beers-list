import { useState, useEffect } from "react";
import Service from "./service";
import { useSelector, useDispatch } from "react-redux";
import {
  getAllBeers,
  getBeerDetail,
  setLoading,
  searchBeerList,
} from "./store/actions";
const useHooks = () => {
  const state = useSelector((state) => state);
  const cardBeerList = state.cardBeerList;
  const dispatch = useDispatch();
  const [loading, setLoadingSpin] = useState(true);

  /** get all beers **/
  useEffect(() => {
    setTimeout(() => {
      setLoadingSpin(false);
    }, 3000);
  }, [loading]);
  const getAllBeersCallApi = async ({ page, pageSize }) => {
    // dispatch(setLoading({ payload: true }));
    await new Promise(async (resolve, reject) => {
      return Service.get(`/beers?page=${page}&per_page=${pageSize}`)
        .then((response) => {
          if (response?.status === 200) {
            resolve(response);
            dispatch(getAllBeers({ payload: response.data }));
            dispatch(setLoading({ payload: false }));
          }
        })
        .catch((error) => {
          console.log("error", error);
          reject(error);
        });
    });
  };
  /** get beer by id **/

  const getBeersByIdCallApi = async (id) => {
    dispatch(setLoading({ payload: true }));
    await new Promise(async (resolve, reject) => {
      return Service.get(`/beers/${id}`)
        .then((response) => {
          if (response?.status === 200) {
            resolve(response);
            dispatch(getBeerDetail({ payload: response.data[0] }));
            dispatch(setLoading({ payload: false }));
          }
        })
        .catch((error) => {
          console.log("erreor", error);
          reject(error);
        });
    });
  };
  const searchBeer = (search) => {
    dispatch(searchBeerList({ payload: search }));
  };

  return {
    getAllBeersCallApi,
    getBeersByIdCallApi,
    loading,
    cardBeerList,
    searchBeer,
  };
};

export default useHooks;
