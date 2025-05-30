// services/topic.js
import axios from "axios";

const API = "/api/topic";

export const getAllTopics = async () => {
  try {
    const response = await axios.get(API);
    return response.data;
  } catch (error) {
    console.error("Error fetching topics from", API, ":", error);
    throw error;
  }
};
export const getTopicById = async (id) => {
  try {
    const response = await axios.get(`${API}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching topic with id ${id}:`, error);
    throw error;
  }
};
