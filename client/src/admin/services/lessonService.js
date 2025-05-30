import axios from "axios";

const token = localStorage.getItem('token'); // hoặc nơi bạn lưu token
const config = {
  headers: {
    Authorization: `Bearer ${token}`,
  },
};

export const getAllLessons = () => axios.get("/api/lesson").then(res => res.data);
export const getLessonById = (id) => axios.get(`/api/lesson/${id}`).then(res => res.data);
export const createLesson = (data) => axios.post("/api/lesson", data,config);
export const updateLesson = (id, data) => axios.put(`/api/lesson/${id}`, data,config);
export const deleteLesson = (id) => axios.delete(`/api/lesson/${id}`,config);