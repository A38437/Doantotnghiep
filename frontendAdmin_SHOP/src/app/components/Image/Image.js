import React from "react";
import { defaultImage } from "../../../utils/commom";
import { checkImageExtension } from "../../../utils/functions";

const Image = ({ url = `${defaultImage}`, className = "" }) => {
  return (
    <div className={`${className}`}>
      <img
        // src={checkImageExtension(url) ? url : defaultImage}
        src={url || defaultImage}
        className="w-full h-full object-cover"
        alt="logo"
      />
    </div>
  );
};

export default Image;
