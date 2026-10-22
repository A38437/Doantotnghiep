import { createAsyncThunk } from "@reduxjs/toolkit";
import requestGetUser, {
  requestAddAddressUser,
  requestGetCurrentUser,
  requestUpdateInfoUser,
} from "./requestUser";
import { OK } from "../../utils/httpStatus";
import { toast } from "react-toastify";

export const handleGetUser = createAsyncThunk(
  "user/handleGetUser",
  async (query, thunkAPI) => {
    const response = await requestGetUser();
    return response.data;
  }
);

export const handleGetCurrentUser = createAsyncThunk(
  "user/handleGetCurrentUser",
  async (data, thunkAPI) => {
    try {
      const response = await requestGetCurrentUser();

      if (response.status === OK) {
        return response.data.results;
      }
    } catch (error) {
      // toast.error("Bạn Cần Đăng Nhập", { autoClose: 800 });
      console.log("🚀 ~ error:", error);
    }
  }
);

export const handleAddAddressUser = createAsyncThunk(
  "user/handleAddAddressUser",
  async (data, thunkAPI) => {
    try {
      const response = await requestAddAddressUser(data);

      if (response.status === OK) {
        data?.callBack?.();
        thunkAPI.dispatch(handleGetCurrentUser());
      }
    } catch (error) {
      console.log("🚀 ~ error:", error);
    }
  }
);

export const handleUpdateInfoUser = createAsyncThunk(
  "user/handleUpdateInfoUser",
  async (data, thunkAPI) => {
    try {
      const response = await requestUpdateInfoUser(data);

      if (response.status === OK) {
        toast.success("Cập nhật thành công", { autoClose: 800 });
        thunkAPI.dispatch(handleGetCurrentUser());
      }
    } catch (error) {
      toast.error(error?.response?.data?.ms, { autoClose: 800 });
      console.log("🚀 ~ error:", error);
    }
  }
);
