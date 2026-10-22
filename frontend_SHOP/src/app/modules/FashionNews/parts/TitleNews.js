import React from "react";
import { Link } from "react-router-dom";

const TitleNews = ({ children, className = "text-[18px]", to = "" }) => {
  if (to) {
    return (
      <Link
        to={to}
        className={` text-textBold font-medium limitText hover:text-primary transition  ${className}`}
      >
        {children || "Đây là title Fake hãy thêm title vào đi"}
      </Link>
    );
  }
  return (
    <div className={` text-textBold font-medium limitText  ${className}`}>
      {children || "Đây là title Fake hãy thêm title vào đi"}
    </div>
  );
};

export default TitleNews;
