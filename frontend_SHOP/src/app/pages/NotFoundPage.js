import React from "react";
import Gap from "../components/Commom/Gap";
import Image from "../components/Image/Image";
import Title from "../components/Commom/Title";
import Button from "../components/Button/Button";

const NotFoundPage = () => {
  return (
    <div>
      <Gap>
        <div className="flex items-center justify-center my-[150px]">
          <div className="flex flex-col items-center gap-y-6">
            <Image url="/notFound.png"></Image>
            <Title title="Không Tìm Thấy Trang !"></Title>
            <Button href="/" className="py-3 px-4 rounded-md" kind="secondary">
              Trở về Trang Chủ
            </Button>
          </div>
        </div>
      </Gap>
    </div>
  );
};

export default NotFoundPage;
