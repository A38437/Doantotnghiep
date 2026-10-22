import React, { useEffect } from "react";
import Title from "../../components/Commom/Title";
import Image from "../../components/Image/Image";
import ContentNews from "./parts/ContentNews";
import TitleNews from "./parts/TitleNews";
import { Link } from "react-router-dom";
import TitleProduct from "../Product/parts/TitleProduct";
import PriceProduct from "../Product/parts/PriceProduct";
import { useDispatch, useSelector } from "react-redux";
import { handleGetTopSoldProduct } from "../../../store/product/handleProduct";

const FashionNewsSub = ({ dataNews }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(handleGetTopSoldProduct({ limit: 4 }));
  }, []);

  const dataTopSoldProduct = useSelector(
    (state) => state.product.dataTopSoldProduct.results
  );
  return (
    <div>
      <div className="flex flex-col gap-y-[60px]">
        <div className="flex flex-col gap-y-8">
          <Title
            title="Tin Tức Mới Nhất"
            width="text-[26px] font-semibold after:w-[200px] "
          ></Title>

          <div className="flex flex-col items-center gap-y-8">
            {dataNews?.length > 0 &&
              dataNews?.slice(0, 4)?.map((news) => (
                <Link
                  to={`/news/${news?.id}`}
                  className="flex items-start gap-x-2"
                  key={news?.id}
                >
                  <Image
                    url={news?.url}
                    className="w-[100px] h-[100px] flex-1 rounded-md overflow-hidden"
                  ></Image>
                  <ContentNews
                    className="flex-[2] text-textBold text-[18px] font-semibold multiline-ellipsis3 transition-all hover:text-primary
                   "
                  >
                    {news?.title}
                  </ContentNews>
                </Link>
              ))}
          </div>
        </div>
        <div className="flex flex-col gap-y-8">
          <Title
            title="Sản Phẩm Bán Chạy"
            width="text-[26px] font-semibold after:w-[210px] "
          ></Title>
          <div className="flex flex-col items-start gap-y-8">
            {dataTopSoldProduct?.length > 0 &&
              dataTopSoldProduct?.map((product) => (
                <Link
                  to={`/product/${product?.id}`}
                  key={product?.id}
                  className="flex items-start gap-x-2"
                >
                  <Image
                    url={product?.image[0]?.url}
                    className="w-[100px] h-[100px]  rounded-md overflow-hidden"
                  ></Image>
                  <div className="">
                    <TitleProduct className="!multiline-ellipsis text-textBold font-medium text-[20px] w-[180px] transition-all hover:text-primary">
                      {product?.name}
                    </TitleProduct>
                    <PriceProduct
                      className="text-[20px] font-medium"
                      price={product?.total}
                    ></PriceProduct>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FashionNewsSub;
