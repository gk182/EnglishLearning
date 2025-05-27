import axios from "axios";

const API = "/api/grammar/";
export const checkGrammar = (text) => {
  return axios.post(API, { text });
};

