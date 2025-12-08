import axiosClient from "../api/axiosClient";
const API = "/api/auth";

export const signUp = (data) => axiosClient.post(`${API}/signup`, data);
export const signIn = (data) => axiosClient.post(`${API}/signin`, data);
