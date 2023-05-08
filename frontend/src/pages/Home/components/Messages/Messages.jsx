/* eslint-disable */
import React from 'react';
import { useSelector } from 'react-redux';

import Header from './components/Header/Header';
import Body from './components/Body/Body';
import Footer from './components/Footer/Footer';

import { getCurrentChannelId, getCurrentChannel } from '../../../../store/channels';
import { getMessages } from '../../../../store/messages';

const Messages = () => {
  const messages = useSelector(getMessages);

  const currentChannelId = useSelector(getCurrentChannelId);

  const messagesInChat = messages.filter(
    ({ channelId }) => channelId === currentChannelId,
  );

  const currentChannel = useSelector(getCurrentChannel);

  return (
    <div className="col p-0 h-100">
      <div className="d-flex flex-column h-100">
        <Header
          channelName={currentChannel?.name}
          count={messagesInChat.length}
        />
        <Body messages={messagesInChat} />
        <Footer />
      </div>
    </div>
  );
};

export default Messages;
