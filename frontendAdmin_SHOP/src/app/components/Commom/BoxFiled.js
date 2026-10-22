import { Asterisk } from "lucide-react";
import React from "react";

const BoxFiled = ({ children, title = "Tên", require = true }) => {
  return (
    <div className="flex flex-col gap-y-2">
      <div className="flex items-baseline gap-x-[3px]">
        <h1 className="text-text1 font-medium ml-1">{title}</h1>
        {require && <Asterisk size={"16px"} color="rgb(247,0,0)" />}
      </div>
      <div>{children}</div>
    </div>
  );
};

export default BoxFiled;
