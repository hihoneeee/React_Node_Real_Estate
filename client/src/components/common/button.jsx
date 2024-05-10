/* eslint-disable react/prop-types */
import clsx from "clsx";
import { memo } from "react";
import { useNavigate } from "react-router-dom";
import { twMerge } from "tailwind-merge";
import { CgSpinner } from "react-icons/cg";
const Button = ({ text, IcAfter, route, onClick, className, disabled }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (route) {
      navigate(route);
    } else if (onClick) {
      onClick();
    }
  };

  return (
    <div>
      <button
        type="button"
        className={twMerge(
          clsx(
            "flex flex-row-reverse items-center justify-center gap-1 rounded-sm lg:text-xs text-xxs transition-all hover:underline border",
            className,
            disabled && "opacity-50"
          )
        )}
        onClick={handleClick}
        disabled={disabled}
      >
        {disabled && (
          <span className=" animate-spin">
            <CgSpinner />
          </span>
        )}

        <span>{text}</span>
        {IcAfter && (
          <span className="text-sm">
            <IcAfter />
          </span>
        )}
      </button>
    </div>
  );
};

export default memo(Button);
