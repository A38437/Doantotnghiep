import { axiosClient } from "../../app/axios/axiosClient";
import { LIMIT_HIGH } from "../../utils/commom";

export default function requestGetAllOrder(data) {
  const limit = data?.limit || LIMIT_HIGH;
  const page = data?.page || 1;
  const orderId = data?.orderId || "";
  const statusOrder = data?.statusOrder || "";
  return axiosClient.get(
    `/order?limit=${limit}&page=${page}&statusOrder=${statusOrder}&orderId=${orderId}`
  );
}

export function requestUpdateStatusOrder(data) {
  return axiosClient.put(`/order/${data.id}`);
}

export function requestBackStatusOrder(data) {
  return axiosClient.put(`/order/backStatus/${data.id}`);
}

export function requestCancelOrder(data) {
  return axiosClient.put(`/cancelOrder/${data.id}`);
}

export function requestDeleteOrder(data) {
  return axiosClient.delete(`/order/${data.id}`);
}
