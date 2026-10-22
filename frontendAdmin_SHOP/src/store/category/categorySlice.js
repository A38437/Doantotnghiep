import { createSlice, createAction } from "@reduxjs/toolkit";
import {
  handleGetAllCategory,
  handlegetDetailsCategory,
} from "./handleCategory";

//Reducer Là các hàm xử lý các action và cập nhật trạng thái của ứng dụng.
export const setLoading = createAction("setLoading");

// fullfiled | pending | rejected
const initialState = {
  dataAllCategory: [],
  dataDetailsCategory: {},
  loading: false,
};
const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    // setLoading: (state, action) => ({
    //   ...state,
    //   loading: action.payload,
    // }),
  },
  extraReducers: (builder) => {
    builder
      //get All Category
      .addCase(handleGetAllCategory.fulfilled, (state, action) => {
        state.dataAllCategory = action.payload;
      })
      .addCase(handleGetAllCategory.rejected, (state, action) => {
        state.dataAllCategory = [];
      })
      // details
      .addCase(handlegetDetailsCategory.fulfilled, (state, action) => {
        state.dataDetailsCategory = action.payload;
      })
      .addCase(handlegetDetailsCategory.rejected, (state, action) => {
        state.dataDetailsCategory = {};
      });
  },
});
// export const { setLoading } = categorySlice.actions;
export default categorySlice.reducer;
