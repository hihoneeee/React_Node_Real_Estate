/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import icons from "src/utils/icons";
import { path } from "src/utils/path";
import { nav } from "src/utils/constant";
import { Button, Login } from "src/components";
import clsx from "clsx";
import { twMerge } from "tailwind-merge";
import withRouter from "src/hocs/withRouter";
import { useUserStore } from "src/store/useUserStore";
import { useAppStore } from "src/store/useAppStore";
const { PiHouseLineLight } = icons;

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
  return (
    <div
      className={twMerge(
        clsx(
          "px-20 py-6 flex items-center justify-between bg-transparent text-white w-full z-[5] top-[70px]",
          isScrolled && "fixed top-0 left-0 right-0",
          location.pathname !== "/" && "bg-white text-main-500 shadow-xl",
          location.pathname === "/" && "fixed"
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
            <>
              <p
                key={el.id}
                className={twMerge(
                  clsx(
                    "py-2 lg:text-xs text-xxs text-gray-300 hover:text-white hover:border-b transition-all font-normal"
                  ),
                  location.pathname !== "/" &&
                    "text-gray-400 hover:text-main-500 border-main-500 "
                )}
              >
                <NavLink
                  className={({ isActive }) =>
                    clsx(
                      location.pathname !== "/"
                        ? isActive &&
                            "py-2  text-main-500 border-b border-main-500 "
                        : isActive && "py-2 text-white border-b "
                    )
                  }
                  key={el.id}
                  to={el.path}
                >
                  {el.title}
                </NavLink>
              </p>
            </>
          );
        })}
        <span
          className={twMerge(
            clsx(
              "py-2 lg:text-xs text-xxs text-gray-300 hover:text-white hover:border-b transition-all cursor-pointer",
              location.pathname !== "/" &&
                "text-gray-400 hover:text-main-500 border-main-500 transition-all"
            )
          )}
        >
          SEARCH
        </span>
        {!current ? (
          location.pathname === "/" ? (
            <Button
              text="Sign In"
              className="text-white bg-transparen px-4 py-2"
              onClick={() => setModal(true, <Login />)}
            />
          ) : (
            <Button
              text="Sign In"
              className="text-white bg-main-700 px-4 py-2"
              onClick={() => setModal(true, <Login />)}
            />
          )
        ) : location.pathname === "/" ? (
          <>
            <Button
              text="Add Listing"
              textColor="text-white"
              className="text-white bg-transparen px-4 py-2"
            />
          </>
        ) : (
          <Button
            text="Add Listing"
            textColor="text-white"
            className="text-white bg-main-700 px-4 py-2"
          />
        )}
      </div>
    </div>
  );
};

export default withRouter(Navigation);
