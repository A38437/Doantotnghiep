import { axiosClient } from "../../app/axios/axiosClient";
import { LIMIT_HIGH } from "../../utils/commom";

export default function requestGetAllCategory(data) {
  const limit = data?.limit || LIMIT_HIGH;
  const page = data?.page || 1;
  const name = data?.name || "";
  return axiosClient.get(
    `/categories?limit=${limit}&page=${page}&name=${name}`
  );
}

export function requestGetDetailsCategory(id) {
  return axiosClient.get(`/categories/${id}`);
}

export function requestAddCategory(data) {
  return axiosClient.post(`/categories`, data);
}

export function requestUpdateCategory(data) {
  return axiosClient.put(
    `/categories/${data.id}?parentId=${data.parentId || ""}`,
    data
  );
}

export function requestDeleteCategory(data) {
  return axiosClient.delete(`/categories/${data.id}`);
}
