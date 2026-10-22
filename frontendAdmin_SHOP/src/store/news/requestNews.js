import { axiosClient } from "../../app/axios/axiosClient";

export default function requestGetAllNews(data) {
  const limit = data?.limit || 12;
  const page = data?.page || 1;
  const title = data?.title;
  const queryString = title ? `&title=${title}` : "";
  return axiosClient.get(`/news?limit=${limit}&page=${page}${queryString}`);
}

export function requestGetDetailsNews(id) {
  return axiosClient.get(`/news/${id}`);
}

export function requestAddNews(data) {
  return axiosClient.post(`/news`, data);
}

export function requestUpdateNews(data) {
  return axiosClient.put(`/news/${data.id}`, data);
}

export function requestDeleteNews(data) {
  return axiosClient.delete(`/news/${data.id}`);
}

export function requestGetCommentNews(data) {
  const limit = data?.limit || 12;
  const page = data?.page || 1;
  return axiosClient.get(`/newsComment/${data.id}?limit=${limit}&page=${page}`);
}

export function requestAddCommentNews(data) {
  return axiosClient.post(`/newsComment`, data);
}
