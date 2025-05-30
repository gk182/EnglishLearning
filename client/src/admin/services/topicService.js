import axios from "axios";

export const getAllTopics = () => axios.get("/api/topic").then(res => res.data);
export const getTopicById = (id) => axios.get(`/api/topic/${id}`).then(res => res.data);
export const createTopic = (data) => axios.post("/api/topic", data);
export const updateTopic = (id, data) => axios.put(`/api/topic/${id}`, data);
export const deleteTopic = (id) => axios.delete(`/api/topic/${id}`);