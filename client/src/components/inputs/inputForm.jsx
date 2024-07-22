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
  button, // Add a prop for the button
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
      <div className="relative w-full">
        {" "}
        {/* Add a wrapper with relative position */}
        <input
          type={type}
          id={id}
          readOnly={setReadonly}
          placeholder={placeholder}
          className={twMerge(
            clsx(style, setReadonly && "bg-gray-300", inputClassName)
          )}
          {...register(id, {
            ...validate,
            required: isRequired ? "This field is required" : false,
          })}
        />
        {button && (
          <div className="absolute right-0 top-1/2 transform -translate-y-1/2 h-full">
            {button}
          </div>
        )}
      </div>
      {errors && errors[id] && (
        <small className="text-red-500 italic lg:text-xs text-xxs">
          {errors[id]?.message}
        </small>
      )}
    </div>
  );
};

export default InputForm;
