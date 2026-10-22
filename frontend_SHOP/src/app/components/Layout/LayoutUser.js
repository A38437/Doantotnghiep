import React from "react";
import Header from "../Header/Header";
import ShowPath from "../Commom/ShowPath";
import { NavLink, Outlet, useParams } from "react-router-dom";
import Footer from "../Footer/Footer";
import Gap from "../Commom/Gap";
import { Epath } from "../../routes/routerConfig";
import { LayoutDashboard, Settings, ShoppingBag } from "lucide-react";

const LayoutUser = () => {
  const { statusOrder } = useParams();

  const navLink = [
    {
      id: 1,
      icon: <LayoutDashboard />,
      name: "Dashboard",
      to: Epath.userDashboard,
    },
    {
      id: 2,
      icon: <ShoppingBag />,
      name: "Đơn Hàng",
      to: `/myOrders/${statusOrder || "1"}`,
    },
    {
      id: 3,
      icon: <Settings />,
      name: "Cài Đặt",
      to: Epath.settingUser,
    },

    // {
    //   id: 4,
    //   icon: <IconLogout></IconLogout>,
    //   name: "Log-out",
    //   to: "#",

    // },
  ];

  return (
    <div>
      <Header></Header>
      <div className="my-[104px]">
        <ShowPath></ShowPath>
        <Gap>
          <div className="grid grid-cols-7 gap-x-8">
            <div className=" col-span-2">
              <div className="py-4  border min-h-[250px] border-[#E6E6E6] rounded-lg hidden lg:block">
                <h1 className="text-gray9 text-[18px] font-medium pl-5 pb-4">
                  Điều Hướng
                </h1>
                {navLink.map((item) => (
                  <NavLink
                    className="flex gap-x-[10px] items-center py-4 px-5 second-link text-[#666] "
                    key={item.id}
                    to={item.to}
                    activeclassname="active"
                  >
                    <span>{item.icon}</span>
                    <span className=" font-normal text-[18px] ">
                      {item.name}
                    </span>
                  </NavLink>
                ))}
              </div>
            </div>
            <div className=" col-span-5">
              <Outlet></Outlet>
            </div>
          </div>
        </Gap>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default LayoutUser;
