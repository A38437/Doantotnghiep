import axios from "axios";
import { axiosClient } from "../../app/axios/axiosClient";

export default function requestGetUser() {
  return axiosClient.get(`/users`);
}

export function requestGetCurrentUser() {
  return axiosClient.get(`/currentUser`);
}

export function requestAddAddressUser(data) {
  return axiosClient.post(`/address`, data);
}

export function requestUpdateInfoUser(data) {
  return axiosClient.put(`/user`, data);
}
