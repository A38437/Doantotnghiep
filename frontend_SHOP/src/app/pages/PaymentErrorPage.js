import React, { useEffect } from "react";
import Gap from "../components/Commom/Gap";
import { OctagonX } from "lucide-react";
import Button from "../components/Button/Button";
import { useLocation, useNavigate } from "react-router-dom";
import queryString from "query-string";
import { statusPayment } from "../../utils/commom";
import { useDispatch } from "react-redux";
import {
  handleCancelOrder,
  handleCancelOrderPayment,
} from "../../store/order/handleOrder";

const PaymentErrorPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const parsedSearch = queryString.parse(location.search);

  useEffect(() => {
    if (
      parsedSearch.code === "00" &&
      parsedSearch.orderCode &&
      parsedSearch.status === statusPayment.CANCELLED
    ) {
      dispatch(
        handleCancelOrder({
          id: parsedSearch.orderCode,
        })
      );
    }
  }, []);

  return (
    <Gap>
      <div className="flex items-center justify-center my-5 h-full">
        <div className="flex flex-col items-center gap-y-2">
          <OctagonX size={"60px"} color="rgb(247,0,0)" />
          <h1 className="font-semibold text-[35px] text-error">
            ĐƠN HÀNG ĐÃ BỊ HỦY
          </h1>
        </div>
      </div>
      <div className="flex items-center justify-center">
        <Button kind="primary" href="/" className="rounded-md">
          Quay Về Trang Chủ
        </Button>
      </div>
    </Gap>
  );
};

export default PaymentErrorPage;
