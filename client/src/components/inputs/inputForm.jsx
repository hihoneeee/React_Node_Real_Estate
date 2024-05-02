/* eslint-disable react/prop-types */
import clsx from "clsx";
import { twMerge } from "tailwind-merge";

const InputForm = ({
  style = "outline-none px-3 py-2 w-full rounded-md border-2",
  // containerClassName,
  label,
  id,
  type,
  register,
  errors,
  inputClassName,
  validate,
  placeholder,
}) => {
  return (
    <div className={twMerge(clsx("flex flex-col gap-3"))}>
      {label && (
        <label className="lg:text-sm text-xs font-bold" htmlFor={id}>
          {label}
        </label>
      )}
      <input
        type={type}
        id={id}
        placeholder={placeholder}
        className={twMerge(clsx(style, inputClassName))}
        {...register(id, validate)}
      />
      {errors && errors[id] && (
        <smal className="text-red-500 italic lg:text-xs text-xxs">
          {errors[id]?.message}
        </smal>
      )}
    </div>
  );
};

export default InputForm;
