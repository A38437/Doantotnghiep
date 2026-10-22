import { Heart } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";
import { formatPrice } from "../../../utils/functions";

const BoxOverviewItem = ({
  icon = <Heart></Heart>,
  title = "Today Sale",
  unit = "",
  colorIcon,
  quantity = 12345678,
  to = "#",
}) => {
  return (
    <Link
      to={to}
      className="flex items-center  justify-between bg-white rounded-md shadow-lg py-4 px-6 shadowgreen"
    >
      <div className={`${colorIcon}`}>{icon}</div>
      <div className="flex flex-col items-end justify-end">
        <h1 className="text-[16px] font-medium text-gray-700">{title}</h1>
        <span className="block text-[22px] font-semibold text-gary9 pt-2">
          {unit ? formatPrice(quantity) : quantity} {unit}
        </span>
      </div>
    </Link>
  );
};

export default BoxOverviewItem;
