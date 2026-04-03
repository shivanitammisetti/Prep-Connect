import axiosInstance from "./axiosInstance";

export const getAllDoubts  = ()       => axiosInstance.get("/doubts");
export const createDoubt  = (data)   => axiosInstance.post("/doubts", data);
export const answerDoubt  = (id, data) => axiosInstance.post(`/doubts/${id}/answer`, data);
export const getDoubtById = (id)     => axiosInstance.get(`/doubts/${id}`);