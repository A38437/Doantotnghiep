import React from "react";
import Image from "../../../components/Image/Image";
import TitlePolicy from "../../PolicyFeature/parts/TitlePolicy";
import DescriptionPolicy from "../../PolicyFeature/parts/DescriptionPolicy";

const PolicyServiceItem = ({ data }) => {
  return (
    <div>
      <div className="flex items-center gap-x-4">
        <Image url={data?.url} className="mt-2"></Image>
        <div className="flex flex-col ">
          <TitlePolicy title={data?.title}></TitlePolicy>
          <DescriptionPolicy
            contentDesc={data?.contentDesc}
          ></DescriptionPolicy>
        </div>
      </div>
    </div>
  );
};

export default PolicyServiceItem;
