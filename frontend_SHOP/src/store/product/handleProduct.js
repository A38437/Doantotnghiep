import { createAsyncThunk } from "@reduxjs/toolkit";
import requestGetTopSoldProduct, {
  requestFilterProduct,
  requestGetAllProduct,
  requestGetAllSize,
  requestGetDetailsProduct,
  requestGetNewArrivals,
  requestGetQuantityProduct,
  requestReviewProduct,
  requestSuggestProduct,
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

export const handleGetTopSoldProduct = createAsyncThunk(
  "product/handleGetTopSoldProduct",
  async (data, thunkAPI) => {
    try {
      const response = await requestGetTopSoldProduct(data);
      return response.data;
    } catch (error) {
      console.log("🚀 ~ error:", error);
    }
  }
);

export const handleGetTopDiscountProduct = createAsyncThunk(
  "product/handleGetTopDiscountProduct",
  async (data, thunkAPI) => {
    try {
      const response = await requestGetAllProduct(data);
      return response.data;
    } catch (error) {
      console.log("🚀 ~ error:", error);
    }
  }
);

export const handleGetNewArrivals = createAsyncThunk(
  "product/handleGetNewArrivals",
  async (data, thunkAPI) => {
    try {
      const response = await requestGetNewArrivals(data);
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

export const handleGetQuantityProduct = createAsyncThunk(
  "product/handleGetQuantityProduct",
  async (data, thunkAPI) => {
    try {
      const response = await requestGetQuantityProduct(data);
      return response.data.results;
    } catch (error) {
      console.log("🚀 ~ error:", error);
    }
  }
);

export const handleSuggestProduct = createAsyncThunk(
  "product/handleSuggestProduct",
  async (id, thunkAPI) => {
    try {
      const response = await requestSuggestProduct(id);
      return response.data.results;
    } catch (error) {
      console.log("🚀 ~ error:", error);
    }
  }
);

export const handleFilterProduct = createAsyncThunk(
  "product/handleFilterProduct",
  async (data, thunkAPI) => {
    try {
      const response = await requestFilterProduct(data);
      return response.data;
    } catch (error) {
      console.log("🚀 ~ error:", error);
    }
  }
);

export const handleReviewProduct = createAsyncThunk(
  "product/handleReviewProduct",
  async (data, thunkAPI) => {
    try {
      const response = await requestReviewProduct(data);
      if (response.status === 200) {
        data?.callBack?.();
      }
    } catch (error) {
      toast.error(error?.response?.data?.ms, { autoClose: 800 });
      console.log("🚀 ~ error:", error);
    }
  }
);

export const handleGetAllSize = createAsyncThunk(
  "product/handleGetAllSize",
  async (data, thunkAPI) => {
    try {
      const response = await requestGetAllSize();
      return response.data.results;
    } catch (error) {
      console.log("🚀 ~ error:", error);
    }
  }
);
