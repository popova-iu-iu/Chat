import { configureStore } from "@reduxjs/toolkit";

import channelsReducer from "./channelsSlice/slice";
import messagesReducer from "./messagesSlice/slice";

export const store = configureStore({
  reducer: {
    channels: channelsReducer,
    messages: messagesReducer,
  },
});

