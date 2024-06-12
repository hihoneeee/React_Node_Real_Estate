import icons from "src/utils/icons";
import { InputSelect } from "..";
import { useForm } from "react-hook-form";
import { twMerge } from "tailwind-merge";
import clsx from "clsx";
import { useState } from "react";
const { RxDashboard, BsMenuButtonWideFill } = icons;
const FilterHelper = () => {
  const [mode, setMode] = useState("all");
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
            selectClassName="text-gray-500 py-1 px-2"
          />
        </p>
      </div>
      <div className="space-x-2 lg:text-xs text-xxs flex items-center ">
        <p
          onClick={() => setMode("all")}
          className={twMerge(
            clsx(
              "hover:underline hover:text-main-400 cursor-pointer hover:font-semibold",
              mode == "all" && "text-main-400 font-semibold underline"
            )
          )}
        >
          All Properties
        </p>
        <p
          onClick={() => setMode("sale")}
          className={twMerge(
            clsx(
              "hover:underline hover:text-main-400 cursor-pointer hover:font-semibold",
              mode == "sale" && "text-main-400 font-semibold underline"
            )
          )}
        >
          For Sale
        </p>
        <p
          onClick={() => setMode("rent")}
          className={twMerge(
            clsx(
              "hover:underline hover:text-main-400 cursor-pointer hover:font-semibold",
              mode == "rent" && "text-main-400 font-semibold underline"
            )
          )}
        >
          For Rent
        </p>
      </div>
    </div>
  );
};

export default FilterHelper;
