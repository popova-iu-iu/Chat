import React from "react";

const MessagesList = ({ messages }) => {
  return (
     <div className="text-break mb-2">
      <b>user</b>: msg
    </div>)
   

};

const Body = () => (
  <div id="messages-box" className="chat-messages overflow-auto px-5">
    <MessagesList  />
  </div>
);

export default Body;
