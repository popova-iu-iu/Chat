import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  channels: [],
  currentChannelId: 1,
};

const channelsSlice = createSlice({
  name: "channels",
  initialState,
  reducers: {
    setChannel: (state, action) => {
      state.channels = action.payload;
    },
    addChannel: (state, action) => {
      const channel = action.payload;
      state.channels.push(channel);
    },
    setCurrentChannelId: (state, action) => {
      state.currentChannelId = action.payload;
    },
  },
});

export const { actions } = channelsSlice;

export default channelsSlice.reducer;
