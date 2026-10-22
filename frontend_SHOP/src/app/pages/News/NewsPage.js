import React, { useEffect, useState } from "react";
import Gap from "../../components/Commom/Gap";
import FashionNewsSub from "../../modules/FashionNews/FashionNewsSub";
import FashionNewsItem from "../../modules/FashionNews/FashionNewsItem";
import { useDispatch, useSelector } from "react-redux";
import { handleGetAllNews } from "../../../store/news/handleNews";
import Title from "../../components/Commom/Title";
import { Pagination } from "antd";

const NewsPage = () => {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(8);

  useEffect(() => {
    dispatch(handleGetAllNews({ limit: pageSize, page: currentPage }));
  }, [currentPage, dispatch, pageSize]);

  const onChange = (page, pageSize) => {
    setCurrentPage(page);
    setPageSize(pageSize);
    // saveVariablesLC("currentPage_combinePro", page);
  };

  const dataAllNews = useSelector((state) => state.news.dataAllNews);

  return (
    <div>
      <Gap>
        <div className="grid grid-cols-7 gap-x-6">
          <div className="col-span-2">
            <FashionNewsSub dataNews={dataAllNews?.results}></FashionNewsSub>
          </div>
          <div className="col-span-5">
            <div className="flex items-center  justify-center mt-8 mb-10">
              <Title
                title="Tin Tức Thời Trang"
                className="text-[30px] font-semibold "
                width=" after:w-[250px]"
              ></Title>
            </div>
            <div className="grid grid-cols-2 gap-x-4 gap-y-6 ">
              {dataAllNews?.results?.length > 0 &&
                dataAllNews?.results?.map((news) => (
                  <FashionNewsItem
                    key={news.id}
                    data={news}
                    height={"h-[400px]"}
                  />
                ))}
            </div>

            {dataAllNews?.totalPages > 1 && (
              <div className="flex items-center justify-center mt-[40px]">
                <Pagination
                  total={dataAllNews.totalResults}
                  defaultPageSize={pageSize}
                  defaultCurrent={1}
                  onChange={onChange}
                />
              </div>
            )}
          </div>
        </div>
      </Gap>
    </div>
  );
};

export default NewsPage;
