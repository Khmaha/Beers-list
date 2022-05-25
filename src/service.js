import axios from "axios";
const URL = "https://api.punkapi.com/v2";
const Service = axios.create({
  baseURL: URL,
});

export default Service;
