/* eslint-disable react/prop-types */
import { useEffect, useState, useRef, Fragment } from "react";
import clsx from "clsx";
import withRouter from "src/hocs/withRouter";
import { useUserStore } from "src/store/useUserStore";
import icons from "src/utils/icons";
import { twMerge } from "tailwind-merge";
import Button from "../common/button";
import { toast } from "react-toastify";
import iconUser from "src/assets/icon_user.svg";
import { showOptions } from "src/utils/constant";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
const {
  FaFacebookF,
  FaLinkedinIn,
  FaInstagram,
  FaBehance,
  FaDribbble,
  HiOutlineMailOpen,
  FiPhone,
} = icons;

const Header = ({ location }) => {
  const { setToken, getCurrent, clearCurrent, current } = useUserStore();
  const [showUser, setShowUser] = useState(false);
  const userMenuRef = useRef(null);

  const handleLogout = () => {
    setToken(null);
    getCurrent(null);
    clearCurrent();
    Cookies.remove("refresh_token", { path: "/" });
    setShowUser(false); // Reset showUser state on logout
    toast.success("Logout successfully!");
  };

  const handleClickOutside = (event) => {
    if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
      setShowUser(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      className={twMerge(
        clsx(
          "px-20 py-6 flex items-center justify-between border-b-2 bg-transparen text-white w-full z-10 top-[0px]",
          location.pathname !== "/" && "bg-main-700",
          location.pathname === "/" && "fixed"
        )
      )}
    >
      <div className="flex items-center gap-1">
        <p className="lg:text-xl text-base">
          <HiOutlineMailOpen />
        </p>
        <p className="lg:text-xs text-xxs">
          <span className="font-semibold">Email us at:</span> example@mail.com
        </p>
      </div>
      <div className="flex gap-2">
        <div className="flex items-center gap-4 lg:text-xs text-xxs">
          <FaFacebookF />
          <FaDribbble />
          <FaLinkedinIn />
          <FaInstagram />
          <FaBehance />
        </div>
        <span className="border-l-2 mr-2 ml-2 border-white"></span>
        <div className="flex items-center gap-2 ">
          <span className="lg:text-xl text-base">
            <FiPhone />
          </span>
          <span className="lg:text-xs text-xxs">123-4567 890</span>
        </div>

        {current && (
          <>
            <span className="border-r-2 mr-2 ml-2 border-white"></span>
            <div className="relative z-20 flex items-center justify-center">
              <div
                className="hover:cursor-pointer rounded-full hover:bg-overlay-30"
                onClick={() => setShowUser(true)}
              >
                <img
                  className="h-8 w-8 object-cover "
                  src={iconUser}
                  alt="Icon User"
                ></img>
              </div>

              {showUser && (
                <div
                  className=" bg-white absolute text-black p-4 top-[3.5rem] h-[8.5rem] z-30 w-[8rem] rounded-md shadow-xl"
                  ref={userMenuRef}
                >
                  <div className="relative flex flex-col items-center gap-3 w-full">
                    <p className="lg:text-sm text-xs">
                      Name:{" "}
                      <span className="capitalize font-semibold">
                        {current?.name}
                      </span>
                    </p>
                    <p className="lg:text-sm text-xs">
                      ID:{" "}
                      <span className="uppercase font-semibold">
                        #{current?.id.slice(0, 6)}
                      </span>
                    </p>
                    <p className="lg:text-sm text-xs">
                      Role:{" "}
                      <span className="uppercase font-semibold">
                        {showOptions.map((item) => (
                          <Fragment key={item.code}>
                            {current?.roleData?.code === item.code && (
                              <Link>{item.name}</Link>
                            )}
                          </Fragment>
                        ))}
                      </span>
                    </p>
                  </div>
                  <Button
                    text="Logout"
                    className="text-white bg-main-500 px-2 py-1 w-full absolute bottom-0 left-0 rounded-b-md hover:"
                    onClick={handleLogout}
                  />{" "}
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default withRouter(Header);
