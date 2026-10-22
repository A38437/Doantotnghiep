import { axiosClient } from "../../app/axios/axiosClient";
import { LIMIT_HIGH } from "../../utils/commom";

export function requestGetAllProduct(data) {
  const limit = data?.limit || 10;
  const page = data?.page || 1;
  const name = data?.name;
  const category = data?.category;

  const queryName = name ? `&name=${name}` : "";
  return axiosClient.get(
    `/product?limit=${limit}&page=${page}${queryName}&category=${category}`
  );
}

export function requestGetDetailsProduct(id) {
  return axiosClient.get(`/product/${id}`);
}

export function requestGetAllVariant(data) {
  const type = data.type;
  return axiosClient.get(`/product/variant?type=${type}`);
}

export function requestAddProduct(data) {
  return axiosClient.post(`/product`, data);
}

export function requestSoftDeleteProduct(data) {
  return axiosClient.delete(`/product/${data.id}`);
}

export function requestRestoreProduct(data) {
  return axiosClient.put(`/product/restore/${data.id}`);
}

export function requestAddProductDetails(data) {
  return axiosClient.post(`/productDetails`, data);
}

export function requestUpdateProduct(data) {
  return axiosClient.put(`/product/${data.id}`, data);
}

export function requestUpdateQuantityProductDetails(data) {
  return axiosClient.put(`/product/variantProduct/${data.id}`, data);
}

export function requestDeleteProductDetails(data) {
  return axiosClient.delete(`/product/variantProduct/${data.id}`);
}
