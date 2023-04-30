/* eslint-disable */
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Container, Row } from 'react-bootstrap';

import useAuth from '../../hooks/useAuth';
import fetchData from '../../api/fetchData';

import { addMessages } from '../../store/messages';
import { addChannels, setCurrentChannelId } from '../../store/channels';
import { open, close } from '../../store/modal';

import Channels from './components/Channels/Channels';
import Messages from './components/Messages/Messages';
import Modal from '../../components/modal';

const Home = () => {
  const dispatch = useDispatch();
  const auth = useAuth();

  const handleClose = () => {
    dispatch(close());
  };
  const handleOpen = (type, id = null) => () => {
    dispatch(open({ type, id }));
  };
  useEffect(() => {
    fetchData(auth.getAuthHeader).then((data) => {
      const { channels, currentChannelId, messages } = data;

      dispatch(addMessages(messages));
      dispatch(addChannels(channels));
      dispatch(setCurrentChannelId(currentChannelId));
    });
  });

  return (
    <Container className="h-100 my-4 overflow-hidden rounded shadow ">
      <Row className="h-100 bg-white flex-md-row ">
        <Channels handleOpen={handleOpen} />
        <Messages />
      </Row>
      <Modal onHide={handleClose} />
    </Container>
  );
};
export default Home;
