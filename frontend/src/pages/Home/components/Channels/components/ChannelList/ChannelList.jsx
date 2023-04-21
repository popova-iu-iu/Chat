import React from "react";
import { Nav } from "react-bootstrap";

const Channel = () => {
  return (
    <ul
      id="channels-box"
      className="nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block"
    >
      <li className="nav-item w-100">
        <button className="w-100 rounded-0 text-start btn btn-secondary">
          <span>#</span>
          general
        </button>
      </li>
      <li className="nav-item w-100">
        <button className="w-100 rounded-0 text-start btn ">
          <span>#</span>
          random
        </button>
      </li>
    </ul>
  );
};

const ChannelsList = () => {
  return (
    
      <Channel />

  );
};

export default ChannelsList;
