import React from "react";

const DescriptionPolicy = ({ contentDesc = "This is content" }) => {
  return (
    <p className="block md:text-[12px] lg:text-sm text-text1 opacity-90 font-normal mt-[8px]">
      {contentDesc}
    </p>
  );
};

export default DescriptionPolicy;
