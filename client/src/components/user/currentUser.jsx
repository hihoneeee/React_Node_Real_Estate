/* eslint-disable react/prop-types */
import { memo } from "react";
import clsx from "clsx";
import { twMerge } from "tailwind-merge";
import defaultUser from "src/assets/default-user.png";
const CurrentUser = ({
  styleImg,
  containerClassname,
  status,
  name,
  image,
  id,
}) => {
  return (
    <div
      className={twMerge(clsx("flex items-center gap-3", containerClassname))}
    >
      <div className={twMerge(clsx("w-8 h-8 ", styleImg))}>
        <img
          src={image ? image : defaultUser}
          alt="avatar"
          className="w-full h-full object-cover rounded-full"
        />
      </div>
      <div className="flex items-center flex-col gap-1">
        <div className="lg:text-xs text-xxs font-semibold">
          {name} <span className="">#{id}</span>
        </div>
        {status && (
          <div>
            <p className="lg:text-xs text-xxs text-white flex items-center justify-center gap-1">
              <p className="w-[.5rem] h-[.5rem] rounded-full bg-green-500"></p>
              Đang hoạt động
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default memo(CurrentUser);
