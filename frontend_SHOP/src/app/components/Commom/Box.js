import React from "react";
import LabelRedirect from "../Label/LabelRedirect";
import Title from "./Title";

const Box = ({
  title = "Đơn hàng gần đây",
  labelRedirec = "Xem thêm",
  url = "/#",
  children,
  isShowheader = true,
  isShowLabel = false,
  className = "",
}) => {
  return (
    <div
      className={`py-4 px-6  border-text2 border-[2px] rounded-lg ${className}`}
    >
      {isShowheader && (
        <div className="flex items-center justify-between mb-4  border-b-text2 pb-4 border-b-[2px]">
          <Title title={title} className="text-[20px] font-semibold"></Title>
          {isShowLabel && (
            <LabelRedirect title={labelRedirec} url={url}></LabelRedirect>
          )}
        </div>
      )}

      <div>{children}</div>
    </div>
  );
};

export default Box;
