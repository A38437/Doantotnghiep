import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  requestAddProduct,
  requestAddProductDetails,
  requestDeleteProductDetails,
  requestGetAllProduct,
  requestGetAllVariant,
  requestGetDetailsProduct,
  requestRestoreProduct,
  requestSoftDeleteProduct,
  requestUpdateProduct,
  requestUpdateQuantityProductDetails,
} from "./requestProduct";
import { toast } from "react-toastify";

export const handleGetAllProduct = createAsyncThunk(
  "product/handleGetAllProduct",
  async (data, thunkAPI) => {
    try {
      const response = await requestGetAllProduct(data);
      return response.data;
    } catch (error) {
      console.log("🚀 ~ error:", error);
    }
  }
);

export const handleGetDetailsProduct = createAsyncThunk(
  "product/handleGetDetailsProduct",
  async (id, thunkAPI) => {
    try {
      const response = await requestGetDetailsProduct(id);
      return response.data.results;
    } catch (error) {
      console.log("🚀 ~ error:", error);
    }
  }
);

export const handleGetAllSize = createAsyncThunk(
  "product/handleGetAllSize",
  async (data, thunkAPI) => {
    try {
      const response = await requestGetAllVariant(data);
      return response.data.results;
    } catch (error) {
      console.log("🚀 ~ error:", error);
    }
  }
);

export const handleGetAllColor = createAsyncThunk(
  "product/handleGetAllColor",
  async (data, thunkAPI) => {
    try {
      const response = await requestGetAllVariant(data);
      return response.data.results;
    } catch (error) {
      console.log("🚀 ~ error:", error);
    }
  }
);

export const handleAddProduct = createAsyncThunk(
  "product/handleAddProduct",
  async (data, thunkAPI) => {
    try {
      const response = await requestAddProduct(data);

      if (response.status === 200) {
        data?.callBack?.();
      }
    } catch (error) {
      toast.error(error?.response?.data?.ms, { autoClose: 800 });
    }
  }
);

export const handleAddProductDetails = createAsyncThunk(
  "product/handleAddProductDetails",
  async (data, thunkAPI) => {
    try {
      const response = await requestAddProductDetails(data);

      if (response.status === 200) {
        data?.callBack?.();
      }
    } catch (error) {
      toast.error(error?.response?.data?.ms, { autoClose: 800 });
    }
  }
);

export const handleDeleteProduct = createAsyncThunk(
  "product/handleDeleteProduct",
  async (data, thunkAPI) => {
    try {
      const response = await requestSoftDeleteProduct(data);

      if (response.status === 200) {
        data?.callBack?.();
      }
    } catch (error) {
      toast.error(error?.response?.data?.ms, { autoClose: 800 });
    }
  }
);

export const handleRestoreProduct = createAsyncThunk(
  "product/handleRestoreProduct",
  async (data, thunkAPI) => {
    try {
      const response = await requestRestoreProduct(data);

      if (response.status === 200) {
        data?.callBack?.();
      }
    } catch (error) {
      toast.error(error?.response?.data?.ms, { autoClose: 800 });
    }
  }
);

export const handleUpdateProduct = createAsyncThunk(
  "product/handleUpdateProduct",
  async (data, thunkAPI) => {
    try {
      const response = await requestUpdateProduct(data);

      if (response.status === 200) {
        data?.callBack?.();
      }
    } catch (error) {
      toast.error(error?.response?.data?.ms, { autoClose: 800 });
    }
  }
);

export const handleUpdateQuantityProductDetails = createAsyncThunk(
  "product/handleUpdateQuantityProductDetails",
  async (data, thunkAPI) => {
    try {
      const response = await requestUpdateQuantityProductDetails(data);

      if (response.status === 200) {
        data?.callBack?.();
      }
    } catch (error) {
      toast.error(error?.response?.data?.ms, { autoClose: 800 });
    }
  }
);

export const handleDeleteProductDetails = createAsyncThunk(
  "product/handleDeleteProductDetails",
  async (data, thunkAPI) => {
    try {
      const response = await requestDeleteProductDetails(data);

      if (response.status === 200) {
        data?.callBack?.();
      }
    } catch (error) {
      toast.error(error?.response?.data?.ms, { autoClose: 800 });
    }
  }
);
