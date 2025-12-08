// services/topic.js
import axiosClient from "../api/axiosClient";

const API = "/api/topic";

export const getAllTopics = async () => {
  try {
    const response = await axiosClient.get(API);
    return response.data;
  } catch (error) {
    console.error("Error fetching topics from", API, ":", error);
    throw error;
  }
};
export const getTopicById = async (id) => {
  try {
    const response = await axiosClient.get(`${API}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching topic with id ${id}:`, error);
    throw error;
  }
};
