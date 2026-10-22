import { createAsyncThunk } from "@reduxjs/toolkit";
import requestGetAllNews, {
  requestAddCommentNews,
  requestGetCommentNews,
  requestGetDetailsNews,
} from "./requestNews";

export const handleGetAllNews = createAsyncThunk(
  "news/handleGetAllNews",
  async (data, thunkAPI) => {
    try {
      const response = await requestGetAllNews(data);
      return response.data;
    } catch (error) {
      console.log("🚀 ~ error:", error);
    }
  }
);

export const handleGetDetailsNews = createAsyncThunk(
  "news/handleGetDetailsNews",
  async (id, thunkAPI) => {
    try {
      const response = await requestGetDetailsNews(id);
      return response.data.results;
    } catch (error) {
      console.log("🚀 ~ error:", error);
    }
  }
);

export const handleGetCommentNews = createAsyncThunk(
  "news/handleGetCommentNews",
  async (data, thunkAPI) => {
    try {
      const response = await requestGetCommentNews(data);
      return response.data;
    } catch (error) {
      console.log("🚀 ~ error:", error);
    }
  }
);

export const handleAddCommentNews = createAsyncThunk(
  "news/handleAddCommentNews",
  async (data, thunkAPI) => {
    try {
      const response = await requestAddCommentNews(data);

      if (response.status === 200) {
        await thunkAPI.dispatch(handleGetCommentNews({ id: data.newsId }));
        data?.callback?.();
      }
    } catch (error) {
      console.log("🚀 ~ error:", error);
    }
  }
);
