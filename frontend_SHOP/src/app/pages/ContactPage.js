import React from "react";
import { useForm } from "react-hook-form";
import Input from "../components/Input/Input";
import TextArea from "../components/Input/TextArea";
import BoxContact from "../modules/Contact/BoxContact";
import Gap from "../components/Commom/Gap";
import Button from "../components/Button/Button";
import Image from "../components/Image/Image";

const ContactPage = () => {
  const { control } = useForm();
  return (
    <div className="mt-10">
      <Gap>
        <div className="mt-[80px] pt-5 grid grid-cols-1 lg:grid-cols-4 gap-x-6">
          <div className=" lg:col-span-1 bg-white lg:shadow-2xl rounded-md">
            <BoxContact content="Hà Nội" className="px-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={52}
                height={51}
                viewBox="0 0 52 51"
                fill="none"
              >
                <path
                  d="M11.6562 46.2188H40.3438"
                  stroke="#2C742F"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M26 27.0938C27.6908 27.0938 29.3123 26.4221 30.5078 25.2266C31.7033 24.031 32.375 22.4095 32.375 20.7188C32.375 19.028 31.7033 17.4065 30.5078 16.2109C29.3123 15.0154 27.6908 14.3438 26 14.3438C24.3092 14.3438 22.6877 15.0154 21.4922 16.2109C20.2966 17.4065 19.625 19.028 19.625 20.7188C19.625 22.4095 20.2966 24.031 21.4922 25.2266C22.6877 26.4221 24.3092 27.0938 26 27.0938V27.0938Z"
                  stroke="#2C742F"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M41.9375 20.7188C41.9375 35.0625 26 46.2188 26 46.2188C26 46.2188 10.0625 35.0625 10.0625 20.7188C10.0625 16.4919 11.7416 12.4381 14.7305 9.44924C17.7193 6.46037 21.7731 4.78125 26 4.78125C30.2269 4.78125 34.2807 6.46037 37.2695 9.44924C40.2584 12.4381 41.9375 16.4919 41.9375 20.7188V20.7188Z"
                  stroke="#2C742F"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </BoxContact>
            <BoxContact content="ttqshop682@gmail.com">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={52}
                height={51}
                viewBox="0 0 52 51"
                fill="none"
              >
                <g clipPath="url(#clip0_460_40738)">
                  <path
                    d="M48.95 5.9502H3.05C1.64172 5.9502 0.5 7.09182 0.5 8.5002V42.5002C0.5 43.9084 1.64162 45.0502 3.05 45.0502H48.95C50.3583 45.0502 51.5 43.9085 51.5 42.5002V8.5002C51.5 7.09192 50.3584 5.9502 48.95 5.9502ZM49.8 42.5003C49.8 42.9697 49.4195 43.3502 48.95 43.3502H3.05C2.58054 43.3502 2.20003 42.9697 2.20003 42.5003V8.5002C2.20003 8.03074 2.58054 7.65023 3.05 7.65023H48.95C49.4195 7.65023 49.8 8.03074 49.8 8.5002V42.5003Z"
                    fill="#2C742F"
                  />
                  <path
                    d="M47.3239 9.35387C47.0993 9.33424 46.8761 9.40467 46.7035 9.5497L27.0939 26.0226C26.4614 26.5542 25.5384 26.5542 24.9059 26.0226L5.29654 9.5496C5.06395 9.35437 4.7448 9.29799 4.45942 9.40178C4.17404 9.50557 3.96566 9.7538 3.91286 10.0529C3.86007 10.3521 3.97084 10.6566 4.20342 10.8518L23.8129 27.3239C25.0768 28.388 26.9231 28.388 28.1871 27.3239L47.7965 10.8519C47.9692 10.707 48.0772 10.4994 48.0968 10.2748C48.1164 10.0501 48.046 9.82691 47.901 9.65429C47.7561 9.48147 47.5485 9.37349 47.3239 9.35387Z"
                    fill="#2C742F"
                  />
                  <path
                    d="M16.8483 27.206C16.5474 27.1388 16.2338 27.2398 16.0286 27.4699L4.12856 40.2199C3.91321 40.4405 3.83412 40.7604 3.92197 41.0559C4.00983 41.3514 4.25079 41.5761 4.55161 41.6433C4.85253 41.7104 5.1661 41.6094 5.37129 41.3793L17.2713 28.6293C17.4867 28.4088 17.5658 28.0888 17.4779 27.7934C17.3901 27.4979 17.1492 27.2731 16.8483 27.206Z"
                    fill="#2C742F"
                  />
                  <path
                    d="M35.9714 27.4699C35.7663 27.2398 35.4526 27.1388 35.1517 27.206C34.8508 27.2731 34.6099 27.4979 34.5221 27.7934C34.4342 28.0889 34.5133 28.4088 34.7287 28.6293L46.6287 41.3793C46.9514 41.7098 47.479 41.7221 47.8167 41.407C48.1545 41.0918 48.1788 40.5647 47.8714 40.2198L35.9714 27.4699Z"
                    fill="#2C742F"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_460_40738">
                    <rect
                      width={51}
                      height={51}
                      fill="white"
                      transform="translate(0.5)"
                    />
                  </clipPath>
                </defs>
              </svg>
            </BoxContact>
            <BoxContact
              content="0337122282
"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={52}
                height={51}
                viewBox="0 0 52 51"
                fill="none"
              >
                <path
                  d="M31.9829 7.24219C34.9249 8.03345 37.6074 9.58385 39.7616 11.7381C41.9159 13.8923 43.4663 16.5748 44.2575 19.5168"
                  stroke="#2C742F"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M30.1865 13.9502C31.9513 14.425 33.5604 15.3551 34.8527 16.6474C36.145 17.9396 37.0751 19.5488 37.5499 21.3136"
                  stroke="#2C742F"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M17.4625 25.6416C19.2621 29.322 22.2449 32.292 25.933 34.0757C26.2031 34.2036 26.5018 34.2589 26.7998 34.2361C27.0977 34.2133 27.3846 34.1131 27.632 33.9456L33.0639 30.3255C33.3038 30.1653 33.5799 30.0674 33.8671 30.0408C34.1544 30.0141 34.4437 30.0595 34.709 30.1728L44.8699 34.5287C45.215 34.6753 45.5032 34.9301 45.691 35.2546C45.8788 35.5792 45.9561 35.956 45.9112 36.3283C45.5895 38.8411 44.3631 41.1506 42.4616 42.8244C40.56 44.4983 38.1135 45.4217 35.5802 45.4219C27.7558 45.4219 20.2518 42.3136 14.7191 36.7809C9.18637 31.2482 6.07813 23.7442 6.07812 15.9198C6.07836 13.3866 7.00185 10.9404 8.67571 9.03914C10.3496 7.13784 12.659 5.91181 15.1717 5.59057C15.544 5.54568 15.9208 5.62294 16.2454 5.81074C16.5699 5.99853 16.8247 6.28669 16.9713 6.63182L21.3307 16.8014C21.4428 17.0641 21.4883 17.3505 21.4632 17.6351C21.4381 17.9196 21.3431 18.1936 21.1867 18.4327L17.577 23.9478C17.4132 24.1962 17.3165 24.4828 17.2964 24.7796C17.2764 25.0765 17.3336 25.3734 17.4625 25.6416V25.6416Z"
                  stroke="#2C742F"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </BoxContact>
          </div>
          <div className=" lg:col-span-3 lg:shadow-2xl pt-[44px] lg:px-[50px] pb-[50px] rounded-lg">
            <h1 className="text-gray9 text-[20px] font-semibold">
              Xin Chào Quý Khách Hàng
            </h1>
            <p className=" text-gray5 text-[16] font-normal mt-2 mb-6">
              Nếu bạn cần giúp đỡ hay phản hồi ý kiến hãy liên lạc với chung tôi
              nhé !
            </p>

            <form action="">
              <div className="flex items-center  gap-x-4">
                <div className="flex-1">
                  <Input
                    control={control}
                    name="fullName"
                    placeholder="TTQ Shop"
                    //   className="w-full"
                  ></Input>
                </div>
                <div className="flex-1">
                  <Input
                    control={control}
                    name="email"
                    placeholder="ttqshop682@gmail.com"
                  ></Input>
                </div>
              </div>
              <div className="mt-4">
                <TextArea
                  control={control}
                  name="subject"
                  placeholder="Subjects"
                ></TextArea>
              </div>

              <Button kind="primary" className="mt-6 rounded-md">
                Send Message
              </Button>
            </form>
          </div>
        </div>
      </Gap>

      <Image
        url="/locationofMe.png
        "
        className="mt-10 h-[400px] w-full  filter brightness-95"
      ></Image>
    </div>
  );
};

export default ContactPage;
