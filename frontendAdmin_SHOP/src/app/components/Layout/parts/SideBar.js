import { Menu } from "antd";
import Swal from "sweetalert2";
import {
  BookMinus,
  Home,
  LogOut,
  Newspaper,
  Package,
  Settings,
  Shirt,
  User,
} from "lucide-react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { handleLogout } from "../../../../store/user/handleUser";
import { Epath } from "../../../routes/routerConfig";
import { statusRole } from "../../../../utils/commom";

const SideBar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { dataCurrentUser } = useSelector((state) => state.user);

  const items = [
    {
      key: "",
      label: "Trang Chủ",
      icon: <Home size={"18px"} />,
    },
    {
      type: "divider",
    },
    {
      key: "categories",
      label: "Danh Mục",
      icon: <BookMinus size={"18px"} />,
    },

    {
      key: "products",
      label: "Sản Phẩm",
      icon: <Shirt size={"18px"} />,
      // children: [
      //   {
      //     key: "products",
      //     label: "Danh Sách Sản Phẩm",
      //   },
      //   {
      //     key: "6",
      //     label: "Option 6",
      //   },
      //   {
      //     key: "sub3",
      //     label: "Submenu",
      //     children: [
      //       {
      //         key: "7",
      //         label: "Option 7",
      //       },
      //       {
      //         key: "8",
      //         label: "Option 8",
      //       },
      //     ],
      //   },
      // ],
    },
    {
      type: "divider",
    },
    {
      key: "orders",
      label: "Đơn Hàng",
      icon: <Package size={"18px"} />,
      // children: [
      //   {
      //     key: "9",
      //     label: "Option 9",
      //   },
      //   {
      //     key: "10",
      //     label: "Option 10",
      //   },
      //   {
      //     key: "11",
      //     label: "Option 11",
      //   },
      //   {
      //     key: "12",
      //     label: "Option 12",
      //   },
      // ],
    },
    {
      type: "divider",
    },
    {
      key: "users",
      label: "Người Dùng",
      icon: <User size={"18px"} />,
      className: ` ${
        dataCurrentUser?.roleID === statusRole.STAFF && "!hidden"
      } `,
    },
    {
      type: "divider",
    },
    {
      key: "news",
      label: "Tin Tức",
      icon: <Newspaper size={"18px"} />,
    },
    {
      key: "grp",
      label: "Group",
      type: "group",
      children: [
        {
          key: "setttings",
          label: "Cài Đặt",
          icon: <Settings size={"18px"} />,
        },
        {
          key: "logout",
          label: "Đăng Xuất",
          icon: <LogOut size={"18px"} />,
        },
      ],
    },
  ];

  const onClick = (e) => {
    const { key } = e;

    if (key === "logout") {
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
          dispatch(
            handleLogout({
              callback: () => {
                navigate(Epath.loginPage);
              },
            })
          );
        }
      });
    } else {
      navigate(`/${key}`);
    }
  };
  return (
    <div className="w-full">
      <Menu
        onClick={onClick}
        // style={{
        //   width: 256,
        // }}
        className="text-[16px]  font-body font-medium"
        defaultSelectedKeys={["dashboard"]}
        defaultOpenKeys={["dashboard"]}
        mode="inline"
        items={items}
      />
    </div>
  );
};

export default SideBar;
