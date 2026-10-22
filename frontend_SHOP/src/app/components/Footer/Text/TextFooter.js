import React from "react";
import { Link } from "react-router-dom";

const TextFooter = ({ className = "", url = "", children }) => {
  if (url) {
    return (
      <Link to={url} className={`${className} block text-text1 font-normal`}>
        {children}
      </Link>
    );
  }
  return (
    <span className={`${className} block text-text1 font-normal`}>
      {children}
    </span>
  );
};

export default TextFooter;
