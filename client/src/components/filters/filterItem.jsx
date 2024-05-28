/* eslint-disable react/prop-types */
import clsx from "clsx";
import icons from "src/utils/icons";
import { twMerge } from "tailwind-merge";
const { FaAngleDown } = icons;

const FilterItem = ({ title, span, className, onClick }) => {
  return (
    <div
      className={twMerge(
        clsx(
          "flex items-center flex-col space-y-2 border-r-2 border-gray-400 cursor-pointer group",
          className
        )
      )}
      onClick={onClick} // Corrected to onClick
    >
      <p className="group-hover:text-main-400">{title}</p>
      <div className="flex items-center gap-1 text-gray-400">
        <p className="lg:text-xs text-xxs font-semibold">Select your {span}</p>
        <span className="lg:text-sm text-xs font-semibold">
          <FaAngleDown />
        </span>
      </div>
    </div>
  );
};

export default FilterItem;
