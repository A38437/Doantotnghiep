import React from "react";

const DiscountProduct = ({ discount = 3, className = "" }) => {
  return <h1 className={`tag font-semibold  ${className}`}>{discount} %</h1>;
};

export default DiscountProduct;
