import React, { useEffect, useRef } from 'react';

/* eslint-disable functional/no-expression-statements */
/* eslint-disable functional/no-conditional-statements */

const MessagesList = ({ messages }) => {
  const messageRef = useRef(null);

  const lastMessage = messages[messages.length - 1];
  useEffect(() => {
    if (lastMessage) {
      messageRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  });

  return messages.map(({ body, username, id }) => (
    <div className="text-break mb-2" key={id} ref={messageRef}>
      <b>{username}</b>
      :
      {' '}
      {body}
    </div>
  ));
};

const Body = ({ messages }) => (
  <div id="messages-box" className="chat-messages overflow-auto px-5">
    <MessagesList messages={messages} />
  </div>
);

export default Body;
