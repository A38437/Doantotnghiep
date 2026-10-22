import React from "react";

const FlexCol = ({ children, title = "Tên", className = "" }) => {
  return (
    <div className={`flex flex-col gap-y-2 my-1 ${className}`}>
      <h1 className="text-text1 font-medium ml-1">{title}</h1>

      {children}
    </div>
  );
};

export default FlexCol;
