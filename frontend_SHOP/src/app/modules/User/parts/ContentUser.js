import React from "react";

const ContentUser = ({ children, className = "" }) => {
  return <p className={`${className} text-text3 font-normal`}>{children}</p>;
};

export default ContentUser;
