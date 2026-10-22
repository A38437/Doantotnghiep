import React, { Fragment, useEffect, useRef, useState } from "react";
import Box from "../components/Commom/Box";
import NameUser from "../modules/User/parts/NameUser";
import ContentUser from "../modules/User/parts/ContentUser";
import Title from "../components/Commom/Title";
import PriceProduct from "../modules/Product/parts/PriceProduct";
import { Form, Modal, Radio, Space, Steps, Table, Tag } from "antd";
import { Dot, MessageSquareCode, Smile } from "lucide-react";
import LabelRedirect from "../components/Label/LabelRedirect";
import DateOrderProduct from "../modules/Product/parts/DateOrderProduct";
import { dataRating, defaultImage2, statusPayment } from "../../utils/commom";
import Image from "../components/Image/Image";
import TitleProduct from "../modules/Product/parts/TitleProduct";
import AttributeInCart from "../modules/Product/parts/AttributeInCart";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  handleCancelOrder,
  handleCancelOrderPayment,
  handleGetDetailsOrder,
  handleGetOrderPayment,
} from "../../store/order/handleOrder";
import Button from "../components/Button/Button";
import { Epath } from "../routes/routerConfig";
import Swal from "sweetalert2";
import { saveArrayLS } from "../../utils/localStorage";
import ReactToPrint from "react-to-print";
import InvoiceComponent from "../components/Invoice/InvoiceComponent";
import {
  handleGetDetailsProduct,
  handleReviewProduct,
} from "../../store/product/handleProduct";
import { useForm } from "react-hook-form";
import TextArea from "../components/Input/TextArea";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import { parseISO, addHours, addMinutes, addDays, isAfter } from "date-fns";
import { formatPrice } from "../../utils/functions";
const InfoReviewSchema = yup.object().shape({
  description: yup.string().required("Đánh giá không được để trống"),
});

const OrderDetailsPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(InfoReviewSchema),
    mode: "onChange",
  });
  const invoiceRef = useRef();
  const { id } = useParams();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [idProduct, setIdProduct] = useState();
  const [valueRate, setValueRate] = useState(5);
  const [canRate, setCanRate] = useState(true);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setValue("description", "");
    setValueRate(5);
  };

  useEffect(() => {
    dispatch(handleGetDetailsOrder(id));
    dispatch(handleGetOrderPayment(id));
  }, [id, dispatch]);

  useEffect(() => {
    if (idProduct) {
      dispatch(handleGetDetailsProduct(idProduct));
    }
  }, [dispatch, idProduct]);

  const { dataOrderPayment } = useSelector((state) => state.order);

  const { dataDetailsOrder } = useSelector((state) => state.order);

  const createdAt = dataDetailsOrder?.createdAt || "";

  const { dataDetailsProduct } = useSelector((state) => state.product);

  const dataTableProduct =
    dataDetailsOrder?.OrderDetails?.length > 0
      ? dataDetailsOrder?.OrderDetails?.map((product) => ({
          key: product.id,
          product: {
            url:
              product?.ProductDetail?.Product?.image?.[0]?.url || defaultImage2,
            name: product?.ProductDetail?.Product?.name,
            size: product?.properties?.size?.description || "",
            color: product?.properties?.color?.description || "",
          },
          price: parseFloat(formatPrice(product?.price).replace(".", "")),
          quantity: product?.quantity,
          total:
            parseFloat(formatPrice(product?.price).replace(".", "")) *
            product?.quantity,
          proId: product?.ProductDetail?.Product?.id,
        }))
      : [];

  const totalMoneyOrder = dataTableProduct?.reduce(
    (accumulator, currentValue) => accumulator + currentValue.total,
    0,
  );

  //--- lưu trong hóa đơn

  const formatDataPro =
    dataTableProduct?.length > 0 &&
    dataTableProduct.map((item) => ({
      key: item.key,
      url: item?.product?.url,
      name: item?.product?.name,
      product: {
        size: item?.product?.size || "",
        color: item?.product?.color || "",
      },
      price: item?.price,
      quantity: item?.quantity,
      total: item.total,
    }));

  const dataInvoice = {
    address: dataDetailsOrder?.deliveryAddress?.address,
    arrPro: formatDataPro,
    paymentMethod:
      dataDetailsOrder?.PaymentMethodUser?.PaymentMethodSystem?.name,
    status: dataOrderPayment.status,
  };
  saveArrayLS("dataInvoice", dataInvoice);

  //-------------------------------------

  const columns =
    dataDetailsOrder.orderState === "5"
      ? [
          {
            title: "Sản Phẩm",
            dataIndex: "product",
            key: "product",
            render: (_, { product, proId }) => (
              <Link
                to={`/product/${proId}`}
                className="flex items-start gap-x-3"
              >
                <div className="flex-1">
                  <Image
                    className="w-[80px] h-[80px] rounded-lg overflow-hidden"
                    url={product?.url}
                  ></Image>
                </div>
                <div className="flex flex-col flex-[2]">
                  <TitleProduct className="text-textBold font-medium max-w-[200px]">
                    {product?.name}
                  </TitleProduct>

                  {product.size && (
                    <AttributeInCart className="uppercase">
                      SIZE: {product.size}
                    </AttributeInCart>
                  )}
                  {product.color && (
                    <AttributeInCart className="uppercase">
                      COLOR: {product.color}
                    </AttributeInCart>
                  )}
                </div>
              </Link>
            ),
            width: 300,
          },
          {
            title: "Giá",
            dataIndex: "price",
            key: "price",
            render: (_, { price }) => {
              return <PriceProduct price={price}></PriceProduct>;
            },
          },
          {
            title: "Số Lượng",
            key: "quantity",
            dataIndex: "quantity",
            render: (_, { quantity }) => {
              return (
                <h1 className="text-textBold text-[15px] font-medium">
                  {quantity}
                </h1>
              );
            },
          },
          {
            title: "Tổng Tiền",
            key: "total",
            dataIndex: "total",
            render: (_, { total }) => {
              return <PriceProduct price={total}></PriceProduct>;
            },
          },
          {
            title: "Đánh Giá",
            key: "review",
            dataIndex: "review",
            align: "center",

            render: (_, { proId }) => (
              <div
                className={`flex items-center justify-center cursor-pointer transition-all hover:text-primary ${
                  !canRate && "hidden"
                } `}
                onClick={() => {
                  showModal();
                  setIdProduct(proId);
                }}
              >
                <MessageSquareCode />
              </div>
            ),
          },
        ]
      : [
          {
            title: "Sản Phẩm",
            dataIndex: "product",
            key: "product",
            render: (_, { product }) => (
              <div className="flex items-start gap-x-3">
                <div className="flex-1">
                  <Image
                    className="w-[80px] h-[80px] rounded-lg overflow-hidden"
                    url={product?.url}
                  ></Image>
                </div>
                <div className="flex flex-col flex-[2]">
                  <TitleProduct className="text-textBold font-medium max-w-[200px]">
                    {product?.name}
                  </TitleProduct>

                  {product.size && (
                    <AttributeInCart className="uppercase">
                      SIZE: {product.size}
                    </AttributeInCart>
                  )}
                  {product.color && (
                    <AttributeInCart className="uppercase">
                      COLOR: {product.color}
                    </AttributeInCart>
                  )}
                </div>
              </div>
            ),
            width: 300,
          },
          {
            title: "Giá",
            dataIndex: "price",
            key: "price",
            render: (_, { price }) => {
              return <PriceProduct price={price}></PriceProduct>;
            },
          },
          {
            title: "Số Lượng",
            key: "quantity",
            dataIndex: "quantity",
            render: (_, { quantity }) => {
              return (
                <h1 className="text-textBold text-[15px] font-medium">
                  {quantity}
                </h1>
              );
            },
          },
          {
            title: "Tổng Tiền",
            key: "total",
            dataIndex: "total",
            render: (_, { total }) => {
              return <PriceProduct price={total}></PriceProduct>;
            },
          },
        ];

  const handleChangeRate = (e) => {
    setValueRate(e.target.value);
  };
  const handleReviewProductForm = (data) => {
    const formData = {
      idOrder: id,
      idProduct: idProduct,
      description: data.description,
      rate: valueRate.toString(),
      callBack: () => {
        toast.success("Đánh Giá Thành Công!", { autoClose: 800 });
        navigate(`/product/${idProduct}`);
      },
    };
    dispatch(handleReviewProduct(formData));
  };

  // check sau thời gian  2 ngày sẽ không đánh giá được nữa

  useEffect(() => {
    const checkTime = () => {
      const createdAtDate = parseISO(createdAt);
      // const limitDate = addMinutes(createdAtDate, 1); // Thêm 1 phút
      const limitDate = addDays(createdAtDate, 2); // Thêm 2 ngày
      const now = new Date();

      if (isAfter(now, limitDate)) {
        //kiểm tra xem thời gian hiện tại (now) đã vượt qua thời gian giới hạn (limitDate) chưa
        setCanRate(false);
      }
    };

    checkTime();

    // const interval = setInterval(checkTime, 1000); // Kiểm tra lại mỗi giây
    const interval = setInterval(checkTime, 60000); // Kiểm tra lại mỗi phút
    return () => clearInterval(interval);
  }, [createdAt]);

  return (
    <div>
      <>
        <Modal
          title="Đánh Giá Sản Phẩm"
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
          okText="Đánh Giá"
          cancelText="Hủy Bỏ"
          width={"800px"}
          footer={null}
        >
          <form onSubmit={handleSubmit(handleReviewProductForm)}>
            <div className="flex flex-col gap-y-4">
              <div className="flex items-start gap-x-6 ">
                <div className="">
                  <Image
                    className="w-[80px] h-[80px] rounded-lg overflow-hidden"
                    url={dataDetailsProduct?.image?.[0]?.url}
                  ></Image>
                </div>
                <div className="flex flex-col  justify-center">
                  <TitleProduct className="text-textBold text-[18px] font-medium max-w-[350px]">
                    {dataDetailsProduct?.name}
                  </TitleProduct>

                  <PriceProduct
                    className="text-[22px] font-semibold"
                    price={dataDetailsProduct?.total}
                  ></PriceProduct>
                </div>
              </div>
              <div>
                <div>
                  <Radio.Group
                    onChange={handleChangeRate}
                    name="radiogroup"
                    defaultValue={5}
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
              <div>
                <TextArea
                  placeholder="Hãy để lại đánh giá của bạn về sản phẩm !"
                  control={control}
                  name="description"
                ></TextArea>
                {errors?.description?.message && (
                  <h1 className="ml-2 text-error">
                    {errors?.description?.message}
                  </h1>
                )}
              </div>
            </div>
            <div className="flex items-center gap-x-2 justify-end">
              <Button
                kind="discard"
                type="submit"
                className="!py-2 !px-4 rounded-md hover:bg-error hover:text-white transition-all"
                onClick={handleCancel}
              >
                Hủy Bỏ
              </Button>
              <Button
                type="submit"
                className="!py-2 !px-4 rounded-md hover:opacity-80"
                kind="primary"
              >
                Đánh Giá
              </Button>
            </div>
          </form>
        </Modal>
      </>
      <div className="hidden">
        <InvoiceComponent ref={invoiceRef} />
      </div>

      <Box
        title="Chi Tiết Đơn Hàng"
        labelRedirec="Quay lại"
        url={Epath.userDashboard}
        isShowLabel
      >
        <div className="flex justify-end gap-x-3">
          {dataDetailsOrder.orderState === "5" ||
          dataOrderPayment.status === statusPayment.PAID ? (
            <ReactToPrint
              trigger={() => (
                <Button className="my-2 !py-1 !px-3 text-sm rounded-md bg-primary text-white">
                  In Hóa Đơn
                </Button>
              )}
              content={() => invoiceRef.current}
            />
          ) : (
            ""
          )}
          {dataDetailsOrder.orderState === "1" && (
            <Button
              className="my-2 !py-1 !px-3 text-sm rounded-md bg-error text-white"
              onClick={() =>
                Swal.fire({
                  title: `Bạn có chắc chắn muốn hủy đơn hàng ?`,
                  icon: "warning",
                  showCancelButton: true,
                  confirmButtonColor: "#3085d6",
                  cancelButtonColor: "#d33",
                  confirmButtonText: "Chắc Chắn",
                  cancelButtonText: "Hủy Bỏ",
                }).then((result) => {
                  if (result.isConfirmed) {
                    dispatch(
                      handleCancelOrder({
                        id: dataDetailsOrder?.id,
                        callBack: () => {
                          navigate("/myOrders/0");
                        },
                      }),
                    );
                    dispatch(
                      handleCancelOrderPayment({
                        id: dataOrderPayment?.orderCode,
                      }),
                    );
                  }
                })
              }
            >
              Hủy Đơn Hàng
            </Button>
          )}
        </div>
        <div className="flex items-center gap-x-3">
          <Box isShowheader={false} className="flex-1">
            <div className="flex flex-col  py-2">
              <h1 className="text-text3 uppercase text-[18px]">
                Địa chỉ giao hàng
              </h1>
              <div className="flex justify-center items-start flex-col gap-y-3 mt-2">
                <NameUser name={dataDetailsOrder?.User?.userName}></NameUser>
                <ContentUser>ttqshop682@gmail.com</ContentUser>
                <ContentUser className="!text-text1 text-[16px]">
                  {dataDetailsOrder?.deliveryAddress?.address}
                </ContentUser>
                <ContentUser className="!text-text1 text-[16px]">
                  {dataDetailsOrder?.User?.phoneNumber}
                </ContentUser>
              </div>
            </div>
          </Box>
          <Box isShowheader={false} className="flex-1">
            <div className="flex flex-col  py-2">
              {/* <h1 className="text-text3 uppercase text-[18px]">
                Địa chỉ giao hàng
              </h1> */}
              <h1>
                Mã Đơn:{" "}
                <span className="inline-block text-textBold font-semibold">
                  #{dataDetailsOrder?.id}
                </span>
              </h1>
              <div className="mt-1 flex items-center gap-x-3">
                <span>
                  {
                    dataDetailsOrder?.PaymentMethodUser?.PaymentMethodSystem
                      ?.name
                  }
                </span>
                {dataDetailsOrder?.PaymentMethodUser?.PaymentMethodSystem
                  ?.id === 2 && (
                  <Fragment>
                    <Dot />
                    <h1
                      className={`block ${
                        dataOrderPayment?.status === statusPayment.PAID &&
                        "text-primary"
                      } 
                  ${
                    dataOrderPayment?.status === statusPayment.PENDING &&
                    "text-orange-400"
                  } 

                   ${
                     dataOrderPayment?.status === statusPayment.PROCESSING &&
                     "text-blue-500"
                   } 

                       ${
                         dataOrderPayment?.status === statusPayment.CANCELLED &&
                         "text-error"
                       } 
                   font-semibold `}
                    >
                      {dataOrderPayment?.status === statusPayment.PENDING
                        ? "Chờ Thanh Toán"
                        : dataOrderPayment?.status === statusPayment.PAID
                          ? "Đã Thanh Toán"
                          : dataOrderPayment?.status === statusPayment.CANCELLED
                            ? "Đã Hủy"
                            : ""}
                    </h1>
                  </Fragment>
                )}
              </div>
              <div>
                <div className="flex items-center justify-between pt-6  border-b-[3px] border-text2">
                  <Title
                    title="Tổng Tiền"
                    className="text-[17px] font-normal"
                  ></Title>
                  <PriceProduct price={totalMoneyOrder}></PriceProduct>
                </div>
                <div className="flex items-center justify-between pt-6  border-b-[3px] border-text2">
                  <Title
                    title="Phí Ship"
                    className="text-[17px] font-normal"
                  ></Title>
                  <h1>Miễn Phí</h1>
                </div>
                <div className="flex items-center justify-between pt-6 pb-3 ">
                  <Title
                    title="Tổng Tiền"
                    className="text-[17px] font-normal"
                  ></Title>
                  <PriceProduct price={totalMoneyOrder}></PriceProduct>
                </div>

                {dataOrderPayment?.status === statusPayment.PENDING && (
                  <div className="flex items-center justify-center ">
                    <Button
                      href={`https://pay.payos.vn/web/${dataOrderPayment?.id}/`}
                      className="!py-2 !px-4 bg-primary text-white rounded-lg w-full transition-all hover:opacity-80"
                    >
                      Thanh Toán Ngay
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </Box>
        </div>

        <div className="mt-12 mb-[60px]">
          {dataDetailsOrder?.orderState !== "0" ? (
            <Steps
              className="text-text1 font-medium"
              size="small"
              current={parseInt(dataDetailsOrder?.orderState - 1)}
              items={[
                {
                  title: "Đã Xác Nhận",
                },
                {
                  title: "Đang Xử Lý",
                },
                {
                  title: "Đang Giao hàng",
                },
                {
                  title: `Giao Hàng Thành Công 😍`,
                  // icon: <Smile></Smile>,
                },
              ]}
            />
          ) : (
            <h1 className="text-center text-error font-semibold">
              Đơn hàng đã bị Hủy
            </h1>
          )}
        </div>
        <div>
          <Table
            columns={columns}
            dataSource={dataTableProduct}
            pagination={false}
            scroll={{ y: 400 }}
          />
        </div>
      </Box>
    </div>
  );
};

export default OrderDetailsPage;
