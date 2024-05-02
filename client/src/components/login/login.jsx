import clsx from "clsx";
import { useState } from "react";
const Login = () => {
  const [variant, setvariant] = useState("login");
  return (
    <div
      className="px-6 py-12 bg-white rounded-md"
      onClick={(e) => e.stopPropagation()}
    >
      <h1 className="font-bold lg:text-xl textbase text-main-400 ">
        Welcome to RealEstate
      </h1>
      <div className="flex items-center border-b lg:text-base text-sm gap-4">
        <span
          onClick={() => setvariant("login")}
          className={clsx(
            variant === "login" && "border-b-2 border-main-500",
            "py-4 hover:text-main-400 cursor-pointer"
          )}
        >
          Sign in
        </span>
        <span
          onClick={() => setvariant("register")}
          className={clsx(
            variant === "register" && "border-b-2 border-main-500",
            "py-4 hover:text-main-400 cursor-pointer"
          )}
        >
          New account
        </span>
      </div>
    </div>
  );
};

export default Login;
