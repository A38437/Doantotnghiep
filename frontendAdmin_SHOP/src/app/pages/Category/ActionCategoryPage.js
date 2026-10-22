import React, { useEffect, useState } from "react";
import LayoutDetail from "../../components/Layout/LayoutDetail";
import Box from "../../components/Commom/Box";
import { useForm } from "react-hook-form";
import Input from "../../components/Input/Input";
import { Select } from "antd";
import ImageUpload from "../../components/Image/ImageUpload";
import BoxFiled from "../../components/Commom/BoxFiled";
import Button from "../../components/Button/Button";
import { Epath } from "../../routes/routerConfig";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  handleAddCategory,
  handleGetAllCategory,
  handleUpdateCategory,
  handlegetDetailsCategory,
} from "../../../store/category/handleCategory";
import { LIMIT_HIGH } from "../../../utils/commom";
import { toast } from "react-toastify";

const ActionCategoryPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
  } = useForm();
  const { id } = useParams();

  useEffect(() => {
    dispatch(handleGetAllCategory({ limit: LIMIT_HIGH }));
  }, []);

  useEffect(() => {
    dispatch(handlegetDetailsCategory(id));
  }, [id]);

  const dataAllCategory = useSelector(
    (state) => state.category.dataAllCategory.results
  );
  const dataDetailsCategory = useSelector(
    (state) => state.category.dataDetailsCategory
  );

  const [idParentCate, setIdParentCate] = useState();

  const optionParentId =
    dataAllCategory?.length > 0
      ? dataAllCategory?.map((item) => ({
          value: item.id,
          label: item.name,
        }))
      : [];

  const handleActionForm = (data) => {
    if (!id) {
      const dataForm = {
        name: data.name,
        parentId: idParentCate || null,
        url: getValues("url"),
        callBack: () => {
          navigate(Epath.categories);
          toast.success("Thêm Thành Công !", { autoClose: 800 });
        },
      };
      dispatch(handleAddCategory(dataForm));
    } else {
      const dataFormUpdate = {
        id: id,
        parentId: dataDetailsCategory?.parentId,
        name: data.name,
        url: data.url,
        parentIdChange: idParentCate || dataDetailsCategory?.parentId,
        callBack: () => {
          navigate(Epath.categories);
          toast.success("Cập Nhật Thành Công !", { autoClose: 800 });
        },
      };

      dispatch(handleUpdateCategory(dataFormUpdate));
    }
  };

  useEffect(() => {
    if (id) {
      setValue("name", dataDetailsCategory?.name);
      setValue("url", dataDetailsCategory?.url);
    }
  }, [id, dataDetailsCategory, setValue]);

  useEffect(() => {
    if (!id) {
      setValue("url", "");
    }
  }, [id, setValue]);
  return (
    <LayoutDetail title={`${id ? "Cập Nhật Danh Mục" : "Thêm Mới Danh Mục"} `}>
      <Box>
        <form onSubmit={handleSubmit(handleActionForm)}>
          <div className="flex flex-col gap-y-5">
            <BoxFiled title="Tên">
              <Input
                control={control}
                name="name"
                placeholder="Nhập tên danh mục"
              ></Input>
            </BoxFiled>

            <BoxFiled title="Danh Mục Cha" require={false}>
              <Select
                showSearch
                style={{
                  width: "100%",
                  height: "45px",
                }}
                placeholder="Chọn danh mục cha"
                optionFilterProp="label"
                filterSort={(optionA, optionB) =>
                  (optionA?.label ?? "")
                    .toLowerCase()
                    .localeCompare((optionB?.label ?? "").toLowerCase())
                }
                options={optionParentId}
                onSelect={(value) => setIdParentCate(value)}
                defaultValue={
                  dataDetailsCategory?.parentId
                    ? Number(dataDetailsCategory?.parentId)
                    : null
                }
                disabled={!dataDetailsCategory?.parentId && id && true}
                value={idParentCate || dataDetailsCategory?.parentId}
              />
            </BoxFiled>
            <BoxFiled title="Ảnh">
              <ImageUpload
                className="w-[600px] h-[400px]"
                name="url"
                onChange={(name, data) => setValue("url", data.url)}
                getValues={
                  id ? getValues("url") || dataDetailsCategory?.url : ""
                }
                setValue={setValue}
              ></ImageUpload>
            </BoxFiled>
            <div className="flex items-center gap-x-3 justify-end">
              <Button
                kind="discard"
                className="w-[200px] rounded-lg overflow-hidden hover:opacity-80"
                href={Epath.categories}
              >
                Hủy Bỏ
              </Button>
              <Button
                kind="primary"
                className="w-[200px] rounded-lg overflow-hidden hover:opacity-80"
                type="submit"
              >
                Hoàn Thành
              </Button>
            </div>
          </div>
        </form>
      </Box>
    </LayoutDetail>
  );
};

export default ActionCategoryPage;
