/* eslint-disable react/prop-types */
import icons from "src/utils/icons";
import { FilterHome, InputSelect } from "src/components";
import { useForm } from "react-hook-form";
import { twMerge } from "tailwind-merge";
import clsx from "clsx";
import React, { useEffect, useState } from "react";
import { useAppStore } from "src/store/useAppStore";
const { RxDashboard } = icons;

const FilterHelper = ({ setSort }) => {
  const [mode, setMode] = useState("all");
  const { setModal } = useAppStore();

  const {
    register,
    formState: { errors },
    watch,
  } = useForm();

  const sort = watch("sort");
  useEffect(() => {
    console.log("Running");
    setSort(sort);
  }, [sort, setSort]);
  return (
    <div className="flex items-center justify-between transition-all">
      <div className="flex items-center lg:text-xs text-xxs gap-2">
        <RxDashboard
          size={17}
          className="lg:text-sm text-xs cursor-pointer hover:text-main-600 hover:font-semibold"
          onClick={() => setModal(true, <FilterHome direction="vertical" />)}
        />
        <p className="flex items-center gap-1">
          Sort By:
          <InputSelect
            register={register}
            id="sort"
            errors={errors}
            placeholder="Default Order"
            options={[
              { title: "Latest", value: "-createdAt" },
              { title: "Oldest", value: "createdAt" },
              { title: "A - Z", value: "title" },
              { title: "Z - A", value: "-title" },
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
              mode === "all" && "text-main-400 font-semibold underline"
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
              mode === "sale" && "text-main-400 font-semibold underline"
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
              mode === "rent" && "text-main-400 font-semibold underline"
            )
          )}
        >
          For Rent
        </p>
      </div>
    </div>
  );
};

export default React.memo(FilterHelper);
