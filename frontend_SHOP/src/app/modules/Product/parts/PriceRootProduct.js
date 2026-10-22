import React from "react";
import { formatPrice } from "../../../../utils/functions";

const PriceRootProduct = ({
  price = 600000,
  className = "text-[14px] font-normal",
}) => {
  return (
    <span className={`text-text3 line-through  ${className}`}>
      {" "}
      {formatPrice(price)} đ
    </span>
  );
};

export default PriceRootProduct;
