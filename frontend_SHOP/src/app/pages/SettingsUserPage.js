import React, { useEffect } from "react";
import Box from "../components/Commom/Box";
import { useForm } from "react-hook-form";
import FlexCol from "../components/Commom/FlexCol";
import Input from "../components/Input/Input";
import ImageUpload from "../components/Image/ImageUpload";
import Button from "../components/Button/Button";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { handleUpdateInfoUser } from "../../store/user/handleUser";

const InfoSettingSchema = yup.object().shape({
  userName: yup.string().required("Tên người dùng không được để trống."),
  email: yup
    .string()
    .email("Email không hợp lệ hoặc bị thiếu.")
    .required("Email không được để trống."),

  phoneNumber: yup
    .string()
    .required("Số điện thoại không được để trống.")
    .matches(
      /^(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})$/,
      "Số điện thoại không hợp lệ."
    ),
});

const ChangePassSchema = yup.object().shape({
  password: yup
    .string()
    .min(6, "Mật Khẩu phải có ít nhất 6 ký tự.")
    .max(30, "Mật Khẩu không được vượt quá 30 ký tự.")
    .required("Mật Khẩu không được để trống."),
  currentPassword: yup
    .string()
    .min(6, "Mật Khẩu phải có ít nhất 6 ký tự.")
    .max(30, "Mật Khẩu không được vượt quá 30 ký tự.")
    .required("Mật Khẩu không được để trống."),
});

const SettingsUserPage = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
  } = useForm({
    resolver: yupResolver(InfoSettingSchema),
    mode: "onChange",
  });

  const {
    control: control2,
    handleSubmit: handleSubmit2,
    formState: { errors: errors2 },
  } = useForm({
    resolver: yupResolver(ChangePassSchema),
    mode: "onChange",
  });
  const dispatch = useDispatch();

  const { dataCurrentUser } = useSelector((state) => state.user);

  const handleSettingUser = (data) => {
    dispatch(handleUpdateInfoUser(data));
  };

  const handleChangePassword = (data) => {
    dispatch(handleUpdateInfoUser(data));
  };

  useEffect(() => {
    setValue("userName", dataCurrentUser?.userName);
    setValue("email", dataCurrentUser?.email);
    setValue("phoneNumber", dataCurrentUser?.phoneNumber);
    setValue("avatar", dataCurrentUser?.avatar);
  }, [dataCurrentUser, setValue]);

  return (
    <div>
      <form onSubmit={handleSubmit(handleSettingUser)}>
        <Box title="Cài Đặt Tài Khoản">
          <div className="flex flex-col gap-y-4">
            <div className="flex items-center justify-center mt-3">
              <ImageUpload
                className="w-[200px] h-[200px] rounded-full"
                name="avatar"
                onChange={(name, data) => setValue("avatar", data.url)}
                getValues={getValues("avatar") || dataCurrentUser?.avatar}
                setValue={setValue}
              ></ImageUpload>
            </div>
            <FlexCol title="Tên " className="w-full">
              <Input
                control={control}
                name="userName"
                placeholder="Tên của bạn..."
                error={errors.userName?.message}
              ></Input>
            </FlexCol>
            <FlexCol title="Email " className="w-full">
              <Input
                control={control}
                name="email"
                placeholder="Email của bạn..."
                error={errors.email?.message}
              ></Input>
            </FlexCol>
            <FlexCol title="Số điện thoại " className="w-full">
              <Input
                control={control}
                name="phoneNumber"
                placeholder="Số điện thoại của bạn..."
                error={errors.phoneNumber?.message}
              ></Input>
            </FlexCol>

            <Button
              className="py-3 px-4 rounded-lg overflow-hidden"
              kind="primary"
              type="submit"
            >
              Lưu Thay Đổi
            </Button>
          </div>
        </Box>
      </form>
      <form onSubmit={handleSubmit2(handleChangePassword)}>
        <Box title="Thay đổi mật khẩu" className="mt-10">
          <div className="flex flex-col gap-y-4">
            <FlexCol title="Mật Khẩu Cũ" className="w-full">
              <Input
                control={control2}
                name="currentPassword"
                placeholder="Mật Khẩu cũ của bạn..."
                type="password"
                error={errors2.currentPassword?.message}
              ></Input>
            </FlexCol>

            <FlexCol title="Mật Khẩu Mới" className="w-full">
              <Input
                control={control2}
                name="password"
                placeholder="Mật Khẩu mới của bạn..."
                type="password"
                error={errors2.password?.message}
              ></Input>
            </FlexCol>

            <Button
              className="py-3 px-4 rounded-lg overflow-hidden"
              kind="primary"
              type="submit"
            >
              Lưu Thay Đổi
            </Button>
          </div>
        </Box>
      </form>
    </div>
  );
};

export default SettingsUserPage;
