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
