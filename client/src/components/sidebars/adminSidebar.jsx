/* eslint-disable react/jsx-key */
import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { path } from "src/utils/path";
import icons from "src/utils/icons";
import { CurrentUser } from "src/components";
import { adminSidebar } from "src/utils/constant";
import { Fragment } from "react";
import clsx from "clsx";
const { PiHouseLineLight, FaAngleLeft, FaAngleDown } = icons;
const AdminSidebar = () => {
  const [activeTabs, setActiveTabs] = useState([]);
  const handleActive = (tabId) => {
    if (activeTabs.some((el) => el === tabId))
      setActiveTabs((prev) => prev.filter((el) => el !== tabId));
    else setActiveTabs((prev) => [...prev, tabId]);
  };
  return (
    <div>
      <Link to={path.LAYOUT}>
        <div className="flex items-center gap-1 border-b p-4">
          <div className="text-[2rem]">
            <PiHouseLineLight />
          </div>
          <div className="flex flex-col leading-4">
            <p className="text-[20px] font-semibold">REIS</p>
            <span className="text-xs">Real State</span>
          </div>
        </div>
      </Link>
      <div className="p-4 border-b">
        <CurrentUser status name="Hồ Anh Huy" id="12345" />
      </div>
      <div className="lg:text-xs text-xxs p-4 bg-[#1a2226] text-[#4b646f]">
        MAIN NAVIGATION
      </div>
      {adminSidebar.map((item) => {
        return (
          <Fragment key={item.id}>
            {item.type === "single" && (
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  clsx(
                    "flex items-center px-4 py-3 gap-2 hover:bg-gray-700 hover:underline transition-all",
                    isActive &&
                      item.path === window.location.pathname &&
                      "bg-gray-500 border-l-4 border-main-300"
                  )
                }
              >
                <span className="text-xl">{item.icon}</span>
                <p className="lg:text-xs text-xxs">{item.name}</p>
              </NavLink>
            )}
            {item.type === "parent" && (
              <>
                <div
                  onClick={() => handleActive(item.id)}
                  className="flex items-center justify-between px-4 py-3 hover:bg-gray-700 hover:underline transition-all cursor-pointer"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{item.icon}</span>
                    <p className="lg:text-xs text-xxs">{item.name}</p>
                  </div>
                  {activeTabs.some((tabId) => tabId === item.id) ? (
                    <span className="text-xxs">
                      <FaAngleDown />
                    </span>
                  ) : (
                    <span className="text-xxs">
                      <FaAngleLeft />
                    </span>
                  )}
                </div>
                {activeTabs.some((tabId) => tabId === item.id) && (
                  <div className="bg-[#2c3b41]">
                    {item.subs.map((sub) => (
                      <NavLink
                        to={sub.path}
                        className={({ isActive }) =>
                          clsx(
                            "flex items-center px-4 py-3 gap-2 hover:bg-gray-700 hover:underline transition-all",
                            isActive &&
                              sub.path === window.location.pathname &&
                              "bg-gray-500 border-l-4 border-main-300"
                          )
                        }
                      >
                        <span className="text-xxs ml-2">{sub.icon}</span>
                        <p className="lg:text-xs text-xxs ml-2">{sub.name}</p>
                      </NavLink>
                    ))}
                  </div>
                )}
              </>
            )}
          </Fragment>
        );
      })}
    </div>
  );
};

export default AdminSidebar;
