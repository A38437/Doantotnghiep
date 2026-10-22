import React from "react";

const CategoryNews = ({ name = "Quần Áo", className = "" }) => {
  return (
    <h1 className={`text-textBold font-semibold limitText  ${className}`}>
      <span className="text-text1 font-normal"> Danh mục:</span> {name}
    </h1>
  );
};

export default CategoryNews;
