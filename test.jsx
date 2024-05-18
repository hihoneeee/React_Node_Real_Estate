/* eslint-disable react/prop-types */
import { Fragment, useRef, useState, useEffect } from "react";
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
  const [showBox, setShowBox] = useState(false);
  const optionBox = useRef();
  const handleLogout = () => {
    setToken(null);
    getCurrent(null);
    clearCurrent();
    toast.success("Logout successfully!");
  };

  useEffect(() => {
    const handleCloseBox = (e) => {
      if (optionBox.current.contains(e.target)) {
        setShowBox(true);
      } else setShowBox(false);
    };
    window.addEventListener("click", handleCloseBox);
    return () => {
      window.removeEventListener("click", handleCloseBox);
    };
  }, []);
  return (
    <div
      className={twMerge(
        clsx(
          "px-20 py-6 flex items-center justify-between border-b-2 bg-transparen text-white fixed w-full z-10 top-[0px]",
          location.pathname !== "/" && "bg-main-700"
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
                onClick={() => setShowBox(true)}
                ref={optionBox}
              >
                <img
                  className="h-8 w-8 object-cover "
                  src={iconUser}
                  alt="Icon User"
                ></img>
              </div>

              {showBox && (
                <div className="flex flex-col items-center gap-3 bg-white absolute text-black p-4 top-[3.5rem] z-30 w-[8rem]">
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
                  <Button
                    text="Logout"
                    className="text-white bg-main-500 px-4 py-2 w-full"
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
