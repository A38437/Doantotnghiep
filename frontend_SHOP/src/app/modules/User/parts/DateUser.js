// import { CalendarDays } from "lucide-react";
import React from "react";
import { convertDateNumeric } from "../../../../utils/functions";

const DateUser = ({ date = "27/5/2026", className = "text-[16px]" }) => {
  return (
    <div className="flex items-center gap-x-2">
      {/* <CalendarDays color="#C2BDBA" /> */}
      <span className={`text-text3 block  ${className}`}>
        {convertDateNumeric(date)}
      </span>
    </div>
  );
};

export default DateUser;
