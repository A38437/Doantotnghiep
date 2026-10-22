import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Image from "../Image/Image";
import { handleLogout } from "../../../store/auth/handleAuth";
import { handleGetCurrentUser } from "../../../store/user/handleUser";
import { getTokenFromLocalStorage } from "../../../utils/localStorage";
import { Epath } from "../../routes/routerConfig";

const PopupMe = ({ handleOutsideClick2 }) => {
  const dispatch = useDispatch();
  const naviage = useNavigate();
  const { dataCurrentUser } = useSelector((state) => state.user);

  return (
    <div className="absolute top-full mt-2 right-0 w-[280px] bg-white pt-[18px] px-6 pb-[8px] shadow-2xl rounded-[10px] flex flex-col z-50  ">
      <div className="flex items-center border-b-[1px] py-[10px] mb-2">
        <div className="w-[40px] h-[40px] overflow-hidden flex-1  rounded-md">
          <Image
            url={dataCurrentUser?.avatar}
            className="w-[40px] h-[40px]  rounded-full overflow-hidden"
            alt=""
          />
        </div>
        <div className="w-full ml-[10px] flex-[4]">
          <h2 className="font-semibold  text-gray8 limitText max-w-[170px] capitalize">
            {dataCurrentUser?.userName}
          </h2>
          <span className="text-[#666] text-sm block limitText max-w-[170px]">
            {dataCurrentUser?.email}
          </span>
        </div>
      </div>

      <div className="border-b-[1px] ">
        <Link
          to={Epath.userDashboard}
          className="text-[#666] cursor-pointer text-sm py-[10px] block hover:text-primary"
          onClick={handleOutsideClick2}
        >
          DashBoard
        </Link>
      </div>

      <div className="border-b-[1px] ">
        <Link
          to="/myOrders/1"
          className="text-[#666] cursor-pointer text-sm py-[10px] block hover:text-primary"
          onClick={handleOutsideClick2}
        >
          Đơn hàng
        </Link>
      </div>

      <div className=" ">
        <Link
          to="/setting"
          className="text-[#666] cursor-pointer text-sm py-[10px] block hover:text-primary"
          onClick={handleOutsideClick2}
        >
          Cài Đặt
        </Link>
        <span
          className="text-[#666] cursor-pointer text-sm pt-1 pb-[10px] block hover:text-primary"
          onClick={() =>
            Swal.fire({
              title: `Bạn muốn đăng xuất ?`,
              icon: "warning",
              showCancelButton: true,
              confirmButtonColor: "#3085d6",
              cancelButtonColor: "#d33",
              confirmButtonText: "Đúng vậy",
              cancelButtonText: "Hủy Bỏ",
            }).then((result) => {
              if (result.isConfirmed) {
                dispatch(handleLogout());
              }
            })
          }
        >
          Đăng Xuất
        </span>
      </div>
    </div>
  );
};

export default PopupMe;
