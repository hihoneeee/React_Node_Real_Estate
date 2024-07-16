import clsx from "clsx";
import { NavLink } from "react-router-dom";
import { personalSidebar } from "src/utils/constant";

const PersonalSidebar = () => {
  return (
    <div>
      {personalSidebar.map((el) => {
        return (
          <NavLink
            key={el.id}
            className={({ isActive }) =>
              clsx(
                "flex items-center group justify-center p-4 border gap-2 cursor-pointer hover:bg-main-500 hover:text-white transition-all",
                isActive && "bg-main-500 text-white"
              )
            }
          >
            <span
              className={({ isActive }) =>
                clsx(
                  "p-2 rounded-full bg-gray-400 group-hover:",
                  isActive && "bg-green-400"
                )
              }
            >
              {el.icon}
            </span>
            {el.title}
          </NavLink>
        );
      })}
    </div>
  );
};

export default PersonalSidebar;
