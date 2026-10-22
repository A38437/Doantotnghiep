import { createAsyncThunk } from "@reduxjs/toolkit";
import requestGetAllNews, {
  requestAddCommentNews,
  requestAddNews,
  requestDeleteNews,
  requestGetCommentNews,
  requestGetDetailsNews,
  requestUpdateNews,
} from "./requestNews";
import { toast } from "react-toastify";

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

export const handleAddNews = createAsyncThunk(
  "news/handleAddNews",
  async (data, thunkAPI) => {
    try {
      const response = await requestAddNews(data);

      if (response.status === 200) {
        data?.callBack?.();
      }
    } catch (error) {
      toast.error(error?.response?.data?.ms, { autoClose: 800 });
    }
  }
);

export const handleUpdateNews = createAsyncThunk(
  "news/handleUpdateNews",
  async (data, thunkAPI) => {
    try {
      const response = await requestUpdateNews(data);

      if (response.status === 200) {
        data?.callBack?.();
      }
    } catch (error) {
      toast.error(error?.response?.data?.ms, { autoClose: 800 });

      console.log("🚀 ~ error:", error);
    }
  }
);

export const handleDeleteNews = createAsyncThunk(
  "news/handleDeleteNews",
  async (data, thunkAPI) => {
    try {
      const response = await requestDeleteNews(data);

      if (response.status === 200) {
        data?.callBack?.();
      }
    } catch (error) {
      toast.error(error?.response?.data?.ms, { autoClose: 800 });

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
