import { createAsyncThunk } from "@reduxjs/toolkit";

import { toast } from "react-toastify";
import requestGetAllOrder, {
  requestBackStatusOrder,
  requestCancelOrder,
  requestDeleteOrder,
  requestUpdateStatusOrder,
} from "./requestOrder";

export const handleGetAllOrder = createAsyncThunk(
  "order/handleGetAllOrder",
  async (data, thunkAPI) => {
    try {
      const response = await requestGetAllOrder(data);
      return response.data;
    } catch (error) {
      console.log("🚀 ~ error:", error);
    }
  }
);

export const handleUpdateStatusOrder = createAsyncThunk(
  "order/handleUpdateStatusOrder",
  async (data, thunkAPI) => {
    try {
      const response = await requestUpdateStatusOrder(data);
      if (response.status === 200) {
        data?.callBack?.();
      }
    } catch (error) {
      toast.error(error?.response?.data?.ms, { autoClose: 800 });
      console.log("🚀 ~ error:", error);
    }
  }
);

export const handleBackStatusOrder = createAsyncThunk(
  "order/handleBackStatusOrder",
  async (data, thunkAPI) => {
    try {
      const response = await requestBackStatusOrder(data);
      if (response.status === 200) {
        data?.callBack?.();
      }
    } catch (error) {
      toast.error(error?.response?.data?.ms, { autoClose: 800 });
      console.log("🚀 ~ error:", error);
    }
  }
);

export const handleCancelOrder = createAsyncThunk(
  "order/handleCancelOrder",
  async (data, thunkAPI) => {
    try {
      const response = await requestCancelOrder(data);
      if (response.status === 200) {
        data?.callBack?.();
      }
    } catch (error) {
      toast.error(error?.response?.data?.ms, { autoClose: 800 });
      console.log("🚀 ~ error:", error);
    }
  }
);

export const handleDeleteOrder = createAsyncThunk(
  "order/handleDeleteOrder",
  async (data, thunkAPI) => {
    try {
      const response = await requestDeleteOrder(data);
      if (response.status === 200) {
        data?.callBack?.();
      }
    } catch (error) {
      console.log("🚀 ~ error:", error);
    }
  }
);
