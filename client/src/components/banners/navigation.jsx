/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { Link, NavLink, useMatch } from "react-router-dom";
import icons from "src/utils/icons";
import { path } from "src/utils/path";
import { nav } from "src/utils/constant";
import { Button, Login } from "src/components";
import clsx from "clsx";
import { twMerge } from "tailwind-merge";
import withRouter from "src/hocs/withRouter";
import { useUserStore } from "src/store/useUserStore";
import { useAppStore } from "src/store/useAppStore";
import { v4 as uuidV4 } from "uuid";
const { PiHouseLineLight, BsHouseAdd } = icons;

const Navigation = ({ location }) => {
  const { current } = useUserStore();
  const { setModal } = useAppStore();
  const [isScrolled, setIsScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset;
      if (scrollTop > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  const matchPersonal = useMatch(`${path.PERSONAL}/*`);
  return (
    <div
      className={twMerge(
        clsx(
          "px-20 py-6 flex items-center justify-between bg-transparent text-white w-full z-[5] top-[80px] transition-all",
          isScrolled &&
            location.pathname !== "/" &&
            "fixed top-0 left-0 right-0 transition-all",
          isScrolled &&
            location.pathname === "/" &&
            "top-0 left-0 right-0 transition-all bg-white text-main-500 shadow-xl",
          location.pathname !== "/" &&
            "bg-white text-main-500 shadow-xl transition-all",
          location.pathname === "/" && "fixed transition-all",
          isScrolled && matchPersonal && "hidden transition-all"
        )
      )}
    >
      <Link to={path.LAYOUT}>
        <div className="flex items-center gap-1">
          <div className="text-[2rem]">
            <PiHouseLineLight />
          </div>
          <div className="flex flex-col leading-4">
            <p className="text-[20px] font-semibold">REIS</p>
            <span className="text-xs">Real State</span>
          </div>
        </div>
      </Link>
      <div className="flex items-center gap-6">
        {nav?.map((el) => {
          return (
            <p
              key={uuidV4()}
              className={twMerge(
                clsx(
                  "py-2 lg:text-xs text-xxs text-gray-300 hover:text-white hover:border-b transition-all font-medium"
                ),
                location.pathname !== "/" &&
                  "text-gray-400 hover:text-main-500 border-main-500",
                isScrolled &&
                  location.pathname === "/" &&
                  "text-gray-400 hover:text-main-500 border-main-500"
              )}
            >
              <NavLink
                className={({ isActive }) =>
                  clsx(
                    location.pathname !== "/"
                      ? isActive &&
                          "py-2 text-main-500 border-b border-main-500"
                      : isActive && "py-2 text-white border-b border-white"
                  )
                }
                key={el.id}
                to={el.path}
              >
                {el.title}
              </NavLink>
            </p>
          );
        })}
        <span
          className={twMerge(
            clsx(
              "py-2 lg:text-xs text-xxs text-gray-300 hover:text-white hover:border-b transition-all cursor-pointer",
              location.pathname !== "/" &&
                "text-gray-400 hover:text-main-500 border-main-500 transition-all",
              isScrolled &&
                location.pathname === "/" &&
                "text-gray-400 hover:text-main-500 border-main-500"
            )
          )}
        >
          SEARCH
        </span>
        {!current ? (
          <Button
            text="Sign In"
            className={twMerge(
              clsx(
                location.pathname === "/"
                  ? "text-white bg-transparen px-4 py-2 border hover:shadow-[5px_5px_5px_rgba(0,0,0,0.24)]"
                  : "text-white bg-main-700 px-4 py-2 hover:bg-overlay-50",
                isScrolled &&
                  location.pathname === "/" &&
                  "text-white bg-main-700 px-4 py-2 hover:bg-overlay-50"
              )
            )}
            onClick={() => setModal(true, <Login />)}
          />
        ) : (
          <Button
            text="Add Listing"
            IcAfter={() => <BsHouseAdd size={16} />}
            route={path.ADD_PROPERTY}
            className={twMerge(
              clsx(
                location.pathname === "/"
                  ? "text-white bg-transparen px-4 py-2 border hover:shadow-[5px_5px_5px_rgba(0,0,0,0.24)]"
                  : "text-white bg-main-700 px-4 py-2 hover:bg-overlay-50",
                isScrolled &&
                  location.pathname === "/" &&
                  "text-white bg-main-700 px-4 py-2 hover:bg-overlay-50"
              )
            )}
          />
        )}
      </div>
    </div>
  );
};

export default withRouter(Navigation);
