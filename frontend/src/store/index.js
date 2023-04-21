import { configureStore } from "@reduxjs/toolkit";

import channelReducer from "./channels";
import messagesReducer from "./messages";

export default configureStore({
  reducer: {
    channels: channelReducer,
    messages: messagesReducer,
  },
});
