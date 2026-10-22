import React, { useCallback, useEffect, useState } from "react";
import LayoutDetail from "../../components/Layout/LayoutDetail";
import { Epath } from "../../routes/routerConfig";
import { useDispatch, useSelector } from "react-redux";
import {
  handleDeleteProduct,
  handleGetAllProduct,
  handleRestoreProduct,
} from "../../../store/product/handleProduct";
import { Space, Switch, Table } from "antd";
import { defaultImage2 } from "../../../utils/commom";
import Image from "../../components/Image/Image";
import { FilePenLine, Search, Shirt, Trash } from "lucide-react";
import { formatPrice } from "../../../utils/functions";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import Input from "../../components/Input/Input";
import { debounce } from "lodash";
import { toast } from "react-toastify";

const ProductsPage = () => {
  const dispatch = useDispatch();
  const { control } = useForm();
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [namePro, setNamePro] = useState("");
  useEffect(() => {
    dispatch(
      handleGetAllProduct({ limit: pageSize, page: currentPage, name: namePro })
    );
  }, [currentPage, dispatch, namePro, pageSize]);

  const { dataAllProduct } = useSelector((state) => state.product);

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      render: (id) => <h1>#{id}</h1>,
    },
    {
      title: "Sản Phẩm",
      dataIndex: "product",
      key: "product",
      width: "50%",
      render: ({ name, url, id }) => (
        <Link
          to={`/productDetails/${id}`}
          className="flex items-center gap-x-4"
        >
          <Image
            url={url}
            className="w-[80px] h-[80px] rounded-lg overflow-hidden"
          ></Image>

          <h1 className="text-text1 font-semibold text-[16px] multiline-ellipsis max-w-[400px]">
            {name}
          </h1>
        </Link>
      ),
    },
    {
      title: "Giá (VNĐ)",
      dataIndex: "price",
      key: "price",
      render: (price) => (
        <h1 className="text-text1 font-semibold text-[16px]">
          {formatPrice(price)}
        </h1>
      ),
    },
    {
      title: "Đã Bán",
      dataIndex: "sold",
      key: "sold",
    },
    {
      title: "Trạng Thái",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <div>
          {" "}
          <Switch
            checkedChildren="Còn hàng"
            unCheckedChildren="Hết Hàng"
            defaultChecked={status?.deletedAt ? false : true}
            onChange={(checked) => onChangeStatus(checked, status.id)}
          />
        </div>
      ),
    },

    {
      title: "Hành Động",
      key: "action",
      render: ({ action }) => (
        <div className="flex items-center gap-x-3">
          {!action?.deletedAt && (
            <Link
              to={`/products/update/${action?.id}`}
              className="cursor-pointer hover:text-primary transition-all"
            >
              <FilePenLine size={"20px"} />
            </Link>
          )}
          {/* <h1>{status?.deletedAt}</h1> */}
          {/* <span className="cursor-pointer hover:text-error transition-all">
            <Trash size={"20px"} />
          </span> */}
        </div>
      ),
    },
  ];

  const data =
    dataAllProduct?.results?.length > 0
      ? dataAllProduct?.results?.map((pro) => ({
          key: pro.id,
          id: pro.id,
          product: {
            name: pro.name,
            url: pro?.image?.[0]?.url || defaultImage2,
            id: pro.id,
          },
          price: pro?.total,
          sold: pro?.sold,
          action: pro,
          status: pro,
        }))
      : [];

  const debouncedChangeHandler = useCallback(
    debounce((value) => {
      setNamePro(value);
    }, 300), // Đặt thời gian debounce (ms)
    []
  );

  // Hàm xử lý onChange
  const handleChange = (e) => {
    debouncedChangeHandler(e.target.value);
  };

  const onChangeStatus = (checked, id) => {
    if (checked) {
      dispatch(
        handleRestoreProduct({
          id: id,
          callBack: () => {
            toast.success("Cập nhật còn hàng thành công!", { autoClose: 800 });
          },
        })
      );
    } else {
      dispatch(
        handleDeleteProduct({
          id: id,
          callBack: () => {
            toast.success("Cập nhật hết hàng thành công!", { autoClose: 800 });
          },
        })
      );
    }
  };

  return (
    <LayoutDetail
      title="Danh Sách Sản Phẩm"
      titleBtn="Thêm Sản Phẩm"
      url={Epath.addproduct}
    >
      <div className="mb-4">
        <Input
          control={control}
          name="name"
          placeholder="Tìm kiếm sản phẩm..."
          className="!w-[500px]"
          kind="search"
          onChange={handleChange}
        >
          <Search size={"18px"} />
        </Input>
      </div>
      <Table
        columns={columns}
        dataSource={data}
        className="text-text1 font-semibold text-[16px]"
        pagination={
          dataAllProduct.totalPages > 1
            ? {
                current: currentPage || 1,
                total: dataAllProduct.totalResults,
                pageSize: pageSize,
                onChange: (page, pageSize) => {
                  setCurrentPage(page);
                  setPageSize(pageSize);
                },
              }
            : false
        }
      />
    </LayoutDetail>
  );
};

export default ProductsPage;
