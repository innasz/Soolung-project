import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  list: [],
  error: null,
};
export const addBoard = createAsyncThunk(
  "addBoard",
  async (payload, thunkAPI) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/board`,
        payload
      );
      return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getBoard = createAsyncThunk(
  "getBoard",
  async (payload, thunkAPI) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/board?_sort=createdDate&_order=DESC&_limit=5`
      );
      return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getAllBoard = createAsyncThunk(
  "getAllBoard",
  async (payload, thunkAPI) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/board?_sort=createdDate&_order=DESC`
      );
      return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const boardSlice = createSlice({
  name: "board",
  initialState,
  reducers: {}, // reducer 액션부분 추가 하면 됨
  extraReducers: {
    [getBoard.fulfilled]: (state, action) => {
      state.list = action.payload;
    },
    [addBoard.fulfilled]: (state, action) => {
      state.list = [...state.list, action.payload];
    },
    [getBoard.rejected]: (state, action) => {
      state.error = action.payload;
    },
    [getAllBoard.fulfilled]: (state, action) => {
      state.list = action.payload;
    },
    [getAllBoard.rejected]: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { _ } = boardSlice.actions;

export default boardSlice.reducer;
