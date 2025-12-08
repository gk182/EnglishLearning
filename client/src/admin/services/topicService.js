import axiosClient from "../api/axiosClient";

const token = localStorage.getItem('token'); // hoặc nơi bạn lưu token
const config = {
  headers: {
    Authorization: `Bearer ${token}`,
  },
};

export const getAllTopics = () => axiosClient.get("/api/topic").then(res => res.data);
export const getTopicById = (id) => axiosClient.get(`/api/topic/${id}`).then(res => res.data);
export const createTopic = (data) => axiosClient.post("/api/topic", data,config);
export const updateTopic = (id, data) => axiosClient.put(`/api/topic/${id}`, data,config);
export const deleteTopic = (id) => axiosClient.delete(`/api/topic/${id}`,config);