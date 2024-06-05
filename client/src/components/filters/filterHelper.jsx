import icons from "src/utils/icons";
const { RxDashboard, BsMenuButtonWideFill, FaAngleDown } = icons;
const FilterHelper = () => {
  return (
    <div className="flex items-center justify-between transition-all">
      <div className="flex items-center lg:text-xs text-xxs gap-2">
        <BsMenuButtonWideFill className="lg:text-sm text-xs cursor-pointer hover:text-main-600 hover:font-semibold" />
        <RxDashboard className="lg:text-sm text-xs cursor-pointer hover:text-main-600 hover:font-semibold" />
        <p className="flex items-center gap-1">
          Sort By: <span className="text-gray-500">Default Order</span>{" "}
          <FaAngleDown />
        </p>
      </div>
      <div className="space-x-2 lg:text-xs text-xxs flex items-center ">
        <p className="hover:underline hover:text-main-400 cursor-pointer hover:font-semibold">
          All Properties
        </p>
        <p className="hover:underline hover:text-main-400 cursor-pointer hover:font-semibold">
          For Buy
        </p>
        <p className="hover:underline hover:text-main-400 cursor-pointer hover:font-semibold">
          For Sale
        </p>
        <p className="hover:underline hover:text-main-400 cursor-pointer hover:font-semibold">
          For Rent
        </p>
      </div>
    </div>
  );
};

export default FilterHelper;
