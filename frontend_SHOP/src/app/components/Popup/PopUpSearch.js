import React from "react";
import { Link } from "react-router-dom";
import Image from "../Image/Image";
import PriceProduct from "../../modules/Product/parts/PriceProduct";

const PopUpSearch = ({ data, loading, text }) => {
  return (
    <div className="absolute top-full left-0 max-w-[500px] z-50 bg-white shadow-custom2 w-full mt-2 rounded-md py-4 max-h-[319px] overflow-y-auto  ">
      <div>
        <div className="px-3 flex items-center text-[15px] font-normal text-gray5">
          {loading && <Image url="/loadingP2.gif" className="h-[30px]" />}

          {data.length > 0 ? (
            <span>
              Result for : '
              <span className="text-textBold font-semibold">{text}</span>'
            </span>
          ) : (
            <span>
              Not Found : '
              <span className="text-textBold font-semibold">{text}</span>'
            </span>
          )}
        </div>
      </div>
      {!loading &&
        data?.length > 0 &&
        data.map((item) => (
          <Link
            key={item.id}
            className="flex items-center gap-x-3 py-2 px-3 cursor-pointer hover:bg-gray-100"
            to={`product/${item?.id}`}
          >
            <Image
              url={item?.image[0]?.url || null}
              className="w-[80px] h-[80px] rounded-lg object-cover overflow-hidden "
              alt=""
            />
            <div>
              <span className="block text-text1 font-normal text-[16px] whitespace-nowrap overflow-hidden overflow-ellipsis max-w-[320px] ">
                {item?.name}
              </span>
              <PriceProduct price={item?.total}></PriceProduct>
            </div>
          </Link>
        ))}
    </div>
  );
};

export default PopUpSearch;
