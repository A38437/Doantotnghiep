import React from "react";
import Image from "../../../components/Image/Image";

const ImgFeature = () => {
  return (
    <div className="flex items-center gap-x-3 px-10 ">
      <Image
        className="rounded-lg overflow-hidden"
        url="/imgHomePage/img1.webp"
      ></Image>
      <Image
        className="rounded-lg overflow-hidden"
        url="/imgHomePage/img4.png"
      ></Image>
      <Image
        className="rounded-lg overflow-hidden"
        url="/imgHomePage/img3.webp"
      ></Image>
    </div>
  );
};

export default ImgFeature;
