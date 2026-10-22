import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import { Epath } from "../../routes/routerConfig";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
import { handleRegister } from "../../../store/auth/handleAuth";
import { useNavigate } from "react-router-dom";
import { getTokenFromLocalStorage } from "../../../utils/localStorage";

const registerSchema = yup.object().shape({
  email: yup
    .string()
    .email("Email không hợp lệ hoặc bị thiếu.")
    .required("Email không được để trống."),
  password: yup
    .string()
    .min(6, "Mật Khẩu phải có ít nhất 6 ký tự.")
    .max(30, "Mật Khẩu không được vượt quá 30 ký tự.")
    .required("Mật Khẩu không được để trống."),
  ConfirmPassword: yup
    .string()
    .min(6, "Mật Khẩu xác nhận phải có ít nhất 6 ký tự.")
    .max(30, "Mật Khẩu xác nhận không được vượt quá 30 ký tự.")
    .required("Mật Khẩu xác nhận không được để trống."),
  phoneNumber: yup
    .string()
    .matches(
      /^(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})$/,
      "Số điện thoại không hợp lệ."
    )
    .required("Số điện thoại không được để trống."),
  userName: yup.string().required("Tên người dùng không được để trống."),
});

const RegisterPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: yupResolver(registerSchema),
    mode: "onChange",
  });
  const { dataCurrentUser } = useSelector((state) => state.user);

  const [errConfirmPass, setErrorConfirmPass] = useState("");

  const { loading } = useSelector((state) => state.auth);

  const handleRegisterForm = (data) => {
    if (data.ConfirmPassword !== data.password) {
      setErrorConfirmPass("Mật khẩu Nhập Lại trùng khớp với mật khẩu");
    } else {
      setErrorConfirmPass("");
      const { ConfirmPassword, ...rest } = data;
      dispatch(
        handleRegister({ ...rest, callback: () => navigate(Epath.loginPage) })
      );
    }
  };

  useEffect(() => {
    const isAuthenticated = !!(
      dataCurrentUser &&
      Object.keys(dataCurrentUser).length &&
      getTokenFromLocalStorage()
    );
    if (isAuthenticated) {
      navigate(Epath.homePage);
    }
  }, [dataCurrentUser, navigate]);

  return (
    <div className="pb-[140px] pt-[180px]  px-[300px] ">
      <div className="bg-white shadow-custom2 rounded-[14px]">
        <div className="flex justify-between">
          <form
            onSubmit={handleSubmit(handleRegisterForm)}
            className="py-10 px-6 min-w-[400px] flex-1"
          >
            <h1 className="text-center text-[28px] text-textBold font-semibold">
              Đăng Ký
            </h1>

            <div className="flex flex-col gap-y-5 py-6 px-10">
              <Input
                control={control}
                name="userName"
                placeholder="Nhập Tên ...."
                error={errors.userName?.message}
              ></Input>
              <Input
                control={control}
                name="phoneNumber"
                placeholder="Nhập Số Điện Thoại ...."
                error={errors.phoneNumber?.message}
              ></Input>
              <Input
                control={control}
                name="email"
                placeholder="Nhập Email ...."
                error={errors.email?.message}
              ></Input>
              <Input
                control={control}
                name="password"
                type="password"
                placeholder="Nhập Mật Khẩu ...."
                error={errors.password?.message}
              ></Input>
              <Input
                control={control}
                name="ConfirmPassword"
                type="password"
                placeholder="Nhập Lại Mật Khẩu ...."
                error={errors.ConfirmPassword?.message || errConfirmPass}
              ></Input>
            </div>

            <div className="w-full flex items-center justify-center">
              <Button
                kind="primary"
                className="py-3 px-[45px] w-[180px] rounded-md transition-all hover:opacity-90"
                type="submit"
                isLoading={loading}
              >
                Đăng Ký
              </Button>
            </div>
          </form>

          <div className="flex-1 bg-primary min-h-[450px] w-[400px] rounded-custom relative">
            <div className="absolute top-2/4 -translate-y-2/4 flex flex-col items-center gap-y-4">
              <h1 className="text-center text-[28px] text-white font-semibold">
                Chào mừng trở lại !
              </h1>
              <p className="text-white text-center px-5">
                Nhập Thông tin chi tiết của bạn để sử dụng các chức năng nổi bật
                nhất của chúng tôi
              </p>
              <Button
                kind="ghost"
                className="py-3 px-[45px] w-[180px] rounded-md  transition-all hover:bg-white hover:text-primary"
                href={Epath.loginPage}
              >
                Đăng Nhập
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
