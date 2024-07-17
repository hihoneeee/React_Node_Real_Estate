import clsx from "clsx";
import { NavLink } from "react-router-dom";
import { personalSidebar } from "src/utils/constant";

const PersonalSidebar = ({ current }) => {
  return (
    <div className="border-r">
      <div className="p-4 border-b-2 flex items-center gap-2">
        <img className="rounded-full h-12 w-12" alt="avatar" src={current.avatar}/>
        <h2 className="font-semibold mobile:text-base laptop:text-xl">
          {current.first_name} {current.last_name}
        </h2>
      </div>
      {personalSidebar.map((el) => {
        return (
          <NavLink
            to={el.path}
            key={el.id}
            className={({ isActive }) =>
              clsx(
                "flex items-center group font-medium p-3 hover:bg-main-50 hover:border-l-4 group hover:border-main-400 gap-2 cursor-pointer transition-all",
                isActive && "border-main-400 bg-main-50 border-l-4"
              )
            }
          >
            {({ isActive }) => (
              <>
                <span
                  className={clsx(
                    "p-1 text-gray-500 group-hover:ml-2 transition-all",
                    isActive && "ml-2"
                  )}
                >
                  {el.icon}
                </span>
                {el.title}
              </>
            )}
          </NavLink>
        );
      })}
    </div>
  );
};

export default PersonalSidebar;
