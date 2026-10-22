import React from "react";
import FashionNewsItem from "./FashionNewsItem";

const FashionNews = ({ data }) => {
  return (
    <div className="grid grid-cols-3 gap-x-4">
      {data?.length > 0 &&
        data
          ?.slice(0, 3)
          ?.map((item) => (
            <FashionNewsItem
              key={item.id}
              data={item}
              height="h-[300px]"
            ></FashionNewsItem>
          ))}
    </div>
  );
};

export default FashionNews;
