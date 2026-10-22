import React, { useEffect } from "react";
import { formatPrice } from "../../utils/functions";
import { getArrayFromLS } from "../../utils/localStorage";
import { BadgeCheck, ShoppingBag, WalletMinimal } from "lucide-react";
import Title from "../components/Commom/Title";
import ProductHozizontal from "../modules/Product/ProductHozizontal";
import PriceProduct from "../modules/Product/parts/PriceProduct";
import Gap from "../components/Commom/Gap";
import Button from "../components/Button/Button";
import { useDispatch } from "react-redux";
import {
  handleOrderProduct,
  handleUpdateStatuslOrderPayment,
} from "../../store/order/handleOrder";
import { useLocation } from "react-router-dom";
import queryString from "query-string";
import { statusPayment } from "../../utils/commom";

const PaymentSuccessPage = () => {
  const dispatch = useDispatch();
  const dataProInCheckout = getArrayFromLS("dataProInCheckout");
  const location = useLocation();
  const parsedSearch = queryString.parse(location.search);

  const totalMoneyCheckout = dataProInCheckout?.reduce(
    (accumulator, currentValue) =>
      accumulator +
      currentValue.quantity *
        parseFloat(formatPrice(currentValue.price).replace(".", "")),
    0
  );

  useEffect(() => {
    if (
      parsedSearch.code === "00" &&
      parsedSearch.orderCode &&
      parsedSearch.status === statusPayment.PAID
    ) {
      dispatch(handleUpdateStatuslOrderPayment(parsedSearch.orderCode));
    }
  }, []);

  return (
    <Gap>
      <div className="flex items-center justify-center my-5">
        <div className="flex flex-col items-center gap-y-2">
          <BadgeCheck size={"60px"} color="#70c1b3" />
          <h1 className="font-semibold text-[35px] text-primary">
            THANH TOÁN THÀNH CÔNG
          </h1>
        </div>
      </div>
      <div className="">
        <div className="border-[1px] border-text3 py-3 px-4 rounded-lg ">
          <div className=" pt-3 pb-5 flex items-center gap-x-3 ">
            <ShoppingBag />

            <Title
              title="Sản Phẩm"
              className="text-[24px] font-semibold"
            ></Title>
          </div>
          <div className="flex scroll-hidden flex-col gap-y-3 max-h-[400px] overflow-y-auto">
            {dataProInCheckout?.length > 0 &&
              dataProInCheckout.map((item, index) => (
                <ProductHozizontal
                  key={index}
                  data={item}
                  maxWidth="max-w-[850px]"
                ></ProductHozizontal>
              ))}
          </div>

          <div>
            <div className="flex items-center justify-between pt-6  border-b-[3px] border-text2">
              <Title
                title="Tổng Tiền"
                className="text-[17px] font-normal"
              ></Title>
              <PriceProduct price={totalMoneyCheckout}></PriceProduct>
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
              <PriceProduct price={totalMoneyCheckout}></PriceProduct>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-x-3 mt-4">
          <Button
            className="!py-2 !px-5 rounded-md bg-error text-white hover:opacity-80"
            href="/"
          >
            Trở về
          </Button>
          <Button
            kind="primary"
            className="!py-2 !px-5 rounded-md hover:opacity-80"
            href="/shopping/all"
          >
            Tiếp Tục Mua sắm
          </Button>
        </div>
      </div>
    </Gap>
  );
};

export default PaymentSuccessPage;
