import React from "react";
import { generateStars } from "../../../../utils/functions";

const StarProduct = ({ averageRating = 3, className = "" }) => {
  return (
    <div className={`flex items-center gap-x-1 ${className} `}>
      {generateStars(averageRating)}
    </div>
  );
};

export default StarProduct;
