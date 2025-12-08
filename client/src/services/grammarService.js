import axiosClient from "../api/axiosClient";

const API = "/api/grammar/";
export const checkGrammar = (text) => {
  return axiosClient.post(API, { text });
};

