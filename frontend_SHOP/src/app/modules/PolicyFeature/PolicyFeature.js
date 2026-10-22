import React from "react";
import PolicyFeatureItem from "./PolicyFeatureItem";
const dataUtil = [
  {
    id: 1,
    url: "/policyFeature/car.png",
    title: "Miễn Phí Vận Chuyển",
    contentDesc: "Miễn Phí với tất cả đơn hàng",
  },
  {
    id: 2,
    url: "/policyFeature/headphone.png",
    title: "Hỗ trợ 24/7",
    contentDesc: "Hãy liên hệ với chúng tôi bất cứ khi nào",
  },
  {
    id: 3,
    url: "/policyFeature/wallet.png",
    title: "Thanh Toán An Toàn 100%",
    contentDesc: "Hoàn tiền 100% khi có sự cố ",
  },
  {
    id: 4,
    url: "/policyFeature/box.png",
    title: "Chính Sách Hoàn Trả",
    contentDesc: "Hoàn trả trong vòng 30 ngày",
  },
];

const PolicyFeature = () => {
  return (
    <div className="px-5 md:px-[30px]   grid grid-cols-1  md:grid-cols-4 lg:grid-cols-4 gap-x-6 relative ">
      {dataUtil.length > 0 &&
        dataUtil.map((data) => (
          <PolicyFeatureItem data={data} key={data.id}></PolicyFeatureItem>
        ))}
    </div>
  );
};

export default PolicyFeature;
