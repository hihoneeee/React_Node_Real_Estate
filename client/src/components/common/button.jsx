/* eslint-disable react/prop-types */
import clsx from "clsx";
import { memo } from "react";
import { useNavigate } from "react-router-dom";
import { twMerge } from "tailwind-merge";

const Button = ({ text, IcAfter, route, onClick, className }) => {
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
            className
          )
        )}
        onClick={handleClick}
      >
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
