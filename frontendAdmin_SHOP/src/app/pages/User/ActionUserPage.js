import React, { useEffect, useState } from "react";
import LayoutDetail from "../../components/Layout/LayoutDetail";
import { useForm } from "react-hook-form";
import Box from "../../components/Commom/Box";
import ImageUpload from "../../components/Image/ImageUpload";
import BoxFiled from "../../components/Commom/BoxFiled";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import { Epath } from "../../routes/routerConfig";
import { useNavigate, useParams } from "react-router-dom";
import { Radio } from "antd";
import { LIMIT_HIGH, statusRole } from "../../../utils/commom";
import { useDispatch, useSelector } from "react-redux";
import {
  handleAddUser,
  handleGetUser,
  handleUpdateUser,
} from "../../../store/user/handleUser";
import { toast } from "react-toastify";

// sửa backend phần update
const ActionUserPage = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
  } = useForm({
    // resolver: yupResolver(InfoSettingSchema),
    mode: "onChange",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [valueRole, setValueRole] = useState(1);
  const { id } = useParams();

  useEffect(() => {
    dispatch(handleGetUser({ limit: LIMIT_HIGH }));
  }, [dispatch]);

  const dataUser = useSelector((state) => state.user.dataUser.results);
  const { dataCurrentUser } = useSelector((state) => state.user);

  const dataDetailsUser =
    dataUser?.length > 0 && dataUser?.find((item) => item.id === Number(id));

  const handleActionUser = (data) => {
    if (!id) {
      const dataform = {
        ...data,
        roleID: valueRole,
        callBack: () => {
          toast.success("Thêm Thành Công !", { autoClose: 800 });
          navigate(Epath.users);
        },
      };
      dispatch(handleAddUser(dataform));
    } else {
      const dataform = {
        ...data,
        roleID: valueRole,
        idUser: id,
        callBack: () => {
          toast.success("Cập Nhật Thành Công !", { autoClose: 800 });
          navigate(Epath.users);
        },
      };
      dispatch(handleUpdateUser(dataform));
    }
  };

  useEffect(() => {
    if (id) {
      setValue("userName", dataDetailsUser?.userName);
      setValue("email", dataDetailsUser?.email);
      setValue("phoneNumber", dataDetailsUser?.phoneNumber);
      setValueRole(dataDetailsUser?.roleID);
    }
  }, [dataDetailsUser]);

  useEffect(() => {
    if (dataCurrentUser.roleID === statusRole.STAFF) {
      navigate("/");
    }
  }, [dataCurrentUser.roleID, navigate]);

  return (
    <div>
      <LayoutDetail title="Thêm Người Dùng">
        <form onSubmit={handleSubmit(handleActionUser)}>
          <Box>
            <div className="flex flex-col gap-y-4">
              <div className="flex items-center justify-center mt-3">
                <ImageUpload
                  className="w-[200px] h-[200px] rounded-full"
                  name="avatar"
                  onChange={(name, data) => setValue("avatar", data.url)}
                  getValues={getValues("avatar") || dataDetailsUser?.avatar}
                  setValue={setValue}
                ></ImageUpload>
              </div>
              <BoxFiled title="Tên " className="w-full">
                <Input
                  control={control}
                  name="userName"
                  placeholder="Tên của bạn..."
                  error={errors.userName?.message}
                ></Input>
              </BoxFiled>
              <BoxFiled title="Email " className="w-full">
                <Input
                  control={control}
                  name="email"
                  placeholder="Email của bạn..."
                  error={errors.email?.message}
                ></Input>
              </BoxFiled>
              <BoxFiled title="Số điện thoại " className="w-full">
                <Input
                  control={control}
                  name="phoneNumber"
                  placeholder="Số điện thoại của bạn..."
                  error={errors.phoneNumber?.message}
                ></Input>
              </BoxFiled>

              {!id && (
                <BoxFiled title="Mật Khẩu " className="w-full">
                  <Input
                    control={control}
                    name="password"
                    placeholder="Mật Khẩu ..."
                    type="password"
                  ></Input>
                </BoxFiled>
              )}

              {/* <BoxFiled
                title="Mật Khẩu Hiện Tại "
                className="w-full"
                require={false}
              >
                <Input
                  control={control}
                  name="currentPassword"
                  placeholder="Mật Khẩu hiện tại của bạn..."
                  type="password"
                ></Input>
              </BoxFiled>

              <BoxFiled
                title="Mật Khẩu Mới "
                className="w-full"
                require={false}
              >
                <Input
                  control={control}
                  name="password"
                  placeholder="Mật Khẩu mới của bạn..."
                  type="password"
                ></Input>
              </BoxFiled> */}

              <BoxFiled title="Vai trò " className="w-full">
                <Radio.Group
                  onChange={(e) => setValueRole(e.target.value)}
                  value={valueRole}
                >
                  <Radio value={statusRole.USER}>Người Dùng</Radio>
                  <Radio value={statusRole.STAFF}>Nhân Viên</Radio>
                  <Radio value={statusRole.ADMIN}>Quản trị viên</Radio>
                </Radio.Group>
              </BoxFiled>

              <div className="flex items-center justify-center gap-x-3 mt-6">
                <Button
                  className="py-3 px-4 rounded-lg overflow-hidden w-[200px] hover:opacity-85"
                  kind="discard"
                  type="submit"
                  href={Epath.users}
                >
                  Quay Lại
                </Button>

                {id ? (
                  <Button
                    className="py-3 px-4 rounded-lg overflow-hidden w-[200px] hover:opacity-85"
                    kind="primary"
                    type="submit"
                  >
                    Cập Nhật
                  </Button>
                ) : (
                  <Button
                    className="py-3 px-4 rounded-lg overflow-hidden w-[200px] hover:opacity-85"
                    kind="primary"
                    type="submit"
                  >
                    Thêm
                  </Button>
                )}
              </div>
            </div>
          </Box>
        </form>
      </LayoutDetail>
    </div>
  );
};

export default ActionUserPage;
