import React from "react";

const TitlePolicy = ({ title = "This is title" }) => {
  return (
    <span className="block text-gray9 md:text-sm lg:text-[16px] font-semibold mt-4">
      {title}
    </span>
  );
};

export default TitlePolicy;
