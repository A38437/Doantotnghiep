import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Image from "../Image/Image";
import SideBar from "./parts/SideBar";

const Layout = () => {
  return (
    <div className="h-full">
      <div className="fixed top-0 left-0 bottom-0 shadow-custom2 w-[292px] h-screen overflow-y-auto ">
        <div className="flex flex-col gap-y-4">
          <div className="flex items-center  gap-x-2 border-b-[2px] border-text2">
            <Image url="/logo3.png" className="w-[100px] h-[100px]"></Image>
            {/* <h1 className=" font-medium text-primary text-[22px] italic">
              ADMIN TTQSHOP
            </h1> */}
          </div>
          <SideBar></SideBar>
        </div>
      </div>
      <div className="">
        <div className="flex flex-col h-screen ">
          <div className="pl-[292px]">
            <Header></Header>
          </div>
          <div className="py-10 flex-grow px-6 pt-[120px] pl-[320px] ">
            <Outlet></Outlet>
          </div>
          <div className="pb-5 pl-[292px]">
            <Footer></Footer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
