import { createAsyncThunk } from "@reduxjs/toolkit";
import requestRegister, {
  requestLogin,
  requestRefreshToken,
  requestResetPass,
  requestSendMail,
  requestlogout,
} from "./requestAuth";
import { OK } from "../../utils/httpStatus";
import { toast } from "react-toastify";
import { removeToken, saveToken } from "../../utils/localStorage";

export const handleRegister = createAsyncThunk(
  "auth/handleRegister",
  async (data, thunkAPI) => {
    try {
      const response = await requestRegister(data);

      if (response.status === OK) {
        toast.success("Đăng kí thành công", { autoClose: 1000 });
        data.callback?.();
        return response.data;
      }
    } catch (error) {
      console.log("🚀 ~ error:", error);
    }
  }
);

export const handleLogin = createAsyncThunk(
  "auth/handleLogin",
  async (data, thunkAPI) => {
    try {
      const response = await requestLogin(data);

      if (response.status === OK) {
        toast.success("Đăng nhập thành công", { autoClose: 1000 });
        saveToken(response.data.token.accessToken);
        data.callback?.();
        return response.data.results;
      }
    } catch (error) {
      toast.error(error.response.data.ms, { autoClose: 900 });
    }
  }
);

export const handleSendMail = createAsyncThunk(
  "auth/handleSendMail",
  async (data, thunkAPI) => {
    try {
      const response = await requestSendMail(data);

      if (response.status === OK) {
        toast.success("Kiểm tra email của bạn !", { autoClose: 900 });
        data.callback?.();
        return response.data;
      }
    } catch (error) {
      toast.error(error.response.data.ms, { autoClose: 900 });
    }
  }
);

export const handleResetPass = createAsyncThunk(
  "auth/handleResetPass",
  async (data, thunkAPI) => {
    try {
      const response = await requestResetPass(data);

      if (response.status === OK) {
        toast.success("Thay đổi thành công !", { autoClose: 900 });
        data.callback?.();
        return response.data;
      }
    } catch (error) {
      toast.error(error.response.data.ms, { autoClose: 900 });
    }
  }
);

export const handleRefreshToken = createAsyncThunk(
  "auth/handleRefreshToken",
  async (data, thunkAPI) => {
    try {
      const response = await requestRefreshToken();

      if (response.status === OK) {
        saveToken(response.data.accessToken);
        return response.data;
      }
    } catch (error) {
      toast.error(error.response.data.ms, { autoClose: 900 });
    }
  }
);

export const handleLogout = createAsyncThunk(
  "auth/handleLogout",
  async (data, thunkAPI) => {
    try {
      const response = await requestlogout();

      if (response.status === OK) {
        removeToken();
        data.callback?.();
        return response.data;
      }
    } catch (error) {
      thunkAPI.rejectWithValue({});
      toast.error(error.response.data.ms, { autoClose: 900 });
    }
  }
);
