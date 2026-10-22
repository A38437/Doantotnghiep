import { createAsyncThunk } from "@reduxjs/toolkit";
import requestGetAllCategory, {
  requestAddCategory,
  requestDeleteCategory,
  requestGetDetailsCategory,
  requestUpdateCategory,
} from "./requestCategory";
import { toast } from "react-toastify";

export const handleGetAllCategory = createAsyncThunk(
  "category/handleGetAllCategory",
  async (data, thunkAPI) => {
    try {
      const response = await requestGetAllCategory(data);
      return response.data;
    } catch (error) {
      console.log("🚀 ~ error:", error);
    }
  }
);

export const handlegetDetailsCategory = createAsyncThunk(
  "category/handlegetDetailsCategory",
  async (id, thunkAPI) => {
    try {
      const response = await requestGetDetailsCategory(id);
      if (response.status === 200) {
        return response.data.results;
      }
    } catch (error) {
      toast.error(error?.response?.data?.ms, { autoClose: 800 });
      console.log("🚀 ~ error:", error);
    }
  }
);

export const handleAddCategory = createAsyncThunk(
  "category/handleAddCategory",
  async (data, thunkAPI) => {
    try {
      const response = await requestAddCategory(data);
      if (response.status === 200) {
        data?.callBack?.();
      }
    } catch (error) {
      toast.error(error?.response?.data?.ms, { autoClose: 800 });
      console.log("🚀 ~ error:", error);
    }
  }
);

export const handleUpdateCategory = createAsyncThunk(
  "category/handleUpdateCategory",
  async (data, thunkAPI) => {
    try {
      const response = await requestUpdateCategory(data);
      if (response.status === 200) {
        data?.callBack?.();
      }
    } catch (error) {
      toast.error(error?.response?.data?.ms, { autoClose: 800 });
      console.log("🚀 ~ error:", error);
    }
  }
);

export const handleDeleteCategory = createAsyncThunk(
  "category/handleDeleteCategory",
  async (data, thunkAPI) => {
    try {
      const response = await requestDeleteCategory(data);
      if (response.status === 200) {
        data?.callBack?.();
        thunkAPI.dispatch(handleGetAllCategory());
      }
    } catch (error) {
      toast.error(error?.response?.data?.ms, { autoClose: 800 });
      console.log("🚀 ~ error:", error);
    }
  }
);
