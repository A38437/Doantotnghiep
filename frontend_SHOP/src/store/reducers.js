import { combineReducers } from "@reduxjs/toolkit";
import userSlice from "./user/userSlice";
import authSlice from "./auth/authSlice";
import categorySlice from "./category/categorySlice";
import productSlice from "./product/productSlice";
import cartSlice from "./cart/cartSlice";
import newsSlice from "./news/newsSlice";
import orderSlice from "./order/orderSlice";

export const reducer = combineReducers({
  user: userSlice,
  auth: authSlice,
  category: categorySlice,
  product: productSlice,
  cart: cartSlice,
  news: newsSlice,
  order: orderSlice,
});
