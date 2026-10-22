import React, { useEffect, useState } from "react";
import Gap from "../../components/Commom/Gap";
import Tabs from "../../components/Tabs/Tabs";
import { useDispatch, useSelector } from "react-redux";
import {
  handleGetTopDiscountProduct,
  handleGetTopSoldProduct,
} from "../../../store/product/handleProduct";

import ProductItem from "../../modules/Product/ProductItem";
import { Pagination } from "antd";
import { useLocation, useParams } from "react-router-dom";
import { getVariablesLC, saveVariablesLC } from "../../../utils/localStorage";

const CombineProductsPage = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const [activeTabs, setActiveTabs] = useState(
    parseInt(getVariablesLC("tabsCombinePro")) || 1
  );

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(12);

  const [currentPage2, setCurrentPage2] = useState(1);
  const [pageSize2, setPageSize2] = useState(5);

  const handleSwitchTabs = (id) => {
    setActiveTabs(id);
    saveVariablesLC("tabsCombinePro", id);
  };

  useEffect(() => {
    dispatch(handleGetTopSoldProduct({ limit: pageSize, page: currentPage }));
    dispatch(
      handleGetTopDiscountProduct({
        topDisCount: 80,
        limit: pageSize2,
        page: currentPage2,
      })
    );

    // Cleanup function to run when the component is unmounted
    return () => {
      saveVariablesLC("tabsCombinePro", 1);
      // saveVariablesLC("currentPage_combinePro", 1);
      // saveVariablesLC("currentPage2_combinePro", 1);
    };
  }, [currentPage, currentPage2, dispatch, pageSize, pageSize2]);

  const dataTopSoldProduct = useSelector(
    (state) => state.product.dataTopSoldProduct
  );

  const datTopDiscountProduct = useSelector(
    (state) => state.product.dataTopDiscountProduct
  );

  const onChange = (page, pageSize) => {
    setCurrentPage(page);
    setPageSize(pageSize);
    // saveVariablesLC("currentPage_combinePro", page);
  };

  const onChange2 = (page, pageSize) => {
    setCurrentPage2(page);
    setPageSize2(pageSize);
    // saveVariablesLC("currentPage2_combinePro", page);
  };

  return (
    <div>
      <div className="flex items-center justify-center">
        <Tabs
          title1="Sản Phẩm Bán Chạy"
          title2="Sản Phẩm Siêu Giảm Giá"
          activeTabs={activeTabs}
          onChange={handleSwitchTabs}
        ></Tabs>
      </div>

      <Gap>
        {activeTabs === 1 && (
          <div className="mt-[60px]">
            <div className="grid grid-cols-4 gap-x-5 gap-y-10">
              {dataTopSoldProduct?.results?.length > 0 &&
                dataTopSoldProduct?.results.map((product) => (
                  <ProductItem key={product.id} data={product}></ProductItem>
                ))}
            </div>

            {dataTopSoldProduct?.totalPages > 1 && (
              <div className="flex items-center justify-end mt-[40px]">
                <Pagination
                  total={dataTopSoldProduct?.totalResults}
                  defaultPageSize={pageSize}
                  defaultCurrent={1}
                  onChange={onChange}
                />
              </div>
            )}
          </div>
        )}
        {activeTabs === 2 && (
          <div className="mt-[60px]">
            <div className="grid grid-cols-4 gap-x-5 gap-y-10">
              {datTopDiscountProduct?.results?.length > 0 &&
                datTopDiscountProduct?.results.map((product) => (
                  <ProductItem key={product.id} data={product}></ProductItem>
                ))}
            </div>

            {datTopDiscountProduct?.totalPages > 1 && (
              <div className="flex items-center justify-end mt-[40px]">
                <Pagination
                  total={datTopDiscountProduct.totalResults}
                  defaultPageSize={pageSize2}
                  defaultCurrent={1}
                  onChange={onChange2}
                />
              </div>
            )}
          </div>
        )}
      </Gap>
    </div>
  );
};

export default CombineProductsPage;
