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
  setReadonly,
}) => {
  return (
    <div className={twMerge(clsx("flex flex-col gap-2", containerClassName))}>
      {label && (
        <label
          className="lg:text-sm text-xs font-semibold capitalize"
          htmlFor={id}
        >
          {label}
        </label>
      )}
      <input
        type={type}
        id={id}
        readOnly={setReadonly}
        placeholder={placeholder}
        className={twMerge(
          clsx(
            style,
            setReadonly &&
              "outline-none px-2 py-1 w-full rounded-md border-2 bg-gray-300",
            inputClassName
          )
        )}
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
