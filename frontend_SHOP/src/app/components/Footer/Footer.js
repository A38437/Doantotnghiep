import React, { useEffect } from "react";
import TextFooter from "./Text/TextFooter";
import TitleFooter from "./Text/TitleFooter";
import Image from "../Image/Image";
import { useDispatch, useSelector } from "react-redux";
import { handleGetAllCategory } from "../../../store/category/handleCategory";
import { sortByQuantityProduct } from "../../../utils/functions";

const Footer = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(handleGetAllCategory());
  }, [dispatch]);

  const { dataAllCategory } = useSelector((state) => state.category);

  const sortDataAllCategory = sortByQuantityProduct(
    Array.isArray(dataAllCategory?.results) ? dataAllCategory.results : [],
    true,
  );

  return (
    <footer className="footer w-full bg-gray-100 pt-16 pb-6 px-[202px]">
      <div className="grid grid-cols-6 gap-x-8">
        <div className=" md:col-span-2 lg:col-span-2 ">
          <Image url="/logo3.png" className="w-[150px] h-[85px]" alt="img" />
          <TextFooter className="!font-medium my-5">
            Nếu bạn cần hỗ trợ, chỉ cần liên hệ với chúng tôi qua hai phương
            pháp dưới đây
          </TextFooter>
          <div className="flex md:flex-col lg:flex-row md:gap-y-2 gap-x-4 text-sm mt-2">
            <div className="relative">
              <TextFooter className="italic">0337122282</TextFooter>
              <div className="absolute after:bg-primary after:absolute after:contents-'' after:w-[86px] after:h-[2px] "></div>
            </div>
            <span className="text-gray5 ">or</span>
            <div className="relative">
              <TextFooter className="italic">ttqshop682@gmail.com</TextFooter>
              <div className="absolute after:bg-primary after:absolute after:contents-'' after:w-[170px] after:h-[2px] "></div>
            </div>
          </div>
        </div>
        <div className="col-span-4">
          <div className="grid grid-cols-4 gap-x-10">
            <div>
              <TitleFooter url="setting" className="font-semibold text-[20px]">
                Tài khoản
              </TitleFooter>
              <div className="flex flex-col gap-y-5 mt-3">
                <TextFooter
                  url="/setting"
                  className="hover:text-primary cursor-pointer"
                >
                  Tài khoản
                </TextFooter>
                <TextFooter
                  url="/userDashboard"
                  className="hover:text-primary cursor-pointer"
                >
                  Lịch sử đơn hàng
                </TextFooter>
                <TextFooter className="hover:text-primary cursor-pointer">
                  Giỏ hàng
                </TextFooter>
                <TextFooter className="hover:text-primary cursor-pointer">
                  Yêu thích
                </TextFooter>
              </div>
            </div>
            <div>
              <TitleFooter className="font-semibold text-[20px]">
                Giúp đỡ
              </TitleFooter>
              <div className="flex flex-col gap-y-5 mt-3">
                <TextFooter
                  url="/contact"
                  className="hover:text-primary cursor-pointer"
                >
                  Liên hệ
                </TextFooter>
                <TextFooter className="hover:text-primary cursor-pointer">
                  Câu hỏi thường gặp
                </TextFooter>
                <TextFooter className="hover:text-primary cursor-pointer">
                  Điều khoản
                </TextFooter>
                <TextFooter className="hover:text-primary cursor-pointer">
                  Chính sách bảo mật
                </TextFooter>
              </div>
            </div>
            <div>
              <TitleFooter className="font-semibold text-[20px]">
                Ủy Quyền
              </TitleFooter>
              <div className="flex flex-col gap-y-5 mt-3">
                <TextFooter className="hover:text-primary cursor-pointer">
                  Về chúng tôi
                </TextFooter>
                <TextFooter className="hover:text-primary cursor-pointer">
                  Cửa hàng
                </TextFooter>
                <TextFooter
                  url="/shopping/all"
                  className="hover:text-primary cursor-pointer"
                >
                  Sản phẩm
                </TextFooter>
                <TextFooter
                  url="/myOrders/1"
                  className="hover:text-primary cursor-pointer"
                >
                  Theo dõi đơn hàng
                </TextFooter>
              </div>
            </div>
            <div>
              <TitleFooter className="font-semibold text-[20px]">
                Danh mục
              </TitleFooter>
              <div className="flex flex-col gap-y-5 mt-3">
                {sortDataAllCategory?.length > 0 &&
                  sortDataAllCategory?.slice(0, 4)?.map((item) => (
                    <TextFooter
                      key={item.id}
                      url={`/shopping/${item.id}`}
                      className="hover:text-primary cursor-pointer"
                    >
                      {item?.name}
                    </TextFooter>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full h-[1px] mt-6  bg-[#474747] opacity-20"></div>
      <div className="pt-6  flex flex-col md:flex-row lg:flex-row items-center justify-between mt-4">
        <span className="text-gray5 text-sm font-normal italic text-textBold">
          TTQSHOP © 2026. Copyright belongs to TTQ SHOP
        </span>
        <div className="mt-2 md:mt-0 lg:mt-0 flex gap-x-2 items-center">
          <img src="/methodPayment/ApplePay.png" alt="" />
          <img src="/methodPayment/Visa.png" alt="" />
          <img src="/methodPayment/Discover.png" alt="" />
          <img src="/methodPayment/Mastercard.png" alt="" />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
