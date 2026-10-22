import React, { useEffect, useState } from "react";
import Gap from "../components/Commom/Gap";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import ProductItem from "../modules/Product/ProductItem";
import { Divider, Pagination, Radio, Space, Tree } from "antd";
import { Atom, BadgeCheck, Check, Dot, Hourglass, Minus } from "lucide-react";
import Title from "../components/Commom/Title";
import { useForm } from "react-hook-form";
import Input from "../components/Input/Input";
import Button from "../components/Button/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDongSign } from "@fortawesome/free-solid-svg-icons";
import { LIMIT_HIGH, dataRating } from "../../utils/commom";
import AttributeProduct from "../modules/Product/parts/AttributeProduct";
import { useDispatch, useSelector } from "react-redux";
import { handleGetAllCategory } from "../../store/category/handleCategory";
import { sortByQuantityProduct } from "../../utils/functions";
import {
  handleFilterProduct,
  handleGetAllSize,
} from "../../store/product/handleProduct";
import queryString from "query-string";
import Image from "../components/Image/Image";
const ShoppingPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { params } = useParams();

  const { control, handleSubmit, setValue } = useForm();
  const [errorPrice, setErrorPrice] = useState("");
  const [selectedKeys, setSelectedKeys] = useState();
  const [valueRate, setValueRate] = useState();

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(12);

  const handlePagination = (page, pageSize) => {
    setCurrentPage(page);
    setPageSize(pageSize);
  };

  const currentQueryParams = queryString.parse(location.search);

  const sizeFromParams =
    currentQueryParams?.sizes?.split(",")?.length > 0
      ? currentQueryParams.sizes.split(",").map((size) => parseInt(size, 10))
      : [];

  const maxPrice = currentQueryParams.maxPrice
    ? parseInt(currentQueryParams.maxPrice)
    : null;
  const minPrice = currentQueryParams.minPrice
    ? parseInt(currentQueryParams.minPrice)
    : null;
  const rate = currentQueryParams.rate
    ? parseInt(currentQueryParams.rate)
    : null;

  const handleSelectCategory = (selectedKeys, info) => {
    if (selectedKeys.length > 0) {
      setSelectedKeys(selectedKeys[0]);
      setValue("minPrice", "");
      setValue("maxPrice", "");
      setValueRate(null);
      navigate(`/shopping/${selectedKeys}`);
    } else {
      setSelectedKeys([parseInt(params)]);
    }
  };

  useEffect(() => {
    dispatch(handleGetAllCategory({ limit: LIMIT_HIGH }));
  }, [dispatch]);

  const dataAllCategory = useSelector(
    (state) => state.category.dataAllCategory.results
  );

  const sortDataAllCategory = sortByQuantityProduct(
    Array.isArray(dataAllCategory) ? dataAllCategory : [],
    true
  );

  const handleSubmitPrice = (data) => {
    const minPrice = parseInt(data.minPrice);
    const maxPrice = parseInt(data.maxPrice);

    if (!minPrice && !maxPrice) {
      return setErrorPrice("Vui Lòng Nhập Giá !");
    }

    if (minPrice > maxPrice) {
      return setErrorPrice("Vui Lòng khoảng giá phù hợp !");
    } else if (maxPrice < minPrice) {
      return setErrorPrice("Vui Lòng khoảng giá phù hợp !");
    } else {
      const currentQueryParams = queryString.parse(location.search);

      // const objPrice = {};
      // if (minPrice) {
      //   objPrice.minPrice = minPrice;
      // }

      // if (maxPrice) {
      //   objPrice.maxPrice = maxPrice;
      // }

      const newQueryParams = {
        ...currentQueryParams,
        minPrice: minPrice,
        maxPrice: maxPrice,
      };

      const linkPrice = queryString.stringifyUrl({
        url: location.pathname,
        query: newQueryParams,
      });
      navigate(linkPrice);
      return setErrorPrice("");
    }
  };

  // đổ data tree category
  const treeDataCate =
    sortDataAllCategory?.length > 0
      ? sortDataAllCategory.map((cate, index) => ({
          title: cate.name,
          key: cate.id,
          children:
            cate?.children?.length > 0
              ? cate?.children?.map((child, index) => ({
                  title: child.name,
                  key: child.id,
                  icon: ({ selected }) =>
                    selected ? (
                      <div className="mt-1">
                        {" "}
                        <Check size={"18px"} color="#70c1b3" />
                      </div>
                    ) : (
                      <Dot />
                    ),
                }))
              : [],
        }))
      : [];

  // change rate
  const handleChangeRate = (e) => {
    const currentQueryParams = queryString.parse(location.search);
    const newQueryParams = { ...currentQueryParams, rate: e.target.value };
    const linkRate = queryString.stringifyUrl({
      url: location.pathname,
      query: newQueryParams,
    });
    navigate(linkRate);
    setValueRate(rate);
  };

  // call api
  useEffect(() => {
    dispatch(
      handleFilterProduct({
        category: params === "all" ? "" : params,
        minPrice: minPrice,
        maxPrice: maxPrice,
        rate: rate,
        sizes: currentQueryParams.sizes,
        page: currentPage,
        limit: pageSize,
      })
    );
  }, [
    currentPage,
    currentQueryParams.sizes,
    dispatch,
    maxPrice,
    minPrice,
    pageSize,
    params,
    rate,
  ]);

  // khi load lại sẽ không mất value
  useEffect(() => {
    minPrice && setValue("minPrice", minPrice);
    maxPrice && setValue("maxPrice", maxPrice);
    rate && setValueRate(rate);
    params !== "all" && setSelectedKeys([parseInt(params)]);
  }, [maxPrice, minPrice, params, rate, setValue]);

  const { dataAllProduct } = useSelector((state) => state.product);

  //get size
  useEffect(() => {
    dispatch(handleGetAllSize());
  }, []);

  const { dataAllSize } = useSelector((state) => state.product);

  const toggleSizeSelection = (id) => {
    const newSelectedSizes = sizeFromParams.includes(id)
      ? sizeFromParams.filter((sizeId) => sizeId !== id)
      : [...sizeFromParams, id];

    const currentQueryParams = queryString.parse(location.search);

    let newQueryParams = { ...currentQueryParams };

    if (newSelectedSizes.length > 0) {
      newQueryParams.sizes = newSelectedSizes.join(",");
    } else {
      delete newQueryParams.sizes;
    }

    const linkRate = queryString.stringifyUrl({
      url: location.pathname,
      query: newQueryParams,
    });
    navigate(linkRate);
  };

  return (
    <div>
      <Gap>
        <div className="grid grid-cols-7 gap-x-5">
          <div className="col-span-2">
            <div className="flex flex-col gap-y-8">
              <Title
                title="Bộ Lọc Tìm Kiếm "
                className="text-[24px] font-semibold "
              ></Title>
              {/* DANH MỤC */}
              <div className="flex flex-col gap-y-2">
                <div className="flex items-baseline gap-x-2 mb-2">
                  <BadgeCheck color="#70c1b3" size={"16px"} />
                  <h1 className="capitalize   text-[18px] text-primary">
                    Theo Danh mục
                  </h1>
                </div>
                <Tree
                  style={{
                    fontSize: "18px",
                    color: "#000000",
                    textTransform: "capitalize",
                    fontWeight: "500",
                  }}
                  className="filterProduct font-body"
                  showIcon
                  defaultExpandAll={params === "all"}
                  defaultSelectedKeys={[parseInt(params)]}
                  defaultExpandedKeys={[parseInt(params)]}
                  selectedKeys={[parseInt(params)]}
                  expandedKeys={[parseInt(params)]}
                  autoExpandParent={true}
                  treeData={treeDataCate}
                  onSelect={handleSelectCategory}
                />
              </div>
              <Divider
                dashed
                style={{ backgroundColor: "#ccc", margin: "0" }}
              />
              {/* KHOẢNG GIÁ */}
              <div className="flex flex-col gap-y-2">
                <div className="flex items-baseline gap-x-2 mb-2">
                  <BadgeCheck color="#70c1b3" size={"16px"} />
                  <h1 className="capitalize   text-[18px] text-primary">
                    Theo Khoảng Giá
                  </h1>
                </div>

                <form
                  onSubmit={handleSubmit(handleSubmitPrice)}
                  className="flex flex-col gap-y-2"
                >
                  <div className="flex items-center gap-x-2 filterProduct">
                    <Input
                      control={control}
                      name="minPrice"
                      placeholder={` TỪ (VNĐ) 
                     
                      `}
                      type="number"
                    ></Input>
                    <Minus />
                    <Input
                      control={control}
                      name="maxPrice"
                      placeholder="ĐẾN (VNĐ)"
                      type="number"
                    ></Input>
                  </div>
                  {errorPrice && (
                    <span className="text-center block text-error">
                      {errorPrice}
                    </span>
                  )}

                  <Button
                    kind="secondary"
                    className="py-2 rounded transition hover:text-white hover:!bg-primary"
                    type="submit"
                  >
                    Áp dụng
                  </Button>
                </form>
              </div>
              <Divider
                dashed
                style={{ backgroundColor: "#ccc", margin: "0" }}
              />
              {/* ĐÁNH GIÁ */}
              <div className="flex flex-col gap-y-2">
                <div className="flex items-baseline gap-x-2 mb-2">
                  <BadgeCheck color="#70c1b3" size={"16px"} />
                  <h1 className="capitalize   text-[18px] text-primary">
                    Theo Đánh Giá
                  </h1>
                </div>
                <div>
                  <Radio.Group
                    onChange={handleChangeRate}
                    name="radiogroup"
                    defaultValue={valueRate}
                    value={valueRate}
                  >
                    <Space direction="vertical">
                      {dataRating.map((item) => (
                        <Radio key={item.id} value={item.id}>
                          <div className="flex items-center gap-x-2 ">
                            {item.stars.map((star, index) => (
                              <div key={index}>{star}</div>
                            ))}
                          </div>
                        </Radio>
                      ))}
                    </Space>
                  </Radio.Group>
                </div>
              </div>
              <Divider
                dashed
                style={{ backgroundColor: "#ccc", margin: "0" }}
              />
              {/* LỌC THEO SIZE */}
              <div>
                <div className="flex flex-col gap-y-2">
                  <div className="flex items-baseline gap-x-2 mb-2">
                    <BadgeCheck color="#70c1b3" size={"16px"} />
                    <h1 className="capitalize   text-[18px] text-primary">
                      Theo Size
                    </h1>
                  </div>

                  <div className=" grid grid-cols-3 gap-3">
                    {dataAllSize?.length > 0 &&
                      dataAllSize?.map((item) => (
                        <div
                          key={item.id}
                          onClick={() => toggleSizeSelection(item.id)}
                        >
                          <AttributeProduct
                            className={`max-w-[80px] !py-1 !px-3  uppercase cursor-pointer ${
                              sizeFromParams.includes(item.id)
                                ? " !border-primary !border-[2px] "
                                : ""
                            }`}
                            title={item?.description}
                          ></AttributeProduct>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-span-5 mt-10">
            {dataAllProduct?.totalResults <= 0 && (
              <div className="h-full flex items-start justify-center">
                <div>
                  <Image url="/cart_empty.png" className="w-[200px]"></Image>
                  <h1 className="text-center text-text3 text-[18px] mt-3">
                    Không có Sản Phẩm Nào
                  </h1>
                </div>
              </div>
            )}

            <div className="grid grid-cols-3 gap-6">
              {dataAllProduct?.results?.length > 0 &&
                dataAllProduct.results.map((product) => (
                  <ProductItem key={product.id} data={product}></ProductItem>
                ))}
            </div>

            {dataAllProduct?.totalPages > 1 && (
              <div className="flex items-center justify-center mt-[40px]">
                <Pagination
                  total={dataAllProduct?.totalResults}
                  defaultPageSize={pageSize}
                  defaultCurrent={currentPage}
                  onChange={handlePagination}
                />
              </div>
            )}
          </div>
        </div>
      </Gap>
    </div>
  );
};

export default ShoppingPage;
