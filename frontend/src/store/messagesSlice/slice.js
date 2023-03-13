import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  messages: [],
};

const messagesSlice = createSlice({
  name: "messages",
  initialState,
  reducers: {
    setMessage: (state, action) => {},
  },
});

export const { setMessage } = messagesSlice.actions;
export default messagesSlice.reducer;
