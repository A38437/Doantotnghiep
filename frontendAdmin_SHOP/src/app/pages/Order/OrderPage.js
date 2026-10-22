import React, { useCallback, useEffect, useState } from "react";
import LayoutDetail from "../../components/Layout/LayoutDetail";
import {
  CircleX,
  Search,
  SquarePen,
  SquareX,
  Trash,
  Undo2,
} from "lucide-react";
import { Select, Table, Tag } from "antd";
import { convertDateNumeric, formatPrice } from "../../../utils/functions";
import { useDispatch, useSelector } from "react-redux";
import {
  handleBackStatusOrder,
  handleCancelOrder,
  handleGetAllOrder,
  handleUpdateStatusOrder,
} from "../../../store/order/handleOrder";
import { useForm } from "react-hook-form";
import Input from "../../components/Input/Input";
import { debounce } from "lodash";
import Swal from "sweetalert2";

const OrderPage = () => {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const { control, setValue } = useForm();
  const [idOrder, setIdOrder] = useState();
  const [statusOrder, setStatusOrder] = useState();

  useEffect(() => {
    dispatch(
      handleGetAllOrder({
        limit: pageSize,
        page: currentPage,
        orderId: idOrder,
        statusOrder: statusOrder,
      })
    );
  }, [currentPage, dispatch, idOrder, pageSize, statusOrder]);

  const { dataAllOrder } = useSelector((state) => state.order);

  const columns = [
    {
      title: "Mã Đơn Hàng",
      dataIndex: "id",
      key: "id",
      render: (id) => <h1>#{id}</h1>,
    },
    {
      title: "Ngày Tạo",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (createdAt) => (
        <h1 className="text-text1 font-semibold text-[16px]">
          {convertDateNumeric(createdAt)}
        </h1>
      ),
    },
    {
      title: "Thông Tin Đặt Hàng",
      dataIndex: "address",
      key: "address",
      width: "40%",
      // render: () => (
      //   <h1 className="text-text1 font-semibold text-[16px]">

      //   </h1>
      // ),
    },
    {
      title: "Thành Tiền (VNĐ)",
      dataIndex: "total",
      key: "total",
      render: (_, { total }) => (
        <div className="flex items-center gap-x-1">
          <h1>{formatPrice(total)} </h1>
          {/* <span className="text-text1 font-medium">( {5} sản phẩm ) </span> */}
        </div>
      ),
    },
    {
      title: "Trạng Thái",
      dataIndex: "status",
      key: "status",
      render: (_, { status }) => (
        <>
          {status === 0 && (
            <Tag className="py-1 px-4" color="red">
              Đã hủy
            </Tag>
          )}
          {status === 1 && (
            <Tag className="py-1 px-4" color="orange">
              Chờ Xác Nhận
            </Tag>
          )}
          {status === 2 && (
            <Tag className="py-1 px-4" color="cyan">
              Đã Xác Nhận
            </Tag>
          )}
          {status === 3 && (
            <Tag className="py-1 px-4 " color="blue">
              Đang Xử Lý
            </Tag>
          )}
          {status === 4 && (
            <Tag className="py-1 px-4 !cursor-pointer" color="purple">
              Đang Giao hàng
            </Tag>
          )}
          {status === 5 && (
            <Tag className="py-1 px-4" color="green">
              Đã Giao
            </Tag>
          )}
        </>
      ),
    },

    {
      title: "Hành Động",
      key: "action",
      render: ({ id, status }) => {
        return (
          <div
            className={`flex items-center gap-x-3 ${
              status === 5 || status === 0 ? "hidden" : ""
            }`}
          >
            <div
              className={`cursor-pointer hover:text-primary transition-all`}
              onClick={() => handleUpdateStatusOrderForm(id)}
            >
              <SquarePen size={"20px"} />
            </div>

            <div
              className={`cursor-pointer hover:text-primary transition-all ${
                status === 1 ? "hidden" : ""
              }`}
              onClick={() => handleBackStatusOrderForm(id)}
            >
              <Undo2 size={"20px"} />
            </div>

            <span
              className="cursor-pointer hover:text-error transition-all"
              onClick={() => handleCancelOrderForm(id)}
            >
              <SquareX size={"20px"} />
            </span>
          </div>
        );
      },
    },
  ];

  const data =
    dataAllOrder?.results?.length > 0 &&
    dataAllOrder.results?.map((item) => ({
      key: item.id,
      id: item.id,
      createdAt: item.createdAt,
      address: item?.deliveryAddress?.address,
      total: item.total,
      status: Number(item.orderState),
      action: item.id,
    }));

  const debouncedChangeHandler = useCallback(
    debounce((value) => {
      setIdOrder(value);
    }, 300), // Đặt thời gian debounce (ms)
    []
  );

  // Hàm xử lý onChange
  const handleChange = (e) => {
    debouncedChangeHandler(e.target.value);
  };

  const handleUpdateStatusOrderForm = (id) => {
    Swal.fire({
      title: `Cập nhật trạng thái đơn hàng #${id}`,
      icon: "info",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Cập nhật",
      cancelButtonText: "Hủy Bỏ",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(
          handleUpdateStatusOrder({
            id: id,
            callBack: () => {
              Swal.fire("Cập Nhật Thành Công!", "", "success");
              dispatch(handleGetAllOrder({ statusOrder: statusOrder }));
              setValue("orderId", "");
            },
          })
        );
      }
    });
  };
  const handleBackStatusOrderForm = (id) => {
    Swal.fire({
      title: `Quay lại trạng thái trước của đơn hàng #${id}`,
      icon: "info",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Cập nhật",
      cancelButtonText: "Hủy Bỏ",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(
          handleBackStatusOrder({
            id: id,
            callBack: () => {
              Swal.fire("Cập Nhật Thành Công!", "", "success");
              dispatch(handleGetAllOrder({ statusOrder: statusOrder }));
              setValue("orderId", "");
            },
          })
        );
      }
    });
  };

  const handleCancelOrderForm = (id) => {
    Swal.fire({
      title: `Hủy đơn hàng #${id}`,
      icon: "info",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Chắc Chắn",
      cancelButtonText: "Quay Lại",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(
          handleCancelOrder({
            id: id,
            callBack: () => {
              Swal.fire("Hủy đơn hàng thành công!", "", "success");
              dispatch(handleGetAllOrder({ statusOrder: statusOrder }));
              setValue("orderId", "");
            },
          })
        );
      }
    });
  };

  return (
    <LayoutDetail title="Danh Sách Đơn Hàng">
      <div className="mb-4 flex  items-center gap-x-4">
        <Input
          control={control}
          name="orderId"
          placeholder="Tìm kiếm theo mã đơn hàng..."
          className="!w-[500px]"
          kind="search"
          onChange={handleChange}
        >
          <Search size={"18px"} />
        </Input>
        <Select
          style={{ width: 250, height: 50 }}
          placeholder="Trạng Thái Đơn Hàng"
          onSelect={(value) => {
            setStatusOrder(value);
            setCurrentPage(1);
          }}
        >
          <Select.Option value="">
            <h1 className=" font-semibold">Tất Cả Đơn Hàng</h1>
          </Select.Option>
          <Select.Option value="0">
            <Tag className="py-1 px-4 w-[200px]" color="red">
              Đã hủy
            </Tag>
          </Select.Option>
          <Select.Option value="1">
            <Tag className="py-1 px-4 w-[200px]" color="orange">
              Chờ Xác Nhận
            </Tag>
          </Select.Option>
          <Select.Option value="2">
            <Tag className="py-1 px-4 w-[200px]" color="cyan">
              Đã Xác Nhận
            </Tag>
          </Select.Option>
          <Select.Option value="3">
            <Tag className="py-1 px-4 w-[200px] " color="blue">
              Đang Xử Lý
            </Tag>
          </Select.Option>
          <Select.Option value="4">
            <Tag className="py-1 px-4 w-[200px] !cursor-pointer" color="purple">
              Đang Giao hàng
            </Tag>
          </Select.Option>
          <Select.Option value="5">
            <Tag className="py-1 px-4 w-[200px] !cursor-pointer" color="green">
              Đã Giao hàng
            </Tag>
          </Select.Option>
        </Select>
      </div>
      <Table
        columns={columns}
        dataSource={data}
        className="text-text1 font-semibold text-[16px]"
        pagination={
          dataAllOrder.totalPages > 1
            ? {
                current: currentPage || 1,
                total: dataAllOrder.totalResults,
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

export default OrderPage;
