import { axiosClient } from "../../app/axios/axiosClient";

export default function requestGetAllNews(data) {
  const limit = data?.limit || 12;
  const page = data?.page || 1;
  return axiosClient.get(`/news?limit=${limit}&page=${page}`);
}

export function requestGetDetailsNews(id) {
  return axiosClient.get(`/news/${id}`);
}

export function requestGetCommentNews(data) {
  const limit = data?.limit || 12;
  const page = data?.page || 1;
  return axiosClient.get(`/newsComment/${data.id}?limit=${limit}&page=${page}`);
}

export function requestAddCommentNews(data) {
  return axiosClient.post(`/newsComment`, data);
}
