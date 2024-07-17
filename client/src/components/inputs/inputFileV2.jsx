import clsx from "clsx";
import { twMerge } from "tailwind-merge";

const InputFileV2 = ({
  containerClassName,
  validate,
  id,
  errors,
  register,
  text,
}) => {
  return (
    <div>
      <label
        className={twMerge(
          clsx(
            "flex flex-row-reverse items-center justify-center gap-1 rounded-sm lg:text-xs text-xxs transition-all hover:underline border cursor-pointer",
            containerClassName
          )
        )}
        htmlFor={id}
      >
        <p>{text}</p>
      </label>
      <input hidden type="file" id={id} {...register(id, validate)} />
      {errors && errors[id] && (
        <small className="text-red-500 italic lg:text-xs text-xxs">
          {errors[id]?.message}
        </small>
      )}
    </div>
  );
};

export default InputFileV2;
