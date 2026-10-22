import React from "react";
import PolicyServiceItem from "./PolicyServiceItem";

const dataUtil = [
  {
    id: 1,
    url: "/policyFeature/car.png",
    title: "Miễn Phí Vận Chuyển",
    contentDesc: "Miễn phí trên tất cả mọi đơn hàng",
  },
  {
    id: 2,
    url: "/policyFeature/headphone.png",
    title: "HotLine hỗ trợ",
    contentDesc: "09199 855 02",
  },
  {
    id: 3,
    url: "/policyFeature/wallet.png",
    title: "Thanh Toán dễ dàng",
    contentDesc: "Thanh Toán trực tiếp hoặc chuyển khoản",
  },
  {
    id: 4,
    url: "/policyFeature/box.png",
    title: "Đổi trả linh hoạt",
    contentDesc:
      "Nếu sản phẩm có bất kì lỗi gì, chúng tôi sẽ đổi trả trong vòng 30 ngày",
  },
  {
    id: 5,
    url: "/policyFeature/clock.png",
    title: "Giao Hàng Siêu Nhanh",
    contentDesc: "Từ 2 - 4 ngày",
  },
  {
    id: 6,
    url: "/policyFeature/track.png",
    title: "Theo dõi đơn hàng",
    contentDesc: "Bạn có thể theo dõi đơn hàng một cách dễ dàng nhất",
  },
];

const PolicyService = () => {
  return (
    <div className="">
      <div className="grid grid-cols-2 gap-y-6">
        {dataUtil.map((item) => (
          <div key={item.id}>
            <PolicyServiceItem data={item}></PolicyServiceItem>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PolicyService;
