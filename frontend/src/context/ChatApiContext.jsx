import React, { createContext, useEffect } from "react";

import store from "../store";

import { addMessage } from "../store/messages";

export const ChatApiContext = createContext({});

const ChatApiProvider = ({ socket, children }) => {
  useEffect(() => {
    socket.on("newMessage", (payload) => {
      store.dispatch(addMessage(payload));
    });
  }, [socket]);

  const sendMessage = (data) => {
    socket.emit("newMessage", data);
  };

  const value = {
    sendMessage,
  };

  return (
    <ChatApiContext.Provider value={value}>{children}</ChatApiContext.Provider>
  );
};

export default ChatApiProvider;


