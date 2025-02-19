import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { serverUrl } from "app/constants";
import { productActions } from "../slice";

interface FetchProductDataProps {
  productId: string;
}

export const FetchProductData = createAsyncThunk(
  "Product/FetchProductData",
  async (
    { productId }: FetchProductDataProps,
    { dispatch, rejectWithValue },
  ) => {
    try {
      const response = await axios.get(`${serverUrl}/products?id=${productId}`);

      dispatch(productActions.setProductData(response.data[0]));

      return response.data[0];
    } catch (error: any) {
      return rejectWithValue(error.response.data.message);
    }
  },
);
