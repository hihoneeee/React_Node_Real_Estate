/* eslint-disable no-unused-vars */
import clsx from "clsx";
import Select from "react-select";
import { twMerge } from "tailwind-merge";

const libSelect = ({
  label,
  id,
  validate,
  register,
  errors,
  placeholder,
  options = [],
  onChange,
}) => {
  return (
    <div className={twMerge(clsx("flex flex-col gap-3"))}>
      {label && (
        <label className="lg:text-sm text-xs font-bold capitalize" htmlFor={id}>
          {label}
        </label>
      )}
      <Select
        {...register(id, validate)}
        placeholder={placeholder}
        isClearable
        options={options}
        isSearchable
        onChange={(val) => onChange(val)}
        formatOptionLabel={(el) => (
          <div className="flex items-center gap-3 cursor-pointer">
            <img
              src={el.avatar}
              alt="avatar"
              className="w-8 h-8 rounded-md object-cover"
            />
            <span>{el.label}</span>
          </div>
        )}
      />
      {errors && errors[id] && (
        <smal className="text-red-500 italic lg:text-xs text-xxs">
          {errors[id]?.message}
        </smal>
      )}
    </div>
  );
};

export default libSelect;
