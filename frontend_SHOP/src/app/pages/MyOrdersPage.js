import React, { useEffect, useState } from "react";
import LabelRedirect from "../components/Label/LabelRedirect";
import { Table, Tabs, Tag } from "antd";
import DateOrderProduct from "../modules/Product/parts/DateOrderProduct";
import PriceProduct from "../modules/Product/parts/PriceProduct";
import Box from "../components/Commom/Box";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { handleGetAllOrder } from "../../store/order/handleOrder";
import { convertDateNumeric, formatPrice } from "../../utils/functions";

const MyOrdersPage = () => {
  const { statusOrder } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  const columns = [
    {
      title: "Mã Đơn",
      dataIndex: "orderId",
      key: "orderId",
      render: (text) => <h1 className="text-textBold font-normal">#{text}</h1>,
    },
    {
      title: "Ngày Đặt",
      dataIndex: "date",
      key: "date",
      render: (date) => <DateOrderProduct date={date}></DateOrderProduct>,
    },
    {
      title: "Tổng Tiền",
      dataIndex: "total",
      key: "total",
      render: (_, { total }) => (
        <div className="flex items-center gap-x-1">
          <PriceProduct price={total.price}></PriceProduct>
          <span className="text-text1 font-medium">
            ( {total.quantityPro} sản phẩm ){" "}
          </span>
        </div>
      ),
    },
    {
      title: "Trạng Thái",
      key: "status",
      dataIndex: "status",
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
      title: "",
      key: "action",
      dataIndex: "action",
      render: (_, { action }) => (
        <LabelRedirect
          url={`/myOrdersDetails/${action.orderId}`}
          title={action.title}
          icon=""
        ></LabelRedirect>
      ),
    },
  ];

  const items = [
    {
      key: "1",
      label: "Chờ Xác Nhận",
    },
    {
      key: "2",
      label: "Đã Xác Nhận",
    },
    {
      key: "3",
      label: "Đang Xử Lý",
    },
    {
      key: "4",
      label: "Đang Giao Hàng",
    },
    {
      key: "5",
      label: "Đã Giao Hàng",
    },
    {
      key: "0",
      label: "Đã Hủy",
    },
  ];

  const onChangeTabs = (key) => {
    navigate(`/myOrders/${key}`);
  };

  useEffect(() => {
    dispatch(
      handleGetAllOrder({
        statusOrder: statusOrder,
        limit: pageSize,
        page: currentPage,
      })
    );
  }, [currentPage, dispatch, pageSize, statusOrder]);

  // khi chuyển tabs khác phải reset về 1
  useEffect(() => {
    setCurrentPage(1);
  }, [statusOrder]);

  const { dataAllOrder } = useSelector((state) => state.order);

  const dataOrderAll =
    dataAllOrder?.results?.length > 0
      ? dataAllOrder?.results?.map((order) => ({
          key: order.id,
          orderId: order.id,
          date: convertDateNumeric(order.createdAt),
          total: {
            price: order?.OrderDetails?.reduce(
              (accumulator, currentValue) =>
                accumulator +
                currentValue.quantity *
                  parseFloat(formatPrice(currentValue?.price).replace(".", "")),
              0
            ),
            quantityPro: order.OrderDetails.length,
          },
          status: parseInt(order.orderState),
          action: { title: "Xem Chi Tiết", orderId: order.id },
        }))
      : [];

  return (
    <div>
      <Tabs
        activeKey={statusOrder ? statusOrder.toString() : "1"}
        items={items}
        className="tabsOrder text-textBold font-semibold  "
        onChange={onChangeTabs}
      />

      <Box title="Đơn hàng của tôi">
        <Table
          columns={columns}
          dataSource={dataOrderAll}
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
      </Box>
    </div>
  );
};

export default MyOrdersPage;
