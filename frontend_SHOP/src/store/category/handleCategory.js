import { createAsyncThunk } from "@reduxjs/toolkit";
import requestGetAllCategory from "./requestCategory";

export const handleGetAllCategory = createAsyncThunk(
  "category/handleGetAllCategory",
  async (data, thunkAPI) => {
    try {
      const response = await requestGetAllCategory(data);
      return response.data;
    } catch (error) {
      console.log("🚀 ~ error:", error);
    }
  }
);
