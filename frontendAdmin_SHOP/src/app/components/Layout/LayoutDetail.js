import React from "react";
import Button from "../Button/Button";
import { Plus } from "lucide-react";

const LayoutDetail = ({
  children,
  title = "Danh Sách Danh Mục",
  url = "#",
  titleBtn = "",
  className = "",
}) => {
  return (
    <div className={`flex flex-col gap-y-10 ${className}`}>
      <h1 className="text-primary text-[22px] font-semibold">{title}</h1>
      {titleBtn && (
        <div className="flex items-center justify-end ">
          <Button
            kind="primary"
            className="rounded-lg hover:bg-secondary transition-all"
            href={url}
          >
            <span className="mr-1">
              <Plus size={"16px"}></Plus>
            </span>{" "}
            {titleBtn}
          </Button>
        </div>
      )}
      <div>{children}</div>
    </div>
  );
};

export default LayoutDetail;
