/* eslint-disable react/prop-types */
import clsx from "clsx";
import withRouter from "src/hocs/withRouter";
import icons from "src/utils/icons";
import { twMerge } from "tailwind-merge";
const {
  FaFacebookF,
  FaLinkedinIn,
  FaInstagram,
  FaBehance,
  FaDribbble,
  FiPhone,
  HiOutlineMailOpen,
} = icons;
const Header = ({ location }) => {
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
        <span className="border-l-2 mr-3 ml-3 border-white"></span>
        <div className="flex items-center gap-2 ">
          <span className="lg:text-xl text-base">
            <FiPhone />
          </span>
          <span className="lg:text-xs text-xxs">123-4567 890</span>
        </div>
      </div>
    </div>
  );
};

export default withRouter(Header);
