import clsx from "clsx";
import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  Button,
  FilterItem,
  InputForm,
  InputSelect,
  LibSelect,
} from "src/components";
import { usePropertyTypeStore } from "src/store/usePropertyTypeStore";
import icons from "src/utils/icons";
import { twMerge } from "tailwind-merge";
const { FaSearch } = icons;

const FilterHome = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
    setValue,
  } = useForm();
  const [activeFilter, setActiveFilter] = useState(null);
  const { propertyTypes } = usePropertyTypeStore();
  const type = watch("propertyType");
  const handleFilterToggle = (filter) => {
    setActiveFilter((prevFilter) => (prevFilter === filter ? null : filter));
  };

  return (
    <form>
      <div
        className={twMerge(
          clsx(
            "bg-white h-[7rem] grid grid-cols-4 items-center",
            activeFilter === null
              ? "w-[68rem] shadow-xl py-2 px-4 rounded-3xl"
              : "w-[68rem] py-2 px-4 rounded-t-3xl"
          )
        )}
      >
        <FilterItem
          title="Locations"
          span="location"
          onClick={() => handleFilterToggle("location")}
        />
        <FilterItem
          title="Property Type"
          span="property type"
          onClick={() => handleFilterToggle("propertyType")}
        />
        <FilterItem
          title="Rent Range"
          span="rent range"
          onClick={() => handleFilterToggle("rentRange")}
        />
        <div className="flex items-center flex-col">
          <Button
            className="px-4 py-3 bg-main-500 text-white rounded-md"
            text="Search"
            IcAfter={FaSearch}
            onClick={handleSubmit((data) => console.log(data))}
          />
        </div>
      </div>
      {activeFilter === "location" && (
        <div className="bg-white shadow-xl rounded-b-3xl p-4 space-y-4">
          <InputForm
            id="location"
            label="Find the location you want"
            type="text"
            placeholder="Enter location"
            register={register}
            errors={errors}
            validate={{ required: "Location is required" }}
          />
        </div>
      )}
      {activeFilter === "propertyType" && (
        <div className="bg-white shadow-xl rounded-b-3xl p-4 space-y-4">
          <LibSelect
            id="propertyType"
            label="Property Type"
            placeholder="Enter property type"
            register={register}
            errors={errors}
            validate={{ required: "Property type is required" }}
            options={propertyTypes?.map((el) => ({ ...el, label: el.title }))}
            onChange={(val) => setValue("propertyType", val)}
          />
        </div>
      )}
      {activeFilter === "rentRange" && (
        <div className="bg-white shadow-xl rounded-b-3xl p-4 space-y-4">
          <InputSelect
            id="rentRange"
            label="Rent Range"
            placeholder="Enter rent range"
            register={register}
            errors={errors}
            validate={{ required: "Rent range is required" }}
          />
        </div>
      )}
    </form>
  );
};

export default FilterHome;
