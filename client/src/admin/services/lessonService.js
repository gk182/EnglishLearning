import axios from "axios";

export const getAllLessons = () => axios.get("/api/lesson").then(res => res.data);
export const getLessonById = (id) => axios.get(`/api/lesson/${id}`).then(res => res.data);
export const createLesson = (data) => axios.post("/api/lesson", data);
export const updateLesson = (id, data) => axios.put(`/api/lesson/${id}`, data);
export const deleteLesson = (id) => axios.delete(`/api/lesson/${id}`);