import { createSlice, createAction } from "@reduxjs/toolkit";

import { toast } from "react-toastify";
import { handleGetCurrentUser, handleGetUser } from "./handleUser";
import { handleLogin, handleLogout } from "../auth/handleAuth";

//Reducer Là các hàm xử lý các action và cập nhật trạng thái của ứng dụng.
export const setLoading = createAction("setLoading");

// fullfiled | pending | rejected
const initialState = {
  dataUser: [],
  dataCurrentUser: {},
  loading: false,
  errorMessage: "",
};
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // setLoading: (state, action) => ({
    //   ...state,
    //   loading: action.payload,
    // }),
  },
  extraReducers: (builder) => {
    builder
      //case News
      .addCase(handleGetUser.fulfilled, (state, action) => {
        state.dataUser = action.payload;
        state.loading = false;
      })
      .addCase(handleGetUser.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(handleGetUser.rejected, (state, action) => {
        state.loading = false;
      })

      //curentUser
      .addCase(handleGetCurrentUser.fulfilled, (state, action) => {
        state.dataCurrentUser = action.payload;
      })
      .addCase(handleGetCurrentUser.rejected, (state, action) => {
        state.dataCurrentUser = null;
      })

      //login thành công cập nhật render ra UI
      .addCase(handleLogin.fulfilled, (state, action) => {
        state.dataCurrentUser = action.payload;
      })

      //logout
      .addCase(handleLogout.fulfilled, (state, action) => {
        state.dataCurrentUser = null;
      })
      .addCase(handleLogout.rejected, (state, action) => {
        state.dataCurrentUser = null;
      })

      .addCase(setLoading, (state, action) => {
        state.loading = action.payload;
      });
  },
});
// export const { setLoading } = userSlice.actions;
export default userSlice.reducer;
