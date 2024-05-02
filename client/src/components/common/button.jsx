/* eslint-disable react/prop-types */
import { memo } from "react";
import { useNavigate } from "react-router-dom";

const Button = ({
  text,
  textColor,
  bgColor,
  hoverBgColor,
  IcAfter,
  route,
  onClick,
  paddingX,
  paddingY,
}) => {
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
        className={`${textColor} ${bgColor} flex flex-row-reverse items-center justify-center gap-1 rounded-sm ${paddingX} ${paddingY} hover:${hoverBgColor} lg:text-xs text-xxs transition-all hover:underline border`}
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
