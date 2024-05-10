import clsx from "clsx";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { apiRegister, apiLogin } from "src/apis/auth";
import { Button, InputForm, InputRadio } from "src/components";
import { useAppStore } from "src/store/useAppStore";
import { useUserStore } from "src/store/useUserStore";
import icons from "src/utils/icons";
import Swal from "sweetalert2";
const { MdCancel } = icons;
const Login = () => {
  const [variant, setvariant] = useState("login");
  const [isloading, setisloading] = useState(false);
  const { setModal } = useAppStore();
  const { setToken } = useUserStore();
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();
  useEffect(() => {
    reset();
  }, [variant]);
  const onSubmit = async (data) => {
    if (variant === "register") {
      setisloading(true);
      const response = await apiRegister(data);
      setisloading(false);
      if (response.success) {
        Swal.fire({
          icon: "success",
          title: "Congratulation!",
          text: response.msg,
          showConfirmButton: true,
          confirmButtonText: "Go sign in",
        }).then(({ isConfirmed }) => {
          if (isConfirmed) setvariant("login");
        });
      } else toast.error(response.msg);
    }
    if (variant === "login") {
      const { name, roleCode, ...payload } = data;
      setisloading(true);
      const response = await apiLogin(data);
      setisloading(false);
      if (response.success) {
        toast.success(response.msg);
        setModal(false, null);
        setToken(response.access_token);
      } else toast.error(response.msg);
    }
  };
  return (
    <div
      className="p-6 bg-white rounded-md w-[30%] space-y-4 relative"
      onClick={(e) => e.stopPropagation()}
    >
      <h1 className="font-bold lg:text-xl textbase text-main-500 text-center">
        Welcome to RealEstate
      </h1>
      <div className="flex items-center border-b lg:text-base text-sm gap-4">
        <span
          onClick={() => setvariant("login")}
          className={clsx(
            variant === "login" && "border-b-2 border-main-500 text-main-500",
            "py-4 hover:text-main-400 cursor-pointer"
          )}
        >
          Sign in
        </span>
        <span
          onClick={() => setvariant("register")}
          className={clsx(
            variant === "register" &&
              "border-b-2 border-main-500 text-main-500",
            "py-4 hover:text-main-400 cursor-pointer"
          )}
        >
          New account
        </span>
      </div>
      <form className="flex flex-col gap-4">
        {variant === "register" && (
          <InputForm
            register={register}
            id="name"
            label="Full name"
            placeholder="Enter your name..."
            validate={{ required: "This field can't emty!" }}
            errors={errors}
          />
        )}
        <InputForm
          register={register}
          id="phone"
          label="Phone number"
          placeholder="Enter your phone..."
          validate={{
            required: "This field can't emty!",
            pattern: {
              value: /(84|0[3|5|7|8|9])+([0-9]{8})\b/,
              message: "Phone number is invalid",
            },
          }}
          errors={errors}
        />
        <InputForm
          register={register}
          id="password"
          label="Password"
          placeholder="Enter your password..."
          type="password"
          validate={{ required: "This field can't emty!" }}
          errors={errors}
        />
        {variant === "register" && (
          <InputRadio
            register={register}
            errors={errors}
            id="roleCode"
            label="Type account"
            validate={{ required: "This field can't emty!" }}
            options={[
              { label: "User", value: "SU4" },
              { label: "Agent", value: "GA5" },
            ]}
          />
        )}
        <Button
          disabled={isloading}
          onClick={handleSubmit(onSubmit)}
          className="bg-main-700 px-3 py-2 w-full text-white rounded-md"
          text={variant === "login" ? "Sign in" : "Register"}
        />
      </form>
      {variant === "login" && (
        <p className="text-xss lg:text-xs font-medium">
          Forgot password? Dont worry you can get it back{" "}
          <span className="text-main-500 hover:text-red-500 hover:underline cursor-pointer font-bold">
            Here!
          </span>
        </p>
      )}
      <MdCancel
        className="absolute top-0 right-5 cursor-pointer lg:text-xl text-base hover:text-red-500 text-main-500"
        onClick={() => setModal(false, null)}
      />
    </div>
  );
};

export default Login;
