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
import { path } from "src/utils/path";
import { NotificationTable } from "..";
const {
  FaFacebookF,
  FaLinkedinIn,
  FaInstagram,
  FaBehance,
  FaDribbble,
  HiOutlineMailOpen,
  FiPhone,
  CiLogout,
  RiFileUserLine,
  IoMdNotificationsOutline,
} = icons;

const Header = ({ location }) => {
  const { setToken, getCurrent, clearCurrent, current } = useUserStore();
  const [showUser, setShowUser] = useState(false);
  const [notification, setNotification] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const userMenuRef = useRef(null);

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
  const handleLogout = () => {
    setToken(null);
    getCurrent(null);
    clearCurrent();
    Cookies.remove("refresh_token", { path: "/" });
    setShowUser(false);
    toast.success("Logout successfully!");
  };

  const handleClickOutside = (event) => {
    if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
      setShowUser(false);
      setNotification(false);
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
          "px-20 py-6 flex items-center justify-between border-b-2 bg-transparen text-white w-full z-10 top-[0px] transition-al",
          location.pathname !== "/" && "bg-main-700 transition-al",
          location.pathname === "/" && "fixed transition-al",
          isScrolled && location.pathname === "/" && "static transition-all"
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
                className={twMerge(
                  clsx(
                    "hover:cursor-pointer rounded-md hover:bg-overlay-30 flex items-center gap-2 px-2",
                    showUser && "bg-overlay-30 "
                  )
                )}
                onClick={() => {
                  setShowUser((prevUser) => {
                    if (!prevUser) setNotification(false);
                    return !prevUser;
                  });
                }}
              >
                <div className="space-y-1">
                  <p className="lg:text-xs text-xxs">
                    Name:{" "}
                    <span className="capitalize font-semibold">
                      {current?.first_name}
                    </span>
                  </p>
                  <p className="lg:text-xs text-xxs">
                    Position:{" "}
                    <span className="uppercase font-semibold">
                      {showOptions.map((item) => (
                        <Fragment key={item.code}>
                          {current?.roleCode === item.code && (
                            <Link>{item.name}</Link>
                          )}
                        </Fragment>
                      ))}
                    </span>
                  </p>
                </div>
                <img
                  className="h-8 w-8 object-cover "
                  src={iconUser}
                  alt="Icon User"
                ></img>
              </div>

              {showUser ? (
                <div
                  className="bg-white absolute text-black p-4 top-[3.7rem] z-30 w-[8rem] rounded-md shadow-2xl border-2"
                  ref={userMenuRef}
                >
                  <Button
                    text="Personal"
                    className="text-black hover:text-white rounded-md hover:bg-main-500 px-2 py-1 w-full border-none"
                    route={`${path.PERSONAL}`}
                    IcAfter={RiFileUserLine}
                  />
                  <Button
                    text="Logout"
                    className="text-black hover:text-white rounded-md hover:bg-main-500 px-2 py-1 w-full border-none"
                    onClick={handleLogout}
                    IcAfter={CiLogout}
                  />
                </div>
              ) : (
                <></>
              )}
            </div>
            <span className="border-r-2 mr-2 ml-2 border-white"></span>
            <div
              onClick={() => {
                setNotification((prevNotification) => {
                  if (!prevNotification) setShowUser(false);
                  return !prevNotification;
                });
              }}
              className="relative z-20 flex items-center justify-center"
            >
              <div
                className={twMerge(
                  clsx(
                    "hover:cursor-pointer rounded-full hover:bg-overlay-30 flex items-center p-2",
                    notification && "bg-overlay-30"
                  )
                )}
              >
                <IoMdNotificationsOutline size={20} />
              </div>
              {notification ? (
                <div ref={userMenuRef}>
                  <NotificationTable />
                </div>
              ) : (
                <></>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default withRouter(Header);
