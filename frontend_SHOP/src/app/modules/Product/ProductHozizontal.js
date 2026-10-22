import React from "react";
import Image from "../../components/Image/Image";
import TitleProduct from "./parts/TitleProduct";
import PriceProduct from "./parts/PriceProduct";
import AttributeInCart from "./parts/AttributeInCart";
import { X } from "lucide-react";

const ProductHozizontal = ({ data, maxWidth = "max-w-[220px]" }) => {
  return (
    <div className="flex items-center justify-between gap-x-2">
      <div className="flex items-center  gap-x-2">
        <div className="flex-1">
          <Image
            url={data?.url}
            className="w-[80px] h-[80px] rounded-md overflow-hidden "
          ></Image>
        </div>
        <div className="flex flex-col">
          <TitleProduct
            className={`limitText flex-[3] ${maxWidth} flex items-center gap-x-2  text-textBold font-normal text-[18px]`}
          >
            {data?.name} <X size={"10px"} />{" "}
            <span className="inline-block text-[15px] text-text3">
              {data.quantity}
            </span>
          </TitleProduct>

          <div className="flex items-center gap-x-3">
            {data?.properties?.size && (
              <AttributeInCart className="uppercase">
                SIZE: {data.properties.size}
              </AttributeInCart>
            )}

            {data?.properties?.color && (
              <AttributeInCart className="uppercase">
                MÀU: {data.properties.color}
              </AttributeInCart>
            )}
          </div>
        </div>
      </div>
      <PriceProduct price={data?.price}></PriceProduct>
    </div>
  );
};

export default ProductHozizontal;
