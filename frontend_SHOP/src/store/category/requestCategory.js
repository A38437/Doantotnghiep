import { axiosClient } from "../../app/axios/axiosClient";
import { LIMIT_HIGH } from "../../utils/commom";

export default function requestGetAllCategory(data) {
  const limit = data?.limit || LIMIT_HIGH;
  const page = data?.page || 1;
  return axiosClient.get(`/categories?limit=${limit}&page=${page}`);
}
