import { formatDistanceToNow } from "date-fns";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useNotificationStore } from "src/store";
import Button from "./button";
import { twMerge } from "tailwind-merge";
import clsx from "clsx";

const NotificationTable = () => {
  const { notifications } = useNotificationStore();
  const [showAll, setShowAll] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    if (!showAll && containerRef.current) {
      containerRef.current.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [showAll]);

  return (
    <div
      ref={containerRef}
      onClick={(e) => e.stopPropagation()}
      className={twMerge(
        clsx(
          "bg-white absolute text-black top-[3.7rem] right-0 w-[20rem] rounded-b-lg shadow-[10px_10px_5px_rgba(0,0,0,0.24)] border-2 z-[1000]",
          showAll ? "overflow-auto" : "overflow-hidden",
          notifications.length > 6 ? "desktop:h-[42rem] h-[37rem]" : "h-fit"
        )
      )}
    >
      <div className="p-2 border-b">
        <h3 className="laptop:text-base text-sm font-semibold text-center">
          Notification
        </h3>
      </div>
      {notifications.length > 0 ? (
        <>
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
                  <p className="text-gray-500 laptop:text-xs text-xxs">
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
          <Button
            onClick={() => setShowAll((prev) => !prev)}
            className={twMerge(
              clsx(
                notifications.length > 6 &&
                  "w-full absolute rounded-b-lg px-2 py-2 text-white bg-main-300 hover:bg-main-500",
                showAll ? "" : "bottom-0"
              )
            )}
            text={
              notifications.length > 6
                ? showAll
                  ? "Show less"
                  : "Show all"
                : ""
            }
          />
        </>
      ) : (
        <div className="p-4">
          <p className="text-gray-500 laptop:text-xs text-xxs">
            You dont have any notifications yet!
          </p>
        </div>
      )}
    </div>
  );
};

export default NotificationTable;
