import axios from "axios";

const API = "/api/auth";

export const signUp = (data) => axios.post(`${API}/signup`, data);
export const signIn = (data) => axios.post(`${API}/signin`, data);
