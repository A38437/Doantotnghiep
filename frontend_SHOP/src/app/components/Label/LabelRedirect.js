import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const LabelRedirect = ({
  title = "",
  className = "font-medium ",
  url = "/#",
  icon = <ArrowRight size={"18px"} />,
}) => {
  return (
    <Link to={url}>
      <div className="flex items-center gap-x-2 text-primary ">
        <span className={className}>{title}</span>
        <span className="text-primary">{icon}</span>
      </div>
    </Link>
  );
};

export default LabelRedirect;
