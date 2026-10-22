import { Minus, Plus } from "lucide-react";
import React from "react";
import { useController, useForm } from "react-hook-form";

const ProHandleQuantity = ({
  control,
  name,
  quantity = 1,
  id,
  allow = false,
  className = "",
}) => {
  const { field } = useController({
    control,
    name,
    defaultValue: quantity,
  });

  const handleIncrease = () => {
    // Lấy giá trị hiện tại của trường nhập liệu thông qua field
    const currentQuantity = field.value;
    const newQuantity = parseInt(currentQuantity, 10) + 1;
    field.onChange(newQuantity);
  };

  const handleDecrease = () => {
    const currentQuantity = field.value;
    if (currentQuantity > 1) {
      const newQuantity = parseInt(currentQuantity, 10) - 1;
      field.onChange(newQuantity);
    }
  };

  return (
    <div
      className={`inline-flex items-center gap-x-2  p-2 border-[2px] w-[150px] rounded-lg ${className}`}
    >
      <span
        className="block bg-gray-200 rounded-full p-[10px] cursor-pointer"
        onClick={handleDecrease}
      >
        <Minus size={"14px"}></Minus>
      </span>
      <input
        value={field.value}
        className="w-[40px] text-center border-none outline-none"
        onChange={field.onChange}
        {...field}
      ></input>
      <span
        className="block bg-gray-200 rounded-full p-[10px] cursor-pointer"
        onClick={handleIncrease}
      >
        <Plus size={"14px"}></Plus>
      </span>
    </div>
  );
};

export default ProHandleQuantity;
