import { createAsyncThunk } from "@reduxjs/toolkit";
import requestAddToCart, {
  requestDeleteCart,
  requestUpdateCart,
  requestgetAllCart,
} from "./requestCart";
import { toast } from "react-toastify";

export const handleAddtoCart = createAsyncThunk(
  "product/handleAddtoCart",
  async (data, thunkAPI) => {
    try {
      const response = await requestAddToCart(data);

      if (response.status === 200) {
        toast.success("Đã Thêm Vào Giỏ Hàng", { autoClose: 800 });
        data.callBack && data.callBack();
        thunkAPI.dispatch(handleGetAllCart());
      }
      return response.data;
    } catch (error) {
      toast.error("Số lượng trong kho không đủ !", { autoClose: 800 });

      console.log("🚀 ~ error:", error);
    }
  }
);

export const handleGetAllCart = createAsyncThunk(
  "product/handleGetAllCart",
  async (data, thunkAPI) => {
    try {
      const response = await requestgetAllCart(data);
      return response.data;
    } catch (error) {
      console.log("🚀 ~ error:", error);
    }
  }
);

//hiện chưa dùng handleUpdateCart
export const handleUpdateCart = createAsyncThunk(
  "product/handleUpdateCart",
  async (data, thunkAPI) => {
    try {
      const response = await requestUpdateCart(data);
    } catch (error) {
      thunkAPI.dispatch(handleGetAllCart());
      toast.error(error?.response?.data?.ms, { autoClose: 800 });
    }
  }
);

export const handleDeleteCart = createAsyncThunk(
  "product/handleDeleteCart",
  async (id, thunkAPI) => {
    try {
      const response = await requestDeleteCart(id);

      if (response.status === 200) {
        thunkAPI.dispatch(handleGetAllCart()); // gọi ra để cập nhật trên UI
      }
    } catch (error) {
      console.log("🚀 ~ error:", error);
    }
  }
);
