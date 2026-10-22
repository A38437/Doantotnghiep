import React, { useEffect } from "react";
import Gap from "../components/Commom/Gap";
import Box from "../components/Commom/Box";
import Image from "../components/Image/Image";
import NameUser from "../modules/User/parts/NameUser";
import LabelRedirect from "../components/Label/LabelRedirect";
import ContentUser from "../modules/User/parts/ContentUser";
import { Pagination, Space, Table, Tag } from "antd";
import DateCreateNews from "../modules/FashionNews/parts/DateCreateNews";
import PriceProduct from "../modules/Product/parts/PriceProduct";
import DateOrderProduct from "../modules/Product/parts/DateOrderProduct";
import { Epath } from "../routes/routerConfig";
import { useDispatch, useSelector } from "react-redux";
import { handleGetAllOrder } from "../../store/order/handleOrder";
import { convertDateNumeric } from "../../utils/functions";
import { useParams } from "react-router-dom";
import { defaultImage2 } from "../../utils/commom";

const UserDashboardPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(handleGetAllOrder({ limit: 5 }));
  }, []);

  const { dataAllOrder } = useSelector((state) => state.order);

  const { dataCurrentUser } = useSelector((state) => state.user);

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
      title: "Trạng Thái Giao Hàng",
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
            <Tag className="py-1 px-4" color="blue">
              Đang Xử Lý
            </Tag>
          )}
          {status === 4 && (
            <Tag className="py-1 px-4" color="purple">
              Đang Giao Hàng
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

  const dataOrderAll =
    dataAllOrder?.results?.length > 0
      ? dataAllOrder?.results?.map((order) => ({
          key: order.id,
          orderId: order.id,
          date: convertDateNumeric(order.createdAt),
          total: { price: order.total, quantityPro: order.OrderDetails.length },
          status: parseInt(order.orderState),
          action: { title: "Xem Chi Tiết", orderId: order.id },
        }))
      : [];

  return (
    <div>
      <div className="flex items-center gap-x-4">
        <Box isShowheader={false} className="flex-1">
          <div className="flex items-center gap-x-4 justify-center">
            <div className="flex   justify-center items-center flex-col gap-y-4">
              <Image
                url={dataCurrentUser?.avatar || defaultImage2}
                className="w-[160px] h-[160px] rounded-full overflow-hidden"
              ></Image>
              <NameUser name={dataCurrentUser?.userName}></NameUser>
              <LabelRedirect
                title="Chỉnh sửa thông tin "
                url={Epath.settingUser}
              ></LabelRedirect>
            </div>
          </div>
        </Box>

        <Box isShowheader={false} className="flex-1">
          <div className="flex flex-col  py-2">
            <h1 className="text-text3 uppercase text-[18px]">
              Địa chỉ giao hàng
            </h1>
            <div className="flex justify-center items-start flex-col gap-y-3 mt-2">
              <NameUser name={dataCurrentUser?.userName}></NameUser>
              <ContentUser>{dataCurrentUser?.email}</ContentUser>
              <ContentUser className="!text-text1 text-[16px]">
                {dataCurrentUser?.Addresses?.[0]?.address ||
                  " Nguyễn Trãi, Quận Thanh Xuân , Thành Phố Hà Nội"}
              </ContentUser>
              <ContentUser className="!text-text1 text-[16px]">
                {dataCurrentUser?.phoneNumber}
              </ContentUser>
            </div>
          </div>
        </Box>
      </div>
      <div className="mt-5">
        <Box
          title="Đơn hàng của tôi"
          url={`/myOrders/1`}
          labelRedirec="Xem thêm"
          isShowLabel
        >
          <Table
            columns={columns}
            dataSource={dataOrderAll}
            pagination={false}
          />
        </Box>
      </div>
    </div>
  );
};

export default UserDashboardPage;
