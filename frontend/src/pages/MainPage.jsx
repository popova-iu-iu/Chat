import { useEffect, useContext, useState } from "react";
import routes from "../routes";
import AuthContext from "../contexts/index.jsx";
import axios from "axios";

const getAuthHeader = () => {
  const userId = JSON.parse(localStorage.getItem("userId"));
  if (userId && userId.token) {
    return { Authorization: `Bearer ${userId.token}` };
  }

  return {};
};

const MainPage = () => {
  const userId = JSON.parse(localStorage.getItem("userId"));

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(routes.dataPath(), {
        headers: getAuthHeader(),
      });
      const { channels, messages, currentChannelId } = response.data;
      console.log(channels)
      console.log(messages);
      console.log(currentChannelId);
    };
    fetchData();
  }, []);

  return (
    <>
      <div>MAIN PAGE AFTER AUTH</div>
    </>
  );
};

export default MainPage;
