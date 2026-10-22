import React, { Fragment, useRef } from "react";
import { getArrayFromLS } from "../../../utils/localStorage";
import { defaultImage2, statusPayment } from "../../../utils/commom";
import Image from "../Image/Image";
import TitleProduct from "../../modules/Product/parts/TitleProduct";
import AttributeInCart from "../../modules/Product/parts/AttributeInCart";
import PriceProduct from "../../modules/Product/parts/PriceProduct";
import Title from "../Commom/Title";
import { Divider, Table } from "antd";
import { convertDateNumeric } from "../../../utils/functions";

const InvoiceComponent = React.forwardRef((props, ref) => {
  const dataProInCheckout = getArrayFromLS("dataInvoice");

  const dataTableProduct =
    dataProInCheckout?.arrPro?.length > 0
      ? dataProInCheckout?.arrPro.map((product, index) => ({
          key: index,
          product: {
            url: product?.url || defaultImage2,
            name: product?.name,
            size: product?.product?.size || "",
            color: product?.product?.color || "",
          },
          price: product?.price,
          quantity: product?.quantity,
          total: product?.price * product?.quantity,
        }))
      : [];

  const TotalInvoice = dataTableProduct.reduce(
    (accumulator, currentValue) => accumulator + currentValue.total,
    0,
  );

  const columns = [
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
          <h1 className="text-textBold text-[15px] font-medium">{quantity}</h1>
        );
      },
    },
    {
      title: "Tổng Tiền",
      key: "action",
      dataIndex: "total",
      render: (_, { total }) => {
        return <PriceProduct price={total}></PriceProduct>;
      },
    },
  ];

  return (
    <div ref={ref} className="py-4 px-8 flex flex-col">
      <div className="headInvoice flex justify-between items-center">
        <div className="flex flex-col">
          <h1 className="text-textBold font-semibold text-[20px]">Hóa Đơn</h1>
          <span>{convertDateNumeric(new Date())}</span>
        </div>
        <div className="flex flex-col gap-y-2">
          <Image className="w-[140px] h-[140px]" url="/logo3.png"></Image>
          <Title title="Thành Phố Hà Nội"></Title>
          <Title
            className="text-[20px] font-normal"
            title="Quận Thanh Xuân"
          ></Title>
          <Title
            className="text-[18px] font-normal"
            title="Ngõ 55 Chính Kinh"
          ></Title>
        </div>
      </div>
      <div className="bodyInvoice flex-grow">
        <Divider style={{ backgroundColor: "#F3F4F6" }}></Divider>
        <div>
          <div className="flex items-center justify-center my-4">
            <Title
              className="text-center text-[28px] font-semibold"
              title="HÓA ĐƠN THANH TOÁN"
            ></Title>
          </div>

          <div>
            <div>
              <Title
                className="text-[20px] font-medium"
                title="Địa chỉ đến:"
              ></Title>
              <span className="text-text3">{dataProInCheckout?.address}</span>
            </div>
            <div className="mt-6 mb-4">
              <Title
                className="text-[20px] font-medium "
                title="Các Sản Phẩm:"
              ></Title>
            </div>

            <div>
              <Table
                columns={columns}
                dataSource={dataTableProduct}
                pagination={false}
              />
              <div className="mt-4 flex items-center gap-x-2">
                <Title
                  className="text-[20px] !text-text1 font-normal"
                  title="Tổng Tiền: "
                ></Title>
                <PriceProduct
                  className="text-[22px] font-semibold"
                  price={TotalInvoice}
                ></PriceProduct>
              </div>

              <div className="mt-4 flex items-center gap-x-2">
                <Title
                  className="text-[18px] !text-text1 font-normal"
                  title="Phương thức thanh toán: "
                ></Title>
                <p className="font-semibold">
                  {dataProInCheckout?.paymentMethod}
                </p>
              </div>
              {dataProInCheckout.status && (
                <div className="mt-4 flex items-center gap-x-2 ">
                  <Title
                    className="text-[18px] !text-text1 font-normal"
                    title="Trạng Thái: "
                  ></Title>

                  <Fragment>
                    <h1
                      className={`block ${
                        dataProInCheckout.status === statusPayment.PAID &&
                        "text-primary"
                      } 
                  ${
                    dataProInCheckout.status === statusPayment.PENDING &&
                    "text-orange-400"
                  } 

                   ${
                     dataProInCheckout.status === statusPayment.PROCESSING &&
                     "text-blue-500"
                   } 

                       ${
                         dataProInCheckout.status === statusPayment.CANCELLED &&
                         "text-error"
                       } 
                   font-semibold `}
                    >
                      {dataProInCheckout.status === statusPayment.PENDING
                        ? "Chờ Thanh Toán"
                        : dataProInCheckout.status === statusPayment.PAID
                          ? "Đã Thanh Toán"
                          : dataProInCheckout.status === statusPayment.CANCELLED
                            ? "Đã Hủy"
                            : ""}
                    </h1>
                  </Fragment>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {/* <div className="footInvoice mt-auto flex flex-col justify-center items-center">
        <Divider style={{ backgroundColor: "#F3F4F6" }}></Divider>
        <span className="text-text3 text-center">
          TTQ SHOP cảm ơn quý khách hàng !
        </span>
      </div> */}
    </div>
  );
});

export default InvoiceComponent;
