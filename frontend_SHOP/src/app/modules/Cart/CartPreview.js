import { Drawer } from "antd";
import React, { useEffect, useState } from "react";
import CartPreviewItem from "./CartPreviewItem";
import { useForm } from "react-hook-form";
import ProHandleQuantityInCart from "./parts/ProHandleQuantityInCart";
import { ShoppingBag } from "lucide-react";
import PriceProduct from "../Product/parts/PriceProduct";
import Button from "../../components/Button/Button";
import { useDispatch, useSelector } from "react-redux";
import { handleGetAllCart } from "../../../store/cart/handleCart";
import { formatPrice } from "../../../utils/functions";
import Title from "../../components/Commom/Title";
import Image from "../../components/Image/Image";
import { Epath } from "../../routes/routerConfig";
import { defaultImage2 } from "../../../utils/commom";
import { saveArrayLS } from "../../../utils/localStorage";

const CartPreview = ({ openCartPreview, setOpenCartPreview }) => {
  const dispatch = useDispatch();
  const onClose = () => {
    setOpenCartPreview(false);
  };

  useEffect(() => {
    dispatch(handleGetAllCart());
  }, [dispatch]);

  const dataCartAll = useSelector((state) => state.cart.dataCartAll);

  // let str = formatPrice(data?.product?.total);
  // let number = parseFloat(str.replace(".", ""));

  const totalMoneyInCart = dataCartAll?.results?.reduce(
    (accumulator, currentValue) =>
      accumulator +
      currentValue.quantity *
        parseFloat(formatPrice(currentValue?.product?.total).replace(".", "")),
    0
  );

  const handleCheckout = () => {
    const dataProToCheckout =
      dataCartAll?.results?.length > 0 &&
      dataCartAll?.results.map((item) => ({
        idProductDetails: item.productDetails.id,
        quantity: item.quantity,
        price: item?.product?.total,
        name: item.product.name,
        url: item.product.image.url || defaultImage2,
        properties: {
          size: item?.productDetails?.properties?.size?.description || "",
          color: item?.productDetails?.properties?.color?.description || "",
        },
      }));

    saveArrayLS("dataProInCheckout", dataProToCheckout);
    onClose();
  };
  return (
    <div>
      <Drawer
        className="CartPreview "
        title={
          <div className="flex items-center gap-x-3">
            <ShoppingBag size={"22px"} />{" "}
            <p>
              Giỏ Hàng Của Tôi{" "}
              {dataCartAll?.results?.length > 0 &&
                `(${dataCartAll?.results?.length})`}{" "}
            </p>
          </div>
        }
        onClose={onClose}
        open={openCartPreview}
        width={400}
      >
        {dataCartAll?.results?.length > 0 ? (
          <div className="flex flex-col h-full">
            <div className="flex flex-col gap-y-3 max-h-[500px] overflow-y-auto flex-grow ">
              {dataCartAll?.results?.length > 0 &&
                dataCartAll.results.map((cart) => (
                  <CartPreviewItem data={cart} key={cart.id} />
                ))}
            </div>
            <div className="foot flex flex-col gap-y-3 mt-10  border-t-[1px] border-primary py-3 px-2 ">
              <div className="flex items-center justify-between">
                <h1 className="text-text1 text-[18px] font-medium">
                  Tổng Tiền:
                </h1>
                <PriceProduct
                  price={totalMoneyInCart}
                  className="text-[20px] font-semibold"
                ></PriceProduct>
              </div>
              <div className="flex items-center gap-x-4">
                {/* <Button className="py-3 px-4 rounded-md" kind="secondary">
                  Xem Giỏ Hàng
                </Button> */}

                <div className="w-full" onClick={handleCheckout}>
                  <Button
                    href={Epath.checkout}
                    type="submit"
                    className="py-3 px-4  rounded-md hover:text-[#FFF]"
                    kind="primary"
                  >
                    Thanh Toán
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="h-full flex items-center justify-center">
            <div>
              <Image url="/cart_empty.png" className="w-[200px]"></Image>
              <h1 className="text-center text-text3 text-[18px] mt-3">
                Không có Sản Phẩm Nào
              </h1>
            </div>
          </div>
        )}
      </Drawer>
    </div>
  );
};

export default CartPreview;
