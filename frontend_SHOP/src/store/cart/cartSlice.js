import { createSlice, createAction } from "@reduxjs/toolkit";
import {
  handleAddtoCart,
  handleGetAllCart,
  handleUpdateCart,
} from "./handleCart";

//Reducer Là các hàm xử lý các action và cập nhật trạng thái của ứng dụng.
export const setLoading = createAction("setLoading");

// fullfiled | pending | rejected
const initialState = {
  dataCartAll: [],
  loading: false,
};
const cartSlice = createSlice({
  name: "cart",
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
      .addCase(handleGetAllCart.fulfilled, (state, action) => {
        state.dataCartAll = action.payload;
      })
      .addCase(handleGetAllCart.rejected, (state, action) => {
        state.dataCartAll = [];
      })
      //add to Cart
      .addCase(handleAddtoCart.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(handleAddtoCart.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(handleAddtoCart.rejected, (state, action) => {
        state.loading = false;
      })

      .addCase(setLoading, (state, action) => {
        state.loading = action.payload;
      });
  },
});
// export const { setLoading } = cartSlice.actions;
export default cartSlice.reducer;
