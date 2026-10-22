import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import ShowPath from "../Commom/ShowPath";

const LayoutDetails = () => {
  return (
    <div>
      <Header></Header>
      <div className="my-[104px]">
        <ShowPath></ShowPath>
        <Outlet></Outlet>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default LayoutDetails;
