import React, { useCallback, useEffect, useState } from "react";
import { Epath } from "../../routes/routerConfig";
import LayoutDetail from "../../components/Layout/LayoutDetail";
import { Table } from "antd";
import Image from "../../components/Image/Image";
import { defaultImage2 } from "../../../utils/commom";
import { Link } from "react-router-dom";
import { FilePenLine, Search, Trash } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import {
  handleDeleteNews,
  handleGetAllNews,
} from "../../../store/news/handleNews";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import Input from "../../components/Input/Input";
import { debounce } from "lodash";

const NewsPage = () => {
  const dispatch = useDispatch();
  const { control } = useForm();
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [searchNews, setSearchNews] = useState("");
  useEffect(() => {
    dispatch(
      handleGetAllNews({
        limit: pageSize,
        page: currentPage,
        title: searchNews,
      })
    );
  }, [currentPage, dispatch, pageSize, searchNews]);

  const { dataAllNews } = useSelector((state) => state.news);

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Thông tin",
      dataIndex: "info",
      key: "info",
      render: (info) => (
        <div className="flex items-center gap-x-3">
          <Image
            url={info?.url}
            className="w-[80px] h-[80px] rounded-xl overflow-hidden"
          ></Image>
          <h1 title={info?.title} className="limitText max-w-[600px]">
            {info?.title}
          </h1>
        </div>
      ),
      width: "50%",
    },
    {
      title: "Danh mục",
      dataIndex: "category",
      key: "category",
      render: (category) => <h1 className="">{category}</h1>,
    },
    {
      title: "Hành động",
      dataIndex: "action",
      key: "action",
      render: (id) => (
        <div className="flex items-center gap-x-3">
          <Link
            to={`/news/update/${id}`}
            className="cursor-pointer hover:text-primary transition-all"
          >
            <FilePenLine size={"20px"} />
          </Link>
          <Trash
            size={"20px"}
            className="cursor-pointer hover:text-error transition-all"
            onClick={() => {
              Swal.fire({
                title: `Bạn chắc chắn muốn xóa ?`,
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Đúng vậy",
                cancelButtonText: "Hủy Bỏ",
              }).then((result) => {
                if (result.isConfirmed) {
                  dispatch(
                    handleDeleteNews({
                      id: id,
                      callBack: () => {
                        dispatch(handleGetAllNews());
                        toast.success("Xóa Thành Công", { autoClose: 800 });
                      },
                    })
                  );
                }
              });
            }}
          ></Trash>
        </div>
      ),
    },
  ];

  const data =
    dataAllNews?.results?.length > 0 &&
    dataAllNews?.results?.map((item) => ({
      key: item.id,
      id: item.id,
      info: { url: item.url, title: item.title },
      category: item.category.name,
      action: item.id,
    }));

  const debouncedChangeHandler = useCallback(
    debounce((value) => {
      setSearchNews(value);
    }, 300), // Đặt thời gian debounce (ms)
    []
  );

  // Hàm xử lý onChange
  const handleChange = (e) => {
    debouncedChangeHandler(e.target.value);
  };

  return (
    <LayoutDetail
      title="Danh Sách Tin Tức"
      titleBtn="Thêm Tin Tức"
      url={Epath.addNews}
    >
      <div className="mb-4">
        <Input
          control={control}
          name="title"
          placeholder="Tìm kiếm ..."
          className="!w-[500px]"
          kind="search"
          onChange={handleChange}
        >
          <Search size={"18px"} />
        </Input>
      </div>
      <Table
        columns={columns}
        dataSource={data}
        className="text-text1 font-semibold text-[16px]"
        pagination={
          dataAllNews.totalPages > 1
            ? {
                current: currentPage || 1,
                total: dataAllNews.totalResults,
                pageSize: pageSize,
                onChange: (page, pageSize) => {
                  setCurrentPage(page);
                  setPageSize(pageSize);
                },
              }
            : false
        }
      />
    </LayoutDetail>
  );
};

export default NewsPage;
