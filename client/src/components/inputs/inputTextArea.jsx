/* eslint-disable react/prop-types */
import clsx from "clsx";
import { memo } from "react";
import { twMerge } from "tailwind-merge";
const InputTextArea = ({
  containerClassName,
  label,
  register,
  errors,
  id,
  validate,
  style,
  placeholder,
  rows,
}) => {
  return (
    <div>
      <div className={twMerge(clsx("flex flex-col gap-3", containerClassName))}>
        {label && (
          <label
            className="lg:text-sm text-xs font-bold capitalize"
            htmlFor={id}
          >
            {label}
          </label>
        )}
        <textarea
          id={id}
          cols="30"
          rows={rows}
          placeholder={placeholder}
          className={twMerge(
            clsx("outline-none p-2 w-full rounded-md border-2", style)
          )}
          {...register(id, validate)}
        />
        {errors && errors[id] && (
          <smal className="text-red-500 italic lg:text-xs text-xxs">
            {errors[id]?.message}
          </smal>
        )}
      </div>
    </div>
  );
};

export default memo(InputTextArea);
