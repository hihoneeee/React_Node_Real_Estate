/* eslint-disable react/prop-types */
import clsx from "clsx";
import { twMerge } from "tailwind-merge";

const InputForm = ({
  style = "outline-none px-3 py-2 w-full rounded-md border-2",
  containerClassName,
  label,
  id,
  type,
  register,
  errors,
  inputClassName,
  validate,
  placeholder,
  isRequired = true,
}) => {
  return (
    <div className={twMerge(clsx("flex flex-col gap-3", containerClassName))}>
      {label && (
        <label className="lg:text-sm text-xs font-bold capitalize" htmlFor={id}>
          {label}
        </label>
      )}
      <input
        type={type}
        id={id}
        placeholder={placeholder}
        className={twMerge(clsx(style, inputClassName))}
        {...register(id, {
          ...validate,
          required: isRequired ? "This field is required" : false,
        })}
      />
      {errors && errors[id] && (
        <small className="text-red-500 italic lg:text-xs text-xxs">
          {errors[id]?.message}
        </small>
      )}
    </div>
  );
};

export default InputForm;
