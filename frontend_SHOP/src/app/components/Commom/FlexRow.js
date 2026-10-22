import React, { Children } from "react";

const FlexRow = ({ children, className = "" }) => {
  return (
    <div className={`flex items-center justify-between my-10 ${className}`}>
      {children}
    </div>
  );
};

export default FlexRow;
