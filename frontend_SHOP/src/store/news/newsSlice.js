import { createSlice, createAction } from "@reduxjs/toolkit";
import {
  handleAddCommentNews,
  handleGetAllNews,
  handleGetCommentNews,
  handleGetDetailsNews,
} from "./handleNews";

//Reducer Là các hàm xử lý các action và cập nhật trạng thái của ứng dụng.
export const setLoading = createAction("setLoading");

// fullfiled | pending | rejected
const initialState = {
  dataAllNews: [],
  dataAllCommentNews: [],
  dataDetailNews: {},
  loading: false,
};
const NewsSlice = createSlice({
  name: "news",
  initialState,
  reducers: {
    // setLoading: (state, action) => ({
    //   ...state,
    //   loading: action.payload,
    // }),
  },
  extraReducers: (builder) => {
    builder
      //get All News
      .addCase(handleGetAllNews.fulfilled, (state, action) => {
        state.dataAllNews = action.payload;
      })
      .addCase(handleGetAllNews.rejected, (state, action) => {
        state.dataAllNews = [];
      })

      .addCase(handleGetDetailsNews.fulfilled, (state, action) => {
        state.dataDetailNews = action.payload;
      })
      .addCase(handleGetDetailsNews.rejected, (state, action) => {
        state.dataDetailNews = {};
      })

      .addCase(handleGetCommentNews.fulfilled, (state, action) => {
        state.dataAllCommentNews = action.payload;
      })
      .addCase(handleGetCommentNews.rejected, (state, action) => {
        state.dataAllCommentNews = [];
      })

      .addCase(handleAddCommentNews.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(handleAddCommentNews.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(handleAddCommentNews.rejected, (state, action) => {
        state.loading = false;
      })

      .addCase(setLoading, (state, action) => {
        state.loading = action.payload;
      });
  },
});
// export const { setLoading } = NewsSlice.actions;
export default NewsSlice.reducer;
