import clsx from "clsx";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { apiRegister, apiLogin, apiCheckPhoneNumber } from "src/apis/auth";
import { Button, InputForm, InputRadio, VerifyOTP } from "src/components";
import { useAppStore } from "src/store/useAppStore";
import { useUserStore } from "src/store/useUserStore";
import auth from "src/utils/fireBaseConfig";
import icons from "src/utils/icons";
import Swal from "sweetalert2";
import { twMerge } from "tailwind-merge";
const { MdCancel } = icons;

const Login = () => {
  const [variant, setVariant] = useState("login");
  const [isLoading, setIsLoading] = useState(false);
  const [isShowOTP, setIsShowOTP] = useState(false);
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

  // xác thực và tạo captcha
  const handleCaptchaVerify = () => {
    if (!window.recaptchVerify) {
      window.recaptchVerify = new RecaptchaVerifier(auth, "recaptch-verifier", {
        size: "invisible",
        callback: () => {},
        "expired-callback": () => {},
      });
    }
  };

  // send captcha
  const handleSendOTP = async (phone) => {
    console.log("debug data: ", phone);
    setIsLoading(true);
    handleCaptchaVerify();
    const verifier = window.recaptchVerify;
    const formatPhone = "+84" + phone.slice(1);
    const response = await apiCheckPhoneNumber({ phone: phone });
    console.log(response);
    if (response.success) {
      signInWithPhoneNumber(auth, formatPhone, verifier)
        .then((result) => {
          setIsLoading(false);
          window.confirmationResult = result;
          toast.success("Sent OTP to your phone successfully!");
          setIsShowOTP(true);
        })
        .catch((error) => {
          setIsLoading(false);
          console.log(error);
          window.isSentOTP = false;
          toast.error("Something went wrong!");
        });
    } else {
      toast.error("Phone number already had exists!");
      setModal(false, null);
    }
  };

  const onSubmit = async (data) => {
    if (variant === "register") {
      handleSendOTP(data.phone);
    }
    if (variant === "login") {
      const { name, roleCode, ...payload } = data;
      setIsLoading(true);
      const response = await apiLogin({ name, roleCode, ...payload });
      console.log(response);
      setIsLoading(false);
      if (response.success) {
        toast.success(response.msg);
        setModal(false, null);
        setToken(response.access_token);
      } else toast.error(response.msg);
    }
  };

  const handleRegister = async (data) => {
    setIsLoading(true);
    const response = await apiRegister(data);
    setIsLoading(false);
    if (response.success) {
      Swal.fire({
        icon: "success",
        title: "Congratulation!",
        text: response.msg,
        showConfirmButton: true,
        confirmButtonText: "Go sign in",
      }).then(({ isConfirmed }) => {
        if (isConfirmed) {
          setVariant("login");
          setIsShowOTP(false);
        }
      });
    } else toast.error(response.msg);
  };
  return (
    <div
      className={twMerge(
        clsx(
          "p-6 bg-white rounded-md w-[30%] space-y-4 relative",
          isShowOTP && "w-[35%] "
        )
      )}
      onClick={(e) => e.stopPropagation()}
    >
      <div id="recaptch-verifier"></div>
      {isShowOTP && (
        <div className="absolute inset-0 rounded-md bg-white h-fit">
          <VerifyOTP
            setIsShowOTP={setIsShowOTP}
            cb={handleSubmit(handleRegister)}
          />
        </div>
      )}

      <h1 className="font-bold lg:text-xl textbase text-main-500 text-center">
        Welcome to RealEstate
      </h1>
      <div className="flex items-center border-b lg:text-base text-sm gap-4">
        <span
          onClick={() => setVariant("login")}
          className={clsx(
            variant === "login" && "border-b-2 border-main-500 text-main-500",
            "py-4 hover:text-main-400 cursor-pointer"
          )}
        >
          Sign in
        </span>
        <span
          onClick={() => setVariant("register")}
          className={clsx(
            variant === "register" &&
              "border-b-2 border-main-500 text-main-500",
            "py-4 hover:text-main-400 cursor-pointer"
          )}
        >
          New account
        </span>
      </div>
      <form
        className={twMerge(clsx("flex flex-col gap-4", isShowOTP && "hidden"))}
      >
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
              { label: "Owner", value: "WO5" },
            ]}
          />
        )}
        <Button
          disabled={isLoading}
          onClick={handleSubmit(onSubmit)}
          className="bg-main-700 px-3 py-2 w-full text-white rounded-md"
          text={variant === "login" ? "Sign in" : "Register"}
        />
      </form>
      {variant === "login" && (
        <p
          className={twMerge(
            clsx("text-xss lg:text-xs font-medium", isShowOTP && "hidden")
          )}
        >
          Forgot password? Dont worry you can get it back{" "}
          <span className="text-main-500 hover:text-red-500 hover:underline cursor-pointer font-bold">
            Here!
          </span>
        </p>
      )}
      {!isShowOTP && (
        <MdCancel
          className="absolute top-0 right-5 cursor-pointer lg:text-xl text-base hover:text-red-500 text-main-500"
          onClick={() => setModal(false, null)}
        />
      )}
    </div>
  );
};

export default Login;
