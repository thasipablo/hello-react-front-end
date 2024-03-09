import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const url = 'http://localhost:3000/api/greetings';

export const fetchGreetings = createAsyncThunk(
  'message/fetchGreetings',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

const initialState = {
  message: '',
  isLoading: true,
};

const messageSlice = createSlice({
  name: 'message',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchGreetings.fulfilled, (state, action) => {
      state.message = action.payload.content;
      state.isLoading = false;
    });
    builder.addCase(fetchGreetings.rejected, (state, action) => {
      console.error('Error fetching greetings:', action.payload);
      state.isLoading = false;
    });
  },
});

export default messageSlice.reducer;
