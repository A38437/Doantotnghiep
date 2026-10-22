import React from "react";
import Image from "../../components/Image/Image";
import TitlePolicy from "./parts/TitlePolicy";
import DescriptionPolicy from "./parts/DescriptionPolicy";

const PolicyFeatureItem = ({ data }) => {
  return (
    // after:absolute after:top-full after:content-[''] after:w-[260px] after:h-[1px] after:bg-gray-200  after:hover:bg-primary after:hover:h-[2px]
    <div className="flex flex-col justify-center items-center py-5 md:py-10 lg:py-10">
      <Image className="" url={data.url}></Image>
      <TitlePolicy title={data.title}></TitlePolicy>
      <DescriptionPolicy contentDesc={data.contentDesc}></DescriptionPolicy>
    </div>
  );
};

export default PolicyFeatureItem;
