import React from "react";

const TitleProduct = ({ children, className = "font-normal text-[15px]" }) => {
  return (
    <h1 title={children} className={`text-text1    ${className}`}>
      {children || "Sản phẩm mặc định "}
    </h1>
  );
};

export default TitleProduct;
