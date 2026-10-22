import React from "react";

const AttributeProduct = ({
  title = "Trắng",
  className = "min-w-[120px] ",
}) => {
  return (
    <div
      className={`${className} text-text1 text-center py-3 px-4  border border-text1 rounded-lg `}
    >
      {title}
    </div>
  );
};

export default AttributeProduct;
