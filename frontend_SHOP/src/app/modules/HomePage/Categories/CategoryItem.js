import React from "react";
import Image from "../../../components/Image/Image";
import Title from "../../../components/Commom/Title";

const CategoryItem = ({ data }) => {
  return (
    <div className="max-h-[250px] hover:scale-110 transition-all hover:border-[2px] hover:border-primary hover:rounded-lg cursor-pointer  ">
      <div className="relative">
        <Image
          url={data?.url}
          className=" h-[250px] rounded-md overflow-hidden"
        ></Image>

        <div className="absolute bg-white opacity-85 w-full h-[100px] top-3/4 -translate-y-3/4 flex flex-col items-center justify-center gap-y-2">
          <h1
            title={data?.name}
            className="text-textBold font-semibold text-[18px] limitText max-w-[180px]"
          >
            {data?.name}
          </h1>
          <span className="font-normal text-text1 text-[14px]">
            {data?.TotalproductCount} Product
          </span>
        </div>
      </div>
    </div>
  );
};

export default CategoryItem;
