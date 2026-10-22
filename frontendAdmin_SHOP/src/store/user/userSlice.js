import { createSlice, createAction } from "@reduxjs/toolkit";

import { toast } from "react-toastify";
import {
  handleGetCurrentUser,
  handleGetOverview,
  handleGetUser,
  handleLoginAdmin,
  handleLogout,
} from "./handleUser";

//Reducer Là các hàm xử lý các action và cập nhật trạng thái của ứng dụng.
export const setLoading = createAction("setLoading");

// fullfiled | pending | rejected
const initialState = {
  dataUser: [],
  dataCurrentUser: {},
  dataOverview: {},
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
      })
      .addCase(handleGetUser.rejected, (state, action) => {
        state.dataUser = [];
      })

      //login
      .addCase(handleLoginAdmin.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(handleLoginAdmin.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(handleLoginAdmin.rejected, (state, action) => {
        state.loading = false;
      })

      //curentUser
      .addCase(handleGetCurrentUser.fulfilled, (state, action) => {
        state.dataCurrentUser = action.payload;
      })
      .addCase(handleGetCurrentUser.rejected, (state, action) => {
        state.dataCurrentUser = null;
      })

      //overview
      .addCase(handleGetOverview.fulfilled, (state, action) => {
        state.dataOverview = action.payload;
      })
      .addCase(handleGetOverview.rejected, (state, action) => {
        state.dataOverview = null;
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
