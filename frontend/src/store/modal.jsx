import { createSlice } from '@reduxjs/toolkit';
/* eslint-disable functional/no-expression-statements */
/* eslint-disable functional/no-conditional-statements */
/* eslint-disable no-param-reassign */

const initialState = {
  type: null,
  channelId: null,
};

const modalSlice = createSlice({
  name: 'modals',
  initialState,
  reducers: {
    open: (state, { payload }) => {
      state.type = payload.type;
      state.channelId = payload.id;
    },
    close: (state) => {
      state.type = null;
      state.channelId = null;
    },
  },
});

export const { open, close } = modalSlice.actions;
export default modalSlice.reducer;
