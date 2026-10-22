import { createSlice, createAction } from "@reduxjs/toolkit";
import {
  handleFilterProduct,
  handleGetAllColor,
  handleGetAllProduct,
  handleGetAllSize,
  handleGetDetailsProduct,
} from "./handleProduct";

//Reducer Là các hàm xử lý các action và cập nhật trạng thái của ứng dụng.
export const setLoading = createAction("setLoading");

// fullfiled | pending | rejected
const initialState = {
  dataAllProduct: [],
  dataDetailsProduct: {},
  dataAllSize: [],
  dataAllColor: [],
  loading: false,
  loadingSearchProduct: false,
};
const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    // setLoading: (state, action) => ({
    //   ...state,
    //   loading: action.payload,
    // }),
  },
  extraReducers: (builder) => {
    builder
      //get all product
      .addCase(handleGetAllProduct.fulfilled, (state, action) => {
        state.dataAllProduct = action.payload;
        state.loadingSearchProduct = false;
      })
      .addCase(handleGetAllProduct.pending, (state, action) => {
        state.loadingSearchProduct = true;
      })
      .addCase(handleGetAllProduct.rejected, (state, action) => {
        state.dataAllProduct = [];
        state.loadingSearchProduct = false;
      })

      //data Details Product
      .addCase(handleGetDetailsProduct.fulfilled, (state, action) => {
        state.dataDetailsProduct = action.payload;
      })
      .addCase(handleGetDetailsProduct.rejected, (state, action) => {
        state.dataDetailsProduct = {};
      })

      //data get all size Product
      .addCase(handleGetAllSize.fulfilled, (state, action) => {
        state.dataAllSize = action.payload;
      })
      .addCase(handleGetAllSize.rejected, (state, action) => {
        state.dataAllSize = [];
      })
      //data get all color Product
      .addCase(handleGetAllColor.fulfilled, (state, action) => {
        state.dataAllColor = action.payload;
      })
      .addCase(handleGetAllColor.rejected, (state, action) => {
        state.dataAllColor = [];
      });
  },
});
// export const { setLoading } = productSlice.actions;
export default productSlice.reducer;
