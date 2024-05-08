/* eslint-disable react/prop-types */
import { memo } from "react";
import { twMerge } from "tailwind-merge";
import clsx from "clsx";

const InputRadio = ({
  containerClassName,
  label,
  id,
  register,
  errors,
  validate,
  options = [],
}) => {
  return (
    <div className={twMerge(clsx("flex flex-col gap-2", containerClassName))}>
      {label && (
        <label className="lg:text-sm text-xs font-bold" htmlFor={id}>
          {label}
        </label>
      )}
      {options.map((item) => (
        <div
          className="flex items-center cursor-pointer gap-2"
          key={item.value}
        >
          <input
            type="radio"
            name={id}
            value={item.value}
            id={item.value}
            {...register(id, validate)}
          />
          <label
            className="lg:text-sm text-xs font-bold cursor-pointer"
            htmlFor={item.value}
          >
            {item.label}
          </label>
        </div>
      ))}
      {errors && errors[id] && (
        <small className="text-red-500 italic lg:text-xs text-xxs">
          {errors[id]?.message}
        </small>
      )}
    </div>
  );
};

export default memo(InputRadio);
