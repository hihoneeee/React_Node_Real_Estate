/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { apiUpdateProfile } from "src/apis/user";
import { InputFileV2, InputForm } from "src/components";
import Button from "src/components/common/button";
import withRouter from "src/hocs/withRouter";
import { useUserContext } from "src/hooks/useContextApi";

const Profile = ({ navigate }) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    watch,
  } = useForm();
  const current = useUserContext();
  const [avatarPreview, setAvatarPreview] = useState("");

  useEffect(() => {
    if (current) {
      reset({
        first_name: current.first_name,
        last_name: current.last_name,
        avatar: current.avatar,
        email: current.email,
        phone: current.phone,
        address: current.address,
      });
      setAvatarPreview(current.avatar);
    }
  }, [current, reset]);

  const avatar = watch("avatar");

  useEffect(() => {
    if (avatar && avatar.length > 0 && avatar[0] instanceof File) {
      const file = avatar[0];
      setAvatarPreview(URL.createObjectURL(file));
    }
  }, [avatar]);

  const onSubmit = async (data) => {
    const { email, phone, ...payload } = data;
    const response = await apiUpdateProfile(payload);
    if (response.success) {
      toast.success(response.message);
      navigate("/");
    } else {
      toast.error(response.message);
    }
  };

  return (
    <form className="p-4 flex items-center gap-2">
      <div className="w-[20%] flex flex-col items-center gap-2">
        <img
          alt="avatar"
          src={avatarPreview}
          className="rounded-full h-32 w-32"
        />
        <InputFileV2
          text="Change avatar"
          containerClassName="px-3 py-2 bg-main-500 text-white rounded-lg mobile:text-xxs laptop:text-xs"
          id="avatar"
          register={register}
        />
      </div>
      <div className="space-y-4 w-[80%]">
        <div className="space-y-3">
          <h3 className="text-base font-semibold">
            <span className="border-l-8 border-main-500 mr-1"></span>
            My Profile
          </h3>
          <div className="flex items-center gap-2">
            <InputForm
              register={register}
              id="first_name"
              label="First Name"
              validate={{ required: "This field can't be empty!" }}
              containerClassName="w-full"
              errors={errors}
            />
            <InputForm
              register={register}
              id="last_name"
              label="Last Name"
              validate={{ required: "This field can't be empty!" }}
              errors={errors}
              containerClassName="w-full"
            />
          </div>
          <div className="flex items-center gap-2">
            <InputForm
              register={register}
              id="email"
              label="Email"
              containerClassName="w-full"
              setReadonly={true}
            />
            <InputForm
              register={register}
              id="phone"
              label="Phone"
              setReadonly={true}
              validate={{ required: "This field can't be empty!" }}
              errors={errors}
              containerClassName="w-full"
            />
          </div>
          <InputForm
            register={register}
            id="address"
            label="Address"
            validate={{ required: "This field can't be empty!" }}
            errors={errors}
            containerClassName="w-full"
          />
        </div>
        <div className="flex flex-row-reverse">
          <Button
            className="bg-main-500 px-3 py-2 text-white rounded-md"
            text="Save Change"
            onClick={handleSubmit(onSubmit)}
          />
        </div>
      </div>
    </form>
  );
};

export default withRouter(Profile);
