import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Col, Button } from "react-bootstrap";
import { PlusSquare } from "react-bootstrap-icons";
import { actions } from "../../../../store/channels";

import { actions as channelsActions } from "../../../../store/channels";

import ChannelsList from "./components/ChannelList/ChannelList";

const addNewChannel = () => {
  console.log("Add channel");
};

const Channels = () => {
  const { channels, currentChannelId } = useSelector((state) => state.channels);

  return (
    <Col className="col-4 col-md-2 border-end px-0 bg-light flex-column  d-flex">
      <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
        <span>Каналы</span>
        <Button
          onClick={addNewChannel}
          variant="link"
          className="p-0 text-primary btn-group-vertical"
        >
          <PlusSquare />
          <span className="visually-hidden">+</span>
        </Button>
      </div>
      <ChannelsList />
    </Col>
  );
};

export default Channels;
