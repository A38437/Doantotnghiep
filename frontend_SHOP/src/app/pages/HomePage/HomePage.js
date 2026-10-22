import React, { Fragment, useEffect, useState } from "react";
import Button from "../../components/Button/Button";
import Gap from "../../components/Commom/Gap";
import { axiosClient } from "../../axios/axiosClient";
import { useDispatch, useSelector } from "react-redux";
import { handleGetCurrentUser } from "../../../store/user/handleUser";
import { generateStars } from "../../../utils/functions";
import ProductItem from "../../modules/Product/ProductItem";
import ProductDetails from "../../modules/Product/ProductDetails";
import ProductModal from "../../modules/Product/ProductModal";
import SliderBanner from "../../modules/HomePage/SliderBanner";
import PolicyFeature from "../../modules/PolicyFeature/PolicyFeature";
import Title from "../../components/Commom/Title";
import LabelRedirect from "../../components/Label/LabelRedirect";
import FlexRow from "../../components/Commom/FlexRow";
import ListCategory from "../../modules/HomePage/Categories/ListCategory";
import ImgFeature from "../../modules/HomePage/ImgFeature/ImgFeature";
import BrandFashion from "../../modules/HomePage/BrandFashion/BrandFashion";
import FashionNews from "../../modules/FashionNews/FashionNews";
import {
  handleGetNewArrivals,
  handleGetTopDiscountProduct,
  handleGetTopSoldProduct,
} from "../../../store/product/handleProduct";
import { useLocation } from "react-router-dom";
import { handleGetAllNews } from "../../../store/news/handleNews";

const HomePage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(handleGetTopSoldProduct());
    dispatch(handleGetNewArrivals());
    dispatch(handleGetTopDiscountProduct({ topDisCount: 80 }));
    dispatch(handleGetAllNews());
  }, [dispatch]);

  const dataTopSoldProduct = useSelector(
    (state) => state?.product?.dataTopSoldProduct?.results
  );
  const dataNewArrivalProduct = useSelector(
    (state) => state?.product?.dataNewArrivals?.results
  );

  const datTopDiscountProduct = useSelector(
    (state) => state?.product?.dataTopDiscountProduct?.results
  );

  const dataAllNews = useSelector((state) => state.news.dataAllNews.results);

  return (
    <div>
      <SliderBanner></SliderBanner>

      <Gap>
        <PolicyFeature></PolicyFeature>
      </Gap>

      <ImgFeature></ImgFeature>

      <Gap>
        <div className="mt-[60px]">
          <FlexRow>
            <Title title="Danh Mục Hàng Đầu" width="after:w-[220px]"></Title>
          </FlexRow>
          <ListCategory></ListCategory>
        </div>

        <div className="mt-[60px]">
          <FlexRow>
            <Title title="Sản Phẩm Mới Ra" width="after:w-[190px]"></Title>
          </FlexRow>
          <div className="grid grid-cols-4 gap-x-5 gap-y-10">
            {dataNewArrivalProduct?.length > 0 &&
              dataNewArrivalProduct.map((product) => (
                <ProductItem key={product.id} data={product}></ProductItem>
              ))}
          </div>
        </div>

        <div className="mt-[60px]">
          <FlexRow>
            <Title title="Sản Phẩm Bán Chạy" width="after:w-[220px]"></Title>
            <LabelRedirect url="/productsCombine" title="Xem thêm" />
          </FlexRow>
          <div className="grid grid-cols-4 gap-x-5 gap-y-10">
            {dataTopSoldProduct?.length > 0 &&
              dataTopSoldProduct.map((product) => (
                <ProductItem key={product.id} data={product}></ProductItem>
              ))}
          </div>
        </div>

        <div className="mt-[60px]">
          <FlexRow>
            <Title
              title="Sản Phẩm Siêu Giảm Giá"
              width="after:w-[265px]"
            ></Title>
            <LabelRedirect url="/productsCombine" title="Xem thêm" />
          </FlexRow>
          <div className="grid grid-cols-4 gap-x-5 gap-y-10">
            {datTopDiscountProduct?.length > 0 &&
              datTopDiscountProduct
                .slice(0, 8)
                .map((product) => (
                  <ProductItem key={product.id} data={product}></ProductItem>
                ))}
          </div>
        </div>

        <div className="mt-[60px]">
          <FlexRow>
            <Title title="Tin Tức Thời Trang" width="after:w-[200px]"></Title>
          </FlexRow>

          <FashionNews data={dataAllNews}></FashionNews>
        </div>
      </Gap>
    </div>
  );
};

export default HomePage;
