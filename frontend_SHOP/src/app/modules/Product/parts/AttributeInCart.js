import React from "react";

const AttributeInCart = ({ className = "text-[14px]", children }) => {
  return (
    <div className={`${className} text-text3 font-medium `}>
      {children || "SIZE: XL"}
    </div>
  );
};

export default AttributeInCart;
