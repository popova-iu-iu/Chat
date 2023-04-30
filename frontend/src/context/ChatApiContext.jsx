import React, { createContext, useEffect } from 'react';
/* eslint  no-multiple-empty-lines: 0 */
/* eslint  indent: 0 */
/* eslint-disable functional/no-expression-statements */
/* eslint-disable functional/no-conditional-statements */
/* eslint-disable react/jsx-no-constructed-context-values */

import store from '../store';
import {
  addChannel,
  setCurrentChannelId,
  renameChannel,
  removeChannel,
  setDefaultChannelId,
} from '../store/channels';

import { addMessage } from '../store/messages';

export const ChatApiContext = createContext({});

const ChatApiProvider = ({ socket, children }) => {
  useEffect(() => {
    socket.on('newMessage', (payload) => {
      store.dispatch(addMessage(payload));
    });

    socket.on('newChannel', (payload) => {
      store.dispatch(addChannel(payload));
    });

    socket.on('renameChannel', ({ id, name }) => {
      store.dispatch(renameChannel({ id, changes: { name } }));
    });

    socket.on('removeChannel', ({ id }) => {
      store.dispatch(setDefaultChannelId(id));
      store.dispatch(removeChannel(id));
    });
  }, [socket]);

  const newChannel = (name, cb) => {
    socket.emit('newChannel', { name }, (response) => {
      const {
        status,
        data: { id },
      } = response;

      if (status === 'ok') {
        store.dispatch(setCurrentChannelId(id));
        cb();
      }
    });
  };

  const newNameChannel = ({ id, name }, cb) => {
    socket.emit('renameChannel', { id, name }, (response) => {
      const { status } = response;

      if (status === 'ok') {
        cb();
      }
    });
  };

  const deleteChannel = (id, cb) => {
    socket.emit('removeChannel', { id }, (response) => {
      const { status } = response;

      if (status === 'ok') {
        cb();
      }
    });
  };

  const sendMessage = (data) => {
    socket.emit('newMessage', data);
  };

  const value = {
    sendMessage,
    newChannel,
    newNameChannel,
    deleteChannel,
  };

  return (
    <ChatApiContext.Provider value={value}>{children}</ChatApiContext.Provider>
  );
};

export default ChatApiProvider;
