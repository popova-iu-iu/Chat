/* eslint-disable */
import React from 'react';
import { useSelector } from 'react-redux';

import Header from './components/Header/Header';
import Body from './components/Body/Body';
import Footer from './components/Footer/Footer';

import { selectors } from '../../../../store/messages';
import { getCurrentChannelId, getCurrentChannel, selectors as channelsSelectors } from '../../../../store/channels';

const Messages = () => {
  const messages = Object.values(useSelector(selectors.selectAll));

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
