import { axiosClient } from "../../app/axios/axiosClient";
import { LIMIT_HIGH } from "../../utils/commom";

export default function requestAddToCart(data) {
  const { callBack, ...rest } = data;
  return axiosClient.post(`/cart`, rest);
}

export function requestgetAllCart(data) {
  const limit = data?.limit || LIMIT_HIGH;
  const page = data?.page || 1;
  return axiosClient.get(`/cart?limit=${limit}&page=${page}`);
}

export function requestUpdateCart(data) {
  return axiosClient.put(`/cart`, data);
}

export function requestDeleteCart(id) {
  return axiosClient.delete(`/cart/${id}`);
}
