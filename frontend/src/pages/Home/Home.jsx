import React, { useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Container, Row } from "react-bootstrap";

import Channels from "./components/Channels/Channels";
import Messages from "./components/Messages/Messages";
import routes from "../../routes/routes";
import useAuth from "../../hooks/useAuth";
import fetchData from "../../api/fetchData";

import { actions as channelsActions } from "../../store/channels";
import { addMessage } from "../../store/messages";

const Home = () => {
  const dispatch = useDispatch();
  const auth = useAuth();

  useEffect(() => {
    fetchData(auth.getAuthHeader).then((data) => {
      const { channels, messages, currentChannelId } = data;


      dispatch(channelsActions.setChannel(channels));
      dispatch(addMessage(messages));
    });
  });

  return (
    <Container className="h-100 my-4 overflow-hidden rounded shadow ">
      <Row className="h-100 bg-white flex-md-row ">
        <Channels />
        <Messages />
      </Row>
    </Container>
  );
};
export default Home;
