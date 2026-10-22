import { createAsyncThunk } from "@reduxjs/toolkit";
import requestGetAllOrder, {
  requesCancelOrderPayment,
  requesUpdateStatuslOrderPayment,
  requestCancelOrder,
  requestCreateLinkPayment,
  requestGetDetailsOrder,
  requestGetOrderPayment,
  requestOrderProduct,
} from "./requestOrder";
import { toast } from "react-toastify";

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

export const handleGetDetailsOrder = createAsyncThunk(
  "order/handleGetDetailsOrder",
  async (data, thunkAPI) => {
    try {
      const response = await requestGetDetailsOrder(data);
      return response.data.results;
    } catch (error) {
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
        toast.success("Đơn hàng đã được hủy!", { autoClose: 800 });
        data?.callBack?.();
      }
    } catch (error) {
      console.log("🚀 ~ error:", error);
    }
  }
);

export const handleOrderProduct = createAsyncThunk(
  "order/handleOrderProduct",
  async (data, thunkAPI) => {
    try {
      const response = await requestOrderProduct(data);
      if (response.status === 200) {
        data?.callBack?.();
      }
    } catch (error) {
      toast.error(error?.response?.data?.ms, { autoClose: 800 });
      console.log("🚀 ~ error:", error);
    }
  }
);

// payment

export const handleCreateLinkPayment = createAsyncThunk(
  "order/handleCreateLinkPayment",
  async (data, thunkAPI) => {
    try {
      const response = await requestCreateLinkPayment(data);
      if (response.status === 200) {
        data?.callBack?.(
          response.data.results.checkoutUrl,
          response.data.results.orderCode
        );
      }
    } catch (error) {
      console.log("🚀 ~ error:", error);
    }
  }
);

export const handleGetOrderPayment = createAsyncThunk(
  "order/handleGetOrderPayment",
  async (id, thunkAPI) => {
    try {
      const response = await requestGetOrderPayment(id);
      return response.data.results;
    } catch (error) {
      console.log("🚀 ~ error:", error);
    }
  }
);

export const handleCancelOrderPayment = createAsyncThunk(
  "order/handleCancelOrderPayment",
  async (data, thunkAPI) => {
    try {
      const response = await requesCancelOrderPayment(data);
      if (response.status === 200) {
        data?.callBack?.();
      }
    } catch (error) {
      console.log("🚀 ~ error:", error);
    }
  }
);

export const handleUpdateStatuslOrderPayment = createAsyncThunk(
  "order/handleUpdateStatuslOrderPayment",
  async (id, thunkAPI) => {
    try {
      const response = await requesUpdateStatuslOrderPayment(id);
    } catch (error) {
      console.log("🚀 ~ error:", error);
    }
  }
);
