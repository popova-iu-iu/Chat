import React from "react";

const Header = ({ count }) => {
  return (
    <div className="bg-light mb-4 p-3 shadow-sm small">
      <p className="m-0">
        <b>#general</b>
      </p>
      <span className="text-muted">5 сообщений</span>
    </div>
  );
};

export default Header;
