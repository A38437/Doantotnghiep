import { createSlice, createAction } from "@reduxjs/toolkit";
import { handleGetAllOrder } from "./handleOrder";
//Reducer Là các hàm xử lý các action và cập nhật trạng thái của ứng dụng.
export const setLoading = createAction("setLoading");

// fullfiled | pending | rejected
const initialState = {
  dataAllOrder: [],
  loading: false,
};
const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    // setLoading: (state, action) => ({
    //   ...state,
    //   loading: action.payload,
    // }),
  },
  extraReducers: (builder) => {
    builder
      //get All Order
      .addCase(handleGetAllOrder.fulfilled, (state, action) => {
        state.dataAllOrder = action.payload;
      })
      .addCase(handleGetAllOrder.rejected, (state, action) => {
        state.dataAllOrder = [];
      });
  },
});
// export const { setLoading } = categorySlice.actions;
export default orderSlice.reducer;
