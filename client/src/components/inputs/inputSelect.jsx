/* eslint-disable react/prop-types */
import clsx from "clsx";
import { twMerge } from "tailwind-merge";

const InputSelect = ({
  label,
  id,
  selectClassName,
  validate,
  register,
  errors,
  placeholder,
  options = [],
}) => {
  return (
    <div className={twMerge(clsx("flex flex-col gap-3"))}>
      {label && (
        <label className="lg:text-sm text-xs font-bold capitalize" htmlFor={id}>
          {label}
        </label>
      )}
      <select
        id={id}
        className={twMerge(
          clsx("px-3 py-2 border rounded-md cursor-pointer", selectClassName)
        )}
        {...register(id, validate)}
      >
        <option value="">{placeholder}</option>
        {options.map((el) => (
          <option key={el.id} value={el.value}>
            {el.title}
          </option>
        ))}
      </select>
      {errors && errors[id] && (
        <smal className="text-red-500 italic lg:text-xs text-xxs">
          {errors[id]?.message}
        </smal>
      )}
    </div>
  );
};

export default InputSelect;
