import { CalendarDays } from "lucide-react";
import React from "react";

const DateOrderProduct = ({
  date = "27/5/2026",
  className = "text-[16px]",
}) => {
  return (
    <div className="flex items-center gap-x-2">
      <span className={`text-text1 block  ${className}`}>{date}</span>
    </div>
  );
};

export default DateOrderProduct;
