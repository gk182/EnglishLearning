import axiosClient from "../../api/axiosClient.js";

const token = localStorage.getItem('token'); // hoặc nơi bạn lưu token
const config = {
  headers: {
    Authorization: `Bearer ${token}`,
  },
};

export const getAllLessons = () => axiosClient.get("/api/lesson").then(res => res.data);
export const getLessonById = (id) => axiosClient.get(`/api/lesson/${id}`).then(res => res.data);
export const createLesson = (data) => axiosClient.post("/api/lesson", data,config);
export const updateLesson = (id, data) => axiosClient.put(`/api/lesson/${id}`, data,config);
export const deleteLesson = (id) => axiosClient.delete(`/api/lesson/${id}`,config);