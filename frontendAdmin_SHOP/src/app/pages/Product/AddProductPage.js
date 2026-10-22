import React, { useEffect, useMemo, useState } from "react";
import LayoutDetail from "../../components/Layout/LayoutDetail";
import Box from "../../components/Commom/Box";
import Input from "../../components/Input/Input";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import BoxFiled from "../../components/Commom/BoxFiled";
import { Select } from "antd";
import {
  handleAddProduct,
  handleGetAllColor,
  handleGetAllSize,
} from "../../../store/product/handleProduct";
import "react-quill/dist/quill.snow.css";
import ReactQuill from "react-quill";
import Button from "../../components/Button/Button";
import { Epath } from "../../routes/routerConfig";
import ImageUpload from "../../components/Image/ImageUpload";
import { CircleX, Plus } from "lucide-react";
import { handleGetAllCategory } from "../../../store/category/handleCategory";
import { toast } from "react-toastify";

const AddProductPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [description, setDescription] = useState("");
  const [idCategory, setIdCategory] = useState("");
  const [arrColor, setArrColor] = useState([]);
  const [arrSize, setArrSize] = useState([]);

  const [bigImg, setBigImg] = useState(""); // State để lưu trữ URL ảnh chính
  const [smallImgs, setSmallImgs] = useState([]); // State để lưu trữ URL các ảnh nhỏ
  const [allImgs, setAllImgs] = useState([]); // State để lưu trữ URL của tất cả ảnh (ảnh chính + ảnh nhỏ)

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
  } = useForm();

  useEffect(() => {
    dispatch(handleGetAllSize({ type: "size" }));
    dispatch(handleGetAllColor({ type: "color" }));
    dispatch(handleGetAllCategory());
  }, []);

  const { dataAllSize } = useSelector((state) => state.product);
  const { dataAllColor } = useSelector((state) => state.product);
  const dataAllCategory = useSelector(
    (state) => state?.category?.dataAllCategory?.results
  );

  const optionSize =
    dataAllSize?.length > 0 &&
    dataAllSize?.map((item) => ({
      value: item.id,
      label: item.description,
    }));

  const optionColor =
    dataAllColor?.length > 0 &&
    dataAllColor?.map((item) => ({
      value: item.id,
      label: item.description,
    }));

  const flattenCategories = (categories) => {
    const result = [];

    categories?.forEach((category) => {
      // Add the main category
      result.push({ value: category.id, label: category.name });

      // Add its children if any
      if (category.children && category.children.length > 0) {
        category?.children?.forEach((child) => {
          result.push({ value: child.id, label: child.name });
        });
      }
    });
    return result;
  };

  const optionCategory = flattenCategories(dataAllCategory);

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

  // Cập nhật mảng allImgs mỗi khi bigImg hoặc smallImgs thay đổi
  useEffect(() => {
    setAllImgs([bigImg, ...smallImgs]);
  }, [bigImg, smallImgs]);

  // Hàm thêm một ảnh nhỏ vào danh sách
  const addImageUpload = () => {
    setSmallImgs([...smallImgs, ""]);
  };

  // Hàm xóa một ảnh nhỏ khỏi danh sách
  const removeImageUpload = (index) => {
    const newSmallImgs = smallImgs.filter((_, i) => i !== index);
    setSmallImgs(newSmallImgs);
  };

  const handleAddProductForm = (data) => {
    const dataForm = {
      name: data.name,
      categoryId: idCategory,
      description: description,
      price: Number(data.price),
      discount: Number(data.discount) || 0,
      quantity: Number(data.quantity),
      properties: { arrSize: arrSize, arrColor: arrColor },
      image: allImgs,
      callBack: () => {
        navigate(Epath.products);
        toast.success("Thêm sản phẩm thành công !");
      },
    };

    if (!dataForm.price) {
      return toast.error("Giá là trường bắt buộc", { autoClose: 800 });
    }

    if (!dataForm.quantity) {
      return toast.error("Số Lượng là trường bắt buộc", { autoClose: 800 });
    }

    if (!dataForm?.image?.[0]) {
      return toast.error("Ảnh Chính là trường bắt buộc", { autoClose: 800 });
    }

    dispatch(handleAddProduct(dataForm));
  };

  return (
    <form onSubmit={handleSubmit(handleAddProductForm)}>
      <LayoutDetail title="Thêm Sản Phẩm">
        <div className="grid grid-cols-5 gap-x-5">
          <div className="col-span-3">
            <Box className="h-full">
              <div className="flex flex-col gap-y-8">
                <BoxFiled title="Tên ">
                  <Input
                    control={control}
                    name="name"
                    placeholder="Tên Sản Phẩm"
                  ></Input>
                </BoxFiled>
                <BoxFiled title="Danh Mục">
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
                    onSelect={(value) => setIdCategory(value)}
                    options={optionCategory}
                  />
                </BoxFiled>
                <BoxFiled title="Biến Thể Sản Phẩm" require={false}>
                  <div className="flex items-center gap-x-4">
                    <Select
                      mode="multiple"
                      style={{
                        width: "100%",
                      }}
                      placeholder="Chọn size"
                      onChange={(value) => setArrSize([...value])}
                      options={optionSize}
                    />

                    <Select
                      mode="multiple"
                      style={{
                        width: "100%",
                      }}
                      placeholder="Chọn Màu Sắc"
                      onChange={(value) => setArrColor([...value])}
                      options={optionColor}
                    />
                  </div>
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
              </div>
            </Box>
          </div>
          <div className="col-span-2">
            <div className="flex flex-col gap-y-4">
              <Box>
                <div className="flex flex-col gap-y-2">
                  <BoxFiled title="Ảnh Chính">
                    <div className="relative">
                      <ImageUpload
                        className="min-w-[400px] h-[400px]"
                        modeSmall
                        name="bigImg"
                        onChange={(name, data) => setBigImg(data.url)}
                        getValues={bigImg}
                        setValue={setValue}
                      ></ImageUpload>
                      {bigImg && (
                        <button
                          onClick={() => setBigImg("")}
                          className="absolute top-[-20px] right-0 p-1 text-white rounded-full"
                        >
                          <CircleX color="#ccc" />
                        </button>
                      )}
                    </div>
                  </BoxFiled>
                  <BoxFiled title="Hình Ảnh Nhỏ">
                    <div
                      className="inline-block py-1 px-1 bg-slate-500 rounded-sm cursor-pointer"
                      onClick={addImageUpload}
                    >
                      <Plus color="#FFF" size={"16px"}></Plus>
                    </div>
                    <div className="grid grid-cols-4 gap-x-2 gap-y-5 mt-4">
                      {smallImgs.map((url, index) => (
                        <div className="relative" key={index}>
                          <ImageUpload
                            modeSmall={true}
                            name={`image_${index}`}
                            onChange={(name, data) => {
                              const newSmallImgs = [...smallImgs];
                              newSmallImgs[index] = data.url;
                              setSmallImgs(newSmallImgs);
                            }}
                            getValues={url}
                            setValue={setValue}
                            className="w-[80px] h-[80px]"
                          />
                          <div
                            onClick={() => removeImageUpload(index)}
                            className="absolute top-[-20px] right-0 p-1 text-white rounded-full cursor-pointer"
                          >
                            <CircleX color="#ccc" />
                          </div>
                        </div>
                      ))}
                    </div>
                  </BoxFiled>
                </div>
              </Box>
              <Box className="flex flex-col gap-y-4">
                <BoxFiled title="Giá">
                  <Input
                    control={control}
                    name="price"
                    type="number"
                    placeholder="Giá sản phẩm"
                    min="2000"
                  ></Input>
                </BoxFiled>
                <BoxFiled title="Giảm Giá" require={false}>
                  <Input
                    control={control}
                    name="discount"
                    type="number"
                    placeholder="Giảm Giá (%)..."
                    min="0"
                    max="99"
                  ></Input>
                </BoxFiled>
                <BoxFiled title="Số Lượng">
                  <Input
                    control={control}
                    name="quantity"
                    type="number"
                    placeholder="Số Lượng ..."
                    min="1"
                  ></Input>
                </BoxFiled>
              </Box>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-x-3 mt-10 justify-center">
          <Button
            kind="discard"
            className="w-[200px] rounded-lg overflow-hidden hover:opacity-80"
            href={Epath.products}
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
      </LayoutDetail>
    </form>
  );
};

export default AddProductPage;
