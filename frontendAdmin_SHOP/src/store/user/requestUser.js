import axios from "axios";
import { axiosClient } from "../../app/axios/axiosClient";

export function requestOverview() {
  return axiosClient.get(`/overview`);
}

export function requestLogin(data) {
  return axiosClient.post(`/admin/login`, data);
}

export function requestlogout() {
  return axiosClient.post(`/logout`);
}

export function requestGetCurrentUser() {
  return axiosClient.get(`/currentUser`);
}

export default function requestGetUser(data) {
  const limit = data?.limit || 10;
  const page = data?.page || 1;
  const name = data?.name;

  const queryName = name ? `&name=${name}` : "";
  return axiosClient.get(`/user?limit=${limit}&page=${page}${queryName}`);
}

export function requestAddUser(data) {
  return axiosClient.post(`/user`, data);
}

export function requestUpdateUser(data) {
  return axiosClient.put(`/user`, data);
}

export function requestBanOrUnbanUser(data) {
  return axiosClient.put(`/ban-or-unBan-User/${data.id}`);
}

export function requestDeleteUser(data) {
  return axiosClient.delete(`/user/${data.id}`);
}

export function requestUpdateInfoUser(data) {
  return axiosClient.put(`/user`, data);
}
