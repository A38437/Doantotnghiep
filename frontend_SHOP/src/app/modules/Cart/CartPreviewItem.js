import React, { useState } from "react";
import AttributeInCart from "../Product/parts/AttributeInCart";
import Image from "../../components/Image/Image";
import TitleProduct from "../Product/parts/TitleProduct";
import ProHandleQuantityInCart from "./parts/ProHandleQuantityInCart";
import PriceProduct from "../Product/parts/PriceProduct";
import { useForm } from "react-hook-form";
import { Trash2, X } from "lucide-react";
import { Link } from "react-router-dom";
import { formatPrice } from "../../../utils/functions";
import { Popconfirm } from "antd";
import { useDispatch } from "react-redux";
import {
  handleDeleteCart,
  handleGetAllCart,
  handleUpdateCart,
} from "../../../store/cart/handleCart";
import { requestUpdateCart } from "../../../store/cart/requestCart";
import { toast } from "react-toastify";

const CartPreviewItem = ({ data }) => {
  const { control, setValue } = useForm();
  const dispatch = useDispatch();

  const [idProductDetails, setIdProductDetails] = useState();

  const [open, setOpen] = useState(false);
  const showPopconfirm = () => {
    setOpen(true);
  };
  const handleOk = () => {
    dispatch(handleDeleteCart(idProductDetails));
  };
  const handleCancel = () => {
    setOpen(false);
  };

  const handleQuantityChange = async (id, newQuantity, callBack) => {
    try {
      const response = await requestUpdateCart({
        productDetailsId: id,
        quantity: newQuantity,
      });
      if (response.status === 200) {
        callBack && callBack();
        dispatch(handleGetAllCart());
      }
    } catch (error) {
      toast.error(error?.response?.data?.ms, { autoClose: 800 });
    }
  };

  return (
    <div className=" border-b-2 border-text2 py-2">
      <div className="flex gap-x-3 items-start">
        <div className="flex items-center gap-x-3 flex-[6]">
          <Link>
            <Image
              url={data?.product?.image?.url}
              className="w-[90px] h-[120px] rounded-lg overflow-hidden"
            ></Image>
          </Link>

          <div className="flex flex-col gap-y-2">
            <Link>
              <TitleProduct className="font-medium text-[18px] limitText max-w-[190px] hover:text-primary transition-all">
                {data?.product?.name}
              </TitleProduct>
            </Link>
            <div className="flex items-center gap-x-3">
              {data?.productDetails?.properties?.size && (
                <AttributeInCart className="uppercase">
                  SIZE: {data?.productDetails?.properties?.size?.description}{" "}
                </AttributeInCart>
              )}

              {data?.productDetails?.properties?.color && (
                <AttributeInCart className="uppercase">
                  MÀU: {data?.productDetails?.properties?.color?.description}{" "}
                </AttributeInCart>
              )}
            </div>

            <ProHandleQuantityInCart
              control={control}
              name={`quantity_${data?.productDetails?.id}`}
              className="w-[100px] p-[6px]"
              quantity={data?.quantity}
              id={data?.productDetails?.id}
              onQuantityChange={handleQuantityChange}
              setValue={setValue}
            ></ProHandleQuantityInCart>

            <PriceProduct
              price={data?.product?.total}
              className="text-[20px] font-semibold"
            ></PriceProduct>
          </div>
        </div>

        <Popconfirm
          title="Xóa Sản Phẩm"
          description="Bạn có chắn muốn xóa ?"
          open={open}
          onConfirm={handleOk}
          onCancel={handleCancel}
        >
          <span
            className="mt-[4px]  cursor-pointer flex-1 hover:text-error transition-all"
            onClick={showPopconfirm}
          >
            <Trash2
              size={"18px"}
              onClick={() => setIdProductDetails(data?.productDetails?.id)}
            />
          </span>
        </Popconfirm>
      </div>
    </div>
  );
};

export default CartPreviewItem;
