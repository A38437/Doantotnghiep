import React, { useEffect, useMemo, useState } from "react";
import LayoutDetail from "../../components/Layout/LayoutDetail";
import Box from "../../components/Commom/Box";
import BoxFiled from "../../components/Commom/BoxFiled";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import Input from "../../components/Input/Input";
import { Select } from "antd";
import ImageUpload from "../../components/Image/ImageUpload";
import Button from "../../components/Button/Button";
import { Epath } from "../../routes/routerConfig";
import "react-quill/dist/quill.snow.css";
import ReactQuill from "react-quill";
import { handleGetAllCategory } from "../../../store/category/handleCategory";
import { LIMIT_HIGH } from "../../../utils/commom";
import {
  handleAddNews,
  handleGetDetailsNews,
  handleUpdateNews,
} from "../../../store/news/handleNews";
import { toast } from "react-toastify";

const ActionNews = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [description, setDescription] = useState("");
  const [idCategory, setIdCategory] = useState();
  const { id } = useParams();
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
  } = useForm();

  useEffect(() => {
    dispatch(handleGetAllCategory({ limit: LIMIT_HIGH }));
  }, []);
  useEffect(() => {
    dispatch(handleGetDetailsNews(id));
  }, [id]);

  const dataAllCategory = useSelector(
    (state) => state?.category?.dataAllCategory?.results
  );

  const { dataDetailNews } = useSelector((state) => state?.news);

  useEffect(() => {
    if (id) {
      setValue("title", dataDetailNews?.title);
      setDescription(dataDetailNews?.content);
    }
  }, [dataDetailNews, id, setValue]);

  const optionParentId =
    dataAllCategory?.length > 0
      ? dataAllCategory?.map((item) => ({
          value: item.id,
          label: item.name,
        }))
      : [];

  const modules = useMemo(
    () => ({
      toolbar: [
        ["bold", "italic", "underline", "strike"],
        ["blockquote"],
        [{ header: 1 }, { header: 2 }], // custom button values
        [{ list: "ordered" }, { list: "bullet" }],
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        ["link", "image"],
      ],
    }),
    []
  );

  const handleActionForm = (data) => {
    if (!id) {
      const formData = {
        title: data?.title,
        url: getValues("url"),
        content: description,
        categoryId: idCategory,
        callBack: () => {
          navigate(Epath.news);
          toast.success("Thêm Thành Công !", { autoClose: 800 });
        },
      };
      dispatch(handleAddNews(formData));
    } else {
      const formData = {
        id: id,
        title: data?.title,
        url: getValues("url") || dataDetailNews?.url,
        content: description,
        categoryId: idCategory || dataDetailNews?.category?.id,
        callBack: () => {
          navigate(Epath.news);
          toast.success("Cập nhật Thành Công !", { autoClose: 800 });
        },
      };
      dispatch(handleUpdateNews(formData));
    }
  };
  return (
    <LayoutDetail title={` ${!id ? "Thêm mới Tin tức" : "Cập NhậtTin tức"}`}>
      <Box>
        <form action="" onSubmit={handleSubmit(handleActionForm)}>
          <div className="flex flex-col gap-y-5">
            <BoxFiled title="Tên">
              <Input
                control={control}
                name="title"
                placeholder="Nhập tiêu đề Tin Tức..."
              ></Input>
            </BoxFiled>

            <BoxFiled title="Danh Mục " require={false}>
              <Select
                showSearch
                style={{
                  width: "100%",
                  height: "45px",
                }}
                placeholder="Chọn danh mục "
                optionFilterProp="label"
                filterSort={(optionA, optionB) =>
                  (optionA?.label ?? "")
                    .toLowerCase()
                    .localeCompare((optionB?.label ?? "").toLowerCase())
                }
                options={optionParentId}
                onSelect={(value) => setIdCategory(value)}
                defaultValue={
                  dataDetailNews?.category?.id
                    ? Number(dataDetailNews?.category?.id)
                    : null
                }
                value={idCategory || dataDetailNews?.category?.id}
              />
            </BoxFiled>
            <BoxFiled title="Ảnh">
              <ImageUpload
                className="w-[600px] h-[400px]"
                name="url"
                onChange={(name, data) => setValue("url", data.url)}
                getValues={id ? getValues("url") || dataDetailNews?.url : ""}
                setValue={setValue}
              ></ImageUpload>
            </BoxFiled>
            <BoxFiled title="Mô Tả Sản Phẩm">
              <ReactQuill
                modules={modules}
                theme="snow"
                value={description}
                onChange={setDescription}
                className="entry-content w-full max-w-[350px]  md:max-w-[[60px] lg:max-w-full "
                placeholder="Mô tả..."
              />
            </BoxFiled>
            <div className="flex items-center gap-x-3 justify-end">
              <Button
                kind="discard"
                className="w-[200px] rounded-lg overflow-hidden hover:opacity-80"
                href={Epath.news}
              >
                Hủy Bỏ
              </Button>

              {id ? (
                <Button
                  kind="primary"
                  className="w-[200px] rounded-lg overflow-hidden hover:opacity-80"
                  type="submit"
                >
                  Cập Nhật
                </Button>
              ) : (
                <Button
                  kind="primary"
                  className="w-[200px] rounded-lg overflow-hidden hover:opacity-80"
                  type="submit"
                >
                  Hoàn Thành
                </Button>
              )}
            </div>
          </div>
        </form>
      </Box>
    </LayoutDetail>
  );
};

export default ActionNews;
