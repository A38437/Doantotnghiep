import React, { useEffect } from "react";
import BoxOverviewItem from "../../modules/Dashboard/BoxOverviewItem";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBagShopping,
  faReceipt,
  faSackDollar,
} from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { handleGetOverview } from "../../../store/user/handleUser";
import { statusRole } from "../../../utils/commom";

const DashboardPage = () => {
  const dispatch = useDispatch();

  const { dataCurrentUser } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(handleGetOverview());
  }, []);

  const { dataOverview } = useSelector((state) => state.user);

  return (
    <div className="">
      <div className="relative flex justify-between items-center bg-white p-5  rounded-md">
        <div>
          <h1 className="text-[20px] font-medium text-gray-700">
            Xin Chào Boss {dataCurrentUser?.userName} !
          </h1>
          <p className="pt-4 text-gray5">
            Chất lượng dịch vụ là ưu tiên hàng đầu của chúng ta. 😎
          </p>
        </div>
        <div className="w-[300px] h-[200px] absolute right-3 bottom-0 z-[60]">
          <img
            src="/personDashboard.png"
            className="w-full h-full object-cover"
            alt="personDashboard"
          />
        </div>
      </div>
      <div className="mt-10 grid grid-cols-4 gap-x-4">
        {dataCurrentUser?.roleID === statusRole.ADMIN && (
          <BoxOverviewItem
            title="Doanh Thu"
            unit="VNĐ"
            icon={<FontAwesomeIcon icon={faSackDollar} size="2xl" />}
            colorIcon="text-[#ffb400]"
            quantity={dataOverview?.revenue}
            // to="/admin/order"
          ></BoxOverviewItem>
        )}
        <BoxOverviewItem
          title="Đơn Hàng"
          icon={<FontAwesomeIcon icon={faReceipt} size="2xl" />}
          colorIcon="text-[#16b1ff]"
          quantity={dataOverview?.order}
          // to="/admin/order"
        ></BoxOverviewItem>
        <BoxOverviewItem
          title="Khách Hàng"
          quantity={dataOverview?.user}
          icon={<FontAwesomeIcon icon={faUser} size="2xl" />}
          colorIcon="text-[#9055fd]"
          // to="/admin/customers"
        ></BoxOverviewItem>
        <BoxOverviewItem
          title="Sản Phẩm"
          quantity={dataOverview?.product}
          icon={<FontAwesomeIcon icon={faBagShopping} size="2xl" />}
          colorIcon="text-[#20c997]"
          // to="/admin/products/product_list"
        ></BoxOverviewItem>
      </div>
    </div>
  );
};

export default DashboardPage;
