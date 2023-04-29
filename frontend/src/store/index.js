import { configureStore } from '@reduxjs/toolkit';

import channelReducer from './channels';
import messagesReducer from './messages';
import modalReducer from './modal';

export default configureStore({
  reducer: {
    channels: channelReducer,
    messages: messagesReducer,
    modal: modalReducer,
  },
});
