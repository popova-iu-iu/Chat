import { useEffect, useContext, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Container, Row, Col } from "react-bootstrap";

import routes from "../routes";
import useAuth from "../hooks/index";
import { actions as channelsActions } from "../store/channelsSlice/slice";

import Channels from "../components/Channels/Channels";
import Messages from "../components/Messages/Messages";

const MainPage = () => {
  const dispatch = useDispatch();
  const auth = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(routes.dataPath(), {
          headers: auth.getAuthHeader(),
        });

        dispatch(channelsActions.setChannel(response.data.channels));
      } catch (e) {
        console.log(e);
      }
    };

    fetchData();
  }, [dispatch]);

  return (
    <Container className="h-100 my-4 overflow-hidden rounded shadow">
      <Row className="h-100 bg-white flex-md-row">
        <Channels />
        <Messages />
      </Row>
    </Container>
  );
};

export default MainPage;
