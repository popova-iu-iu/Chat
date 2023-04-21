import React from "react";

import Header from "./components/Header/Header";
import Body from "./components/Body/Body";
import Footer from "./components/Footer/Footer";
import { useSelector } from "react-redux";

const Messages = () => {
  const  msg  = useSelector((state) => state.messages);
  console.log(msg);

  return (
    <div className="col p-0 h-100">
      <div className="d-flex flex-column h-100">
        <Header />
        <Body />
        <Footer />
      </div>
    </div>
  );
};

export default Messages;
