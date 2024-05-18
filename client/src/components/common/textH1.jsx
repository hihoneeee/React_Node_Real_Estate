/* eslint-disable react/prop-types */
import clsx from "clsx";
import { twMerge } from "tailwind-merge";

const TextH1 = ({ style, containerCss, icon, title }) => {
  return (
    <div className={twMerge(clsx("flex items-center gap-2", containerCss))}>
      <h1
        className={twMerge(clsx("lg:text-2xl text-xl font-medium", style))}
      >
        {title}
      </h1>
      {icon && icon}
    </div>
  );
};

export default TextH1;
