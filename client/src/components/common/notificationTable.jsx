import { formatDistanceToNow } from "date-fns";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useNotificationStore } from "src/store";
import Button from "./button";
import { twMerge } from "tailwind-merge";
import clsx from "clsx";

const NotificationTable = () => {
  const { notifications } = useNotificationStore();
  const [showAll, setShowAll] = useState(false);
  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className={twMerge(
        clsx(
          "bg-white absolute text-black top-[3.7rem] right-0 w-[20rem] rounded-b-lg shadow-[10px_10px_5px_rgba(0,0,0,0.24)] border-2 z-[1000] overflow-hidden h-[37rem]",
          showAll ? "overflow-auto" : "overflow-hidden"
        )
      )}
    >
      <div className="">
        <div className="p-2 border-b">
          <h3 className="laptop:text-base text-sm font-semibold text-center">
            Notification
          </h3>
        </div>
        {notifications.map((el) => (
          <div
            key={el?.id}
            className="space-y-2 p-4 hover:bg-overlay-30 cursor-pointer transition-all"
          >
            <Link to="" className="flex items-center gap-2">
              <img
                src={el?.dataUser?.avatar}
                alt="avatar"
                className="w-8 h-8 rounded-full object-cover"
              />
              <div className="space-y-2">
                <p className="text-gray-500 laptop:text-xs text-xxs ">
                  <span className="text-black font-medium">
                    {el?.dataUser?.first_name} {el?.dataUser?.last_name}
                  </span>
                  {el?.content}
                </p>
                <p className="laptop:text-[.6rem] text-xxs text-blue-500">
                  {formatDistanceToNow(new Date(el?.createdAt), {
                    addSuffix: true,
                  })}
                </p>
              </div>
              <div className="w-4 h-2 rounded-full bg-blue-500"></div>
            </Link>
          </div>
        ))}
      </div>
      <Button
        onClick={() => setShowAll((prev) => !prev)}
        className={twMerge(
          clsx(
            "w-full absolute rounded-b-lg px-2 py-2 text-white bg-main-300 hover:bg-main-500",
            showAll ? "" : "bottom-0"
          )
        )}
        text={showAll ? "Show less" : "Show all"}
      />
    </div>
  );
};

export default NotificationTable;
