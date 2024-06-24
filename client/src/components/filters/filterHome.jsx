/* eslint-disable react/prop-types */
import clsx from "clsx";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { createSearchParams } from "react-router-dom";
import { Button, FilterItem, InputForm, LibSelect } from "src/components";
import withRouter from "src/hocs/withRouter";
import { usePropertyTypeStore } from "src/store/usePropertyTypeStore";
import icons from "src/utils/icons";
import { path } from "src/utils/path";
import { twMerge } from "tailwind-merge";
const { FaSearch } = icons;

const FilterHome = ({ navigate }) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm();
  const [activeFilter, setActiveFilter] = useState(null);
  const { propertyTypes } = usePropertyTypeStore();
  const handleFilterToggle = (filter) => {
    setActiveFilter((prevFilter) => (prevFilter === filter ? null : filter));
  };
  const handleSubmitFilter = (data) => {
    const { address, start, end, propertyType } = data;
    const params = new Object();
    if (address) params.address = data.address;
    if (propertyType) params.propertyTypeId = data.propertyType.id;
    if (start && !end) params.price = [+start, Math.pow(10, 9)];
    if (end && !start) params.price = [0, +end];
    if (start && end) params.price = [+start, +end];
    navigate({
      pathname: `/${path.PROPERTIES}`,
      search: createSearchParams(params).toString(),
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
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
          title="address"
          span="address"
          onClick={() => handleFilterToggle("address")}
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
            onClick={handleSubmit(handleSubmitFilter)}
          />
        </div>
      </div>
      {activeFilter === "address" && (
        <div className="bg-white shadow-xl rounded-b-3xl p-4 space-y-4">
          <InputForm
            id="address"
            label="Find the address you want"
            type="text"
            placeholder="Enter address"
            register={register}
            errors={errors}
            isRequired={false}
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
        <div className="bg-white shadow-xl rounded-b-3xl p-4 flex items-center gap-4">
          <InputForm
            id="start"
            label="Rent Range start"
            placeholder="Enter rent range"
            register={register}
            type="number"
            containerClassName="w-1/2"
            errors={errors}
            isRequired={false}
          />
          <InputForm
            id="end"
            label="Rent Range end"
            placeholder="Enter rent range"
            register={register}
            type="number"
            containerClassName="w-1/2"
            errors={errors}
            isRequired={false}
          />
        </div>
      )}
    </form>
  );
};

export default withRouter(FilterHome);
