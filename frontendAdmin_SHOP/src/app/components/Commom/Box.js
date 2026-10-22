import React from "react";

const Box = ({ children, className = "" }) => {
  return (
    <div
      className={`bg-[#FFF] shadow-custom2 py-8 px-4 rounded-lg ${className}`}
    >
      {children}
    </div>
  );
};

export default Box;
