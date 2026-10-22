import React from "react";

const BoxContact = ({
  children,
  content = "2715 Ash Dr. San Jose, South Dakota 83475",
  className = "",
}) => {
  return (
    <div
      className={`flex flex-col items-center justify-center gap-x-4 py-8 border-b-[1px] ${className}`}
    >
      <span>{children}</span>
      <span className="block text-gray8 text-[16px] font-normal mt-3 text-center">
        {content}
      </span>
    </div>
  );
};

export default BoxContact;
