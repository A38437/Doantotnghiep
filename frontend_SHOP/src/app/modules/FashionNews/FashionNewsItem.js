import React from "react";
import Image from "../../components/Image/Image";
import CategoryNews from "./parts/CategoryNews";
import DateCreateNews from "./parts/DateCreateNews";
import TitleNews from "./parts/TitleNews";
import ContentNews from "./parts/ContentNews";
import { Link } from "react-router-dom";
import parse from "html-react-parser";

const FashionNewsItem = ({ data, height }) => {
  return (
    <div className="flex flex-col gap-y-2 ">
      <Link to={`/news/${data?.id}`} className="overflow-hidden">
        <Image
          url={data?.url}
          className={`rounded-md overflow-hidden hover:scale-125  transition-all cursor-pointer ${height}`}
        ></Image>
      </Link>
      <div className="flex flex-col gap-y-2 py-3 px-2">
        <div className="flex flex-col  gap-y-2">
          <CategoryNews
            name={data?.category?.name}
            className="max-w-[330px]"
          ></CategoryNews>
          <DateCreateNews date={data?.createdAt}></DateCreateNews>
        </div>
        <TitleNews className="max-w-[320px]" to={`/news/${data?.id}`}>
          {data?.title}
        </TitleNews>
        <ContentNews>{parse(data?.content)}</ContentNews>
      </div>
    </div>
  );
};

export default FashionNewsItem;
