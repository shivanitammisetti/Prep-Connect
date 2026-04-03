import axiosInstance from "./axiosInstance";

export const getAllVideos  = ()     => axiosInstance.get("/videos");
export const uploadVideo  = (data) => axiosInstance.post("/videos/upload", data);
export const getVideoById = (id)   => axiosInstance.get(`/videos/${id}`);
export const addComment   = (id, data) => axiosInstance.post(`/videos/${id}/comment`, data);