import axios from "axios";

const token = localStorage.getItem('token'); // hoặc nơi bạn lưu token
const config = {
  headers: {
    Authorization: `Bearer ${token}`,
  },
};

export const getAllTopics = () => axios.get("/api/topic").then(res => res.data);
export const getTopicById = (id) => axios.get(`/api/topic/${id}`).then(res => res.data);
export const createTopic = (data) => axios.post("/api/topic", data,config);
export const updateTopic = (id, data) => axios.put(`/api/topic/${id}`, data,config);
export const deleteTopic = (id) => axios.delete(`/api/topic/${id}`,config);