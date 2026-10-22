import { axiosClient } from "../../app/axios/axiosClient";
import { LIMIT_HIGH } from "../../utils/commom";

export function requestGetAllProduct(data) {
  const limit = data?.limit || 10;
  const page = data?.page || 1;
  const name = data?.name;
  const category = data?.category;
  const topDisCount = data?.topDisCount;

  return axiosClient.get(
    `/product?limit=${limit}&page=${page}&name=${name}&category=${category}&topDisCount=${topDisCount}`
  );
}

export default function requestGetTopSoldProduct(data) {
  const limit = data?.limit || 8;
  const page = data?.page || 1;
  return axiosClient.get(`/product?topSold=desc&limit=${limit}&page=${page}`);
}

export function requestGetNewArrivals(data) {
  const limit = data?.limit || 4;
  const page = data?.page || 1;
  return axiosClient.get(`/product?limit=${limit}&page=${page}`);
}

export function requestGetDetailsProduct(id) {
  return axiosClient.get(`/product/${id}`);
}

export function requestGetQuantityProduct(data) {
  const { id, ...rest } = data;

  return axiosClient.post(`/product/getQuantity/${data.id}`, rest);
}

export function requestSuggestProduct(id) {
  return axiosClient.get(`/suggestProduct/${id}`);
}

export function requestFilterProduct(data) {
  const queryPage = data.page ? `&page=${data.page} ` : "";
  const queryCategory = data.category ? `&category=${data.category} ` : "";
  const queryMinPrice = data.minPrice ? `&minPrice=${data.minPrice} ` : "";
  const queryMaxPrice = data.maxPrice ? `&maxPrice=${data.maxPrice} ` : "";
  const queryRate = data.rate ? `&rate=${data.rate} ` : "";
  const querySizes = data.sizes ? `&sizes=${data.sizes} ` : "";

  const queryString = `?limit=${
    data.limit || 12
  }${queryCategory}${queryMinPrice}${queryMaxPrice}${queryRate}${querySizes}${queryPage}`;

  return axiosClient.get(`/productFilter${queryString}`);
}

export function requestReviewProduct(data) {
  return axiosClient.post(`/productReviews/${data.idOrder}`, data);
}

export function requestGetAllSize(data) {
  return axiosClient.get(`/product/variant?type=size`);
}
