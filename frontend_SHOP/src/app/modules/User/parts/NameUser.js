import React from "react";

const NameUser = ({ name = "TTQ Nguyen", className = "" }) => {
  return (
    <h2 className={`font-semibold  text-gray8  capitalize ${className}`}>
      {name}
    </h2>
  );
};

export default NameUser;
