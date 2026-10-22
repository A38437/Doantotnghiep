import React, { useEffect, useState } from "react";
import LayoutDetail from "../../components/Layout/LayoutDetail";
import { Link, useParams } from "react-router-dom";
import { FilePenLine, Save, Trash } from "lucide-react";
import Image from "../../components/Image/Image";
import { Modal, Select, Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  handleAddProductDetails,
  handleDeleteProductDetails,
  handleGetAllColor,
  handleGetAllSize,
  handleGetDetailsProduct,
  handleUpdateQuantityProductDetails,
} from "../../../store/product/handleProduct";
import Input from "../../components/Input/Input";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import Button from "../../components/Button/Button";
import BoxFiled from "../../components/Commom/BoxFiled";

const ProductDetailsPage = () => {
  const dispatch = useDispatch();
  const { control, setValue } = useForm();
  const { id } = useParams();
  const paramsTemp = useParams();

  const [idSize, setIdSize] = useState();
  const [idColor, setIdColor] = useState();
  const [quantity, setQuantity] = useState();
  const [idProductVariant, setIdProductVariant] = useState();

  useEffect(() => {
    dispatch(handleGetAllSize({ type: "size" }));
    dispatch(handleGetAllColor({ type: "color" }));
  }, []);

  const { dataAllSize } = useSelector((state) => state.product);
  const { dataAllColor } = useSelector((state) => state.product);

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

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpen2, setIsModalOpen2] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };

  const showModal2 = (record) => {
    setIdSize(record?.size?.id || null);
    setIdColor(record?.color?.id || null);
    setValue("quantity", record?.quantity);
    setQuantity(record?.quantity);
    setIdProductVariant(record?.id);
    setIsModalOpen2(true);
  };
  const handleOk = () => {
    const dataForm = {
      idProduct: id,
      idSize: idSize,
      idColor: idColor,
      quantity: quantity,
      callBack: () => {
        dispatch(handleGetDetailsProduct(paramsTemp?.id));
        toast.success("Thêm Thành Công!", { autoClose: 800 });
        setIsModalOpen(false);
      },
    };
    dispatch(handleAddProductDetails(dataForm));

    // setIsModalOpen(false);
  };

  const handleOk2 = () => {
    const updatedQuantityData = {
      id: idProductVariant,
      idSize: idSize,
      idColor: idColor,
      quantity: quantity,
      idProduct: id,
      callBack: () => {
        toast.success("Cập nhật số lượng thành công", { autoClose: 800 });
        dispatch(handleGetDetailsProduct(paramsTemp?.id));
        handleCancel2();
      },
    };
    dispatch(handleUpdateQuantityProductDetails(updatedQuantityData));
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleCancel2 = () => {
    setIsModalOpen2(false);
    setValue("quantity", undefined);
  };

  useEffect(() => {
    dispatch(handleGetDetailsProduct(id));
  }, [id]);

  const dataDetailsProduct = useSelector(
    (state) => state.product.dataDetailsProduct
  );

  const [editStates, setEditStates] = useState({});
  const [editValues, setEditValues] = useState({});

  const toggleEdit = (id) => {
    setEditStates((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };

  const handleInputChange = (e, id, field) => {
    const { value } = e.target;
    setEditValues((prevValues) => ({
      ...prevValues,
      [id]: {
        ...prevValues[id],
        [field]: value,
      },
    }));
  };

  const saveEdit = (record) => {
    const { id } = record;
    const updatedQuantityData = {
      id: id,
      idSize: record.size.id,
      idColor: record.color.id,
      quantity: Number(editValues[id]?.quantity) || record.quantity,
      callBack: () => {
        toast.success("Cập nhật số lượng thành công", { autoClose: 800 });
        dispatch(handleGetDetailsProduct(paramsTemp?.id));
        toggleEdit(id);
      },
    };
    dispatch(handleUpdateQuantityProductDetails(updatedQuantityData));
  };

  const handleDeleteProductDetailsForm = (id) => {
    Swal.fire({
      title: `Bạn muốn xóa ?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Đúng vậy",
      cancelButtonText: "Hủy Bỏ",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(
          handleDeleteProductDetails({
            id: id,
            callBack: () => {
              toast.success("Xóa Thành Công !", { autoClose: 800 });
              dispatch(handleGetDetailsProduct(paramsTemp?.id));
            },
          })
        );
      }
    });
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      render: (id) => <h1>#{id}</h1>,
    },
    {
      title: "Size",
      dataIndex: "size",
      key: "size",
      render: (size) => <h1>{size.title}</h1>,
    },

    {
      title: "Màu Sắc",
      dataIndex: "color",
      key: "color",
      render: (color) => <h1>{color.title}</h1>,
    },

    {
      title: "Số Lượng",
      dataIndex: "quantity",
      key: "quantity",

      width: "20%",
      render: (quantity, record) => {
        return editStates[record.id] ? (
          <input
            name="quantity"
            type="number"
            className="!w-[80px] !h-[20px] border border-text1 rounded-sm"
            defaultValue={editValues[record.id]?.quantity || quantity}
            onChange={(e) => handleInputChange(e, record.id, "quantity")}
          />
        ) : (
          quantity
        );
      },
    },

    {
      title: "Hành Động",
      key: "action",
      render: (record) => (
        <div className="flex items-center gap-x-3">
          <div
            className="cursor-pointer hover:text-primary transition-all"
            onClick={() => showModal2(record)}
          >
            <FilePenLine size={"20px"} />
          </div>

          <span className="cursor-pointer hover:text-error transition-all">
            <Trash
              size={"20px"}
              onClick={() => {
                handleDeleteProductDetailsForm(record.id);
              }}
            />
          </span>
        </div>
      ),
    },
  ];

  const data =
    dataDetailsProduct?.ProductDetails?.length > 0
      ? dataDetailsProduct?.ProductDetails?.map((item) => ({
          key: item.id,
          id: item.id,
          size: {
            id: item?.properties?.size?.id,
            title: item?.properties?.size?.description,
          },
          color: {
            id: item?.properties?.color?.id,
            title: item?.properties?.color?.description,
          },
          quantity: item?.quantity,
        }))
      : [];

  // const data = [{ key: 1, id: 1, size: "XL", color: "Trắng", quantity: 50 }];
  return (
    <LayoutDetail title="Chi tiết sản phẩm">
      <Modal
        title="Thêm thuộc tính"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Thêm"
        cancelText="Hủy Bỏ"
      >
        <div className="mt-5">
          <div className="">
            <BoxFiled require={false} title="Size">
              <Select
                // mode="multiple"
                style={{
                  width: "100%",
                }}
                placeholder="Chọn size"
                onChange={(value) => setIdSize(value)}
                options={optionSize}
              />
            </BoxFiled>

            <div className="my-5">
              <BoxFiled require={false} title="Màu Sắc">
                <Select
                  // mode="multiple"
                  style={{
                    width: "100%",
                  }}
                  placeholder="Chọn Màu Sắc"
                  onChange={(value) => setIdColor(value)}
                  options={optionColor}
                />
              </BoxFiled>
            </div>

            <BoxFiled require={false} title="Số Lượng">
              <Input
                control={control}
                name="quantity"
                placeholder="Số Lượng ..."
                className="!py-2"
                type="number"
                min="1"
                onChange={(e) => setQuantity(Number(e.target.value))}
              ></Input>
            </BoxFiled>
          </div>
        </div>
      </Modal>

      <Modal
        title="Cập nhật thuộc tính"
        open={isModalOpen2}
        onOk={handleOk2}
        onCancel={handleCancel2}
        okText="Cập Nhật"
        cancelText="Hủy Bỏ"
      >
        <div className="mt-5">
          <div className="">
            <BoxFiled require={false} title="Size">
              <Select
                // mode="multiple"
                style={{
                  width: "100%",
                }}
                placeholder="Chọn size"
                value={idSize}
                onChange={(value) => setIdSize(value)}
                options={optionSize}
              />
            </BoxFiled>

            <div className="my-5">
              <BoxFiled require={false} title="Màu Sắc">
                <Select
                  // mode="multiple"
                  style={{
                    width: "100%",
                  }}
                  placeholder="Chọn Màu Sắc"
                  value={idColor}
                  onChange={(value) => setIdColor(value)}
                  options={optionColor}
                />
              </BoxFiled>
            </div>

            <BoxFiled require={false} title="Số Lượng">
              <Input
                control={control}
                name="quantity"
                placeholder="Số Lượng ..."
                className="!py-2"
                type="number"
                min="1"
                onChange={(e) => setQuantity(Number(e.target.value))}
              ></Input>
            </BoxFiled>
          </div>
        </div>
      </Modal>
      <div>
        <div className="flex items-center gap-x-3">
          <div className="flex items-center gap-x-4">
            <div>
              <Image
                url={dataDetailsProduct?.image?.[0]?.url}
                className="w-[80px] h-[80px] rounded-lg overflow-hidden"
              ></Image>
            </div>

            <h1 className="text-text1 font-semibold text-[18px] multiline-ellipsis ">
              {dataDetailsProduct?.name}
            </h1>
          </div>
        </div>
        <div className="flex items-center justify-end my-6 ">
          <Button kind="primary" className="rounded-lg " onClick={showModal}>
            Thêm Các Thuộc Tính
          </Button>
        </div>
        <Table
          columns={columns}
          dataSource={data}
          className="text-text1 font-semibold text-[16px] mt-10"
          pagination={false}
        />
      </div>
    </LayoutDetail>
  );
};

export default ProductDetailsPage;
