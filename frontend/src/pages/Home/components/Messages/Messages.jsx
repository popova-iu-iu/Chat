import React from 'react';
import { useSelector } from 'react-redux';

import Header from './components/Header/Header';
import Body from './components/Body/Body';
import Footer from './components/Footer/Footer';

/* eslint-disable functional/no-expression-statements */
/* eslint-disable functional/no-conditional-statements */
/* eslint-disable max-len */

import { selectors } from '../../../../store/messages';
import { selectors as channelsSelectors } from '../../../../store/channels';

const Messages = () => {
  const messages = Object.values(useSelector(selectors.selectAll));

  const currentChannelId = useSelector(
    (state) => state.channels.currentChannelId,
  );

  const messagesInChat = messages.filter(
    ({ channelId }) => channelId === currentChannelId,
  );

  const currentChannel = useSelector((state) => channelsSelectors.selectById(state, currentChannelId));

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
