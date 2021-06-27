import axios from "axios";

const api = {
  baseURL: "http://localhost:5000/api",
  headers: {
    "Content-Type": "application/json; charset=utf-8",
    Accept: "application/json",
  },
};

export default axios.create(api);
