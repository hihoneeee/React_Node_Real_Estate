import icons from "src/utils/icons";
import { InputSelect } from "..";
import { useForm } from "react-hook-form";
const { RxDashboard, BsMenuButtonWideFill, FaAngleDown } = icons;
const FilterHelper = () => {
  const {
    register,
    formState: { errors },
    watch,
  } = useForm();
  // const sort = watch("sort");
  
  return (
    <div className="flex items-center justify-between transition-all">
      <div className="flex items-center lg:text-xs text-xxs gap-2">
        <BsMenuButtonWideFill
          size={17}
          className="lg:text-sm text-xs cursor-pointer hover:text-main-600 hover:font-semibold"
        />
        <RxDashboard
          size={17}
          className="lg:text-sm text-xs cursor-pointer hover:text-main-600 hover:font-semibold"
        />
        <p className="flex items-center gap-1">
          Sort By:
          <InputSelect
            register={register}
            id="sort"
            errors={errors}
            placeholder="Default Order"
            options={[
              { label: "Latest", value: "-createdAt" },
              { label: "Oldest", value: "createdAt" },
              { label: "A - Z", value: "name" },
              { label: "Z - A", value: "-name" },
            ]}
            selectClassName='text-gray-500 py-1 px-2'
          />
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
