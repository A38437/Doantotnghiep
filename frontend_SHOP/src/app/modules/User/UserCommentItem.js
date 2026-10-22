import React from "react";
import Image from "../../components/Image/Image";
import NameUser from "./parts/NameUser";
import DateUser from "./parts/DateUser";
import { Dot } from "lucide-react";
import StarProduct from "../Product/parts/StarProduct";

const UserCommentItem = ({ data }) => {
  return (
    <div className="flex flex-col items-start gap-y-3 border-b-[3px] border-b-text2 pb-5 ">
      <div className="flex items-center gap-x-3">
        <Image
          url={data?.user?.avatar}
          className="w-[50px] h-[50px] rounded-full overflow-hidden "
        ></Image>
        <div className="flex flex-col gap-y-1 ">
          <div className="flex ">
            <NameUser name={data?.user?.userName}></NameUser>
            <Dot />
            <div>
              <DateUser date={data?.createdAt}></DateUser>
            </div>
          </div>
          {data?.rate && (
            <div>
              <StarProduct averageRating={parseInt(data?.rate)}></StarProduct>
            </div>
          )}
        </div>
      </div>
      <p className="text-[16px] text-text1">
        {data?.content || data?.description}
      </p>

      {/* <div className="grid grid-cols-3 gap-3 ">
        <Image className="w-[100px] h-[100px]"></Image>
        <Image className="w-[100px] h-[100px]"></Image>
        <Image className="w-[100px] h-[100px]"></Image>
        <Image className="w-[100px] h-[100px]"></Image>
        <Image className="w-[100px] h-[100px]"></Image>
      </div> */}
    </div>
  );
};

export default UserCommentItem;
