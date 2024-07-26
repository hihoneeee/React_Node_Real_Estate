import clsx from "clsx";
import { NavLink } from "react-router-dom";
import { personalSidebar } from "src/utils/constant";
import { twMerge } from "tailwind-merge";

const PersonalSidebar = ({ current }) => {
  return (
    <div className="border-r bg-main-500 rounded-l-lg p-2 h-full">
      <div className="my-4 flex items-center justify-center gap-2 ">
        <img
          className="rounded-full h-12 w-12 object-cove"
          alt="avatar"
          src={current?.avatar}
        />
      </div>
      <div className="space-y-2">
        {personalSidebar.map((el) => {
          return (
            <NavLink
              to={el.path}
              key={el.id}
              className={({ isActive }) =>
                clsx(
                  "flex flex-col items-center group font-medium p-2 rounded-md hover:bg-main-50 gap-2 cursor-pointer transition-all",
                  isActive && "bg-main-50"
                )
              }
            >
              {({ isActive }) => (
                <p
                  className={twMerge(
                    clsx(
                      "desktop:text-sm laptop:text-xs text-xxs flex flex-col items-center justify-center text-gray-300 group-hover:text-main-500 transition-all",
                      isActive && "text-main-500 "
                    )
                  )}
                >
                  <span className="p-1">{el.icon}</span>
                  {el.title}
                </p>
              )}
            </NavLink>
          );
        })}
      </div>
    </div>
  );
};

export default PersonalSidebar;
