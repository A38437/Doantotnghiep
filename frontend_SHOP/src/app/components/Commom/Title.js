import React from "react";

const Title = ({
  className = "text-[24px] font-semibold",
  title = "",
  width = "",
}) => {
  return (
    <div>
      <h1 className={` inline ${className} text-textBold `}>{title}</h1>
      <div
        className={`absolute after:bg-primary after:absolute after:contents-'' ${width} after:h-[2px]`}
      ></div>
    </div>
  );
};

export default Title;
