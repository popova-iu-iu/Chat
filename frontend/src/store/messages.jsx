/* eslint-disable */
import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';

import { removeChannel } from './channels';

const messagesAdapter = createEntityAdapter();

const initialState = messagesAdapter.getInitialState();

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    addMessage: messagesAdapter.addOne,
    addMessages: messagesAdapter.addMany,
  },
  extraReducers: (builder) => {
    builder.addCase(removeChannel, (state, action) => {
      const filteredMessages = Object.values(state.entities)
        .filter(({ channelId }) => channelId === action.payload)
        .map((message) => message.id);

      messagesAdapter.removeMany(state, filteredMessages);
    });
  },
});

export const { addMessage, addMessages } = messagesSlice.actions;

export const selectors = messagesAdapter.getSelectors(
  (state) => state.messages,
);

export const getMessages = (state) => {
  return state.messages.ids
  .map((id) => state.messages.entities[id]);
}

export default messagesSlice.reducer;
