import React from "react";

const TitleFooter = ({ className = "", children }) => {
  return <h1 className={`text-textBold ${className}`}>{children}</h1>;
};

export default TitleFooter;
