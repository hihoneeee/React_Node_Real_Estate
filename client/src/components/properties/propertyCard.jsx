/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { formatMoney } from "src/utils/constant";
import { formatVNToString } from "src/utils/formatCode";
import icons from "src/utils/icons";
import { path } from "src/utils/path";
const {
  MdOutlineBathtub,
  FaCropSimple,
  FaRegHeart,
  AiOutlineShareAlt,
  FaPlus,
  IoBedOutline,
} = icons;
const PropertyCard = ({ properties }) => {
  return (
    <div className="w-[20rem] h-[25rem] rounded-xl bg-white shadow-[0px_10px_10px_rgba(0,0,0,0.24)] transition-all ">
      <img
        src={properties?.avatar}
        alt="image"
        className="w-full h-[12.5rem] rounded-t-xl"
      />
      <div className="px-3 py-1 h-[12.5rem]">
        <div className="space-y-3 py-3 border-b-2 h-[8.5rem]">
          <Link
            to={`/${path.DETAIL_PROPERTY.replace(
              ":title",
              formatVNToString(properties?.title)
            ).replace(":id", properties.id)}`}
            className="lg:text-base text-sm font-semibold hover:text-main-600 hover:underline cursor-pointer"
          >
            {properties?.dataDetail?.address}, {properties?.title}
          </Link>
          <p className="text-main-600 font-semibold">
            $ {formatMoney(properties?.price)}
          </p>
          <div className="flex items-center gap-4 lg:text-sm text-xs">
            <span className="text-gray-500 flex items-center gap-1">
              <IoBedOutline /> {properties?.dataDetail?.bedroom}
            </span>
            <span className="text-gray-500 flex items-center gap-1">
              <MdOutlineBathtub /> {properties?.dataDetail?.bathroom}
            </span>
            <span className="text-gray-500 flex items-center gap-1">
              <FaCropSimple /> {properties?.dataDetail?.size}{" "}
              <span>
                m<sup>2</sup>
              </span>
            </span>
          </div>
        </div>
        <div className="flex items-center justify-between py-3 h-[4rem]">
          <div className="flex items-center gap-2">
            <img
              src={properties?.dataDetail?.userData?.avatar}
              alt="avatar"
              className="rounded-full h-8 w-8 object-cover cursor-pointer"
            />
            <p className="lg:text-sm text-xs font-semibold hover:text-main-600 cursor-pointer">
              {properties?.dataDetail?.userData?.first_name}
              {properties?.dataDetail?.userData?.last_name}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <div className="p-1 bg-main-200 text-main-600 cursor-pointer">
              <AiOutlineShareAlt />
            </div>
            <div className="p-1 bg-main-200 text-main-600 cursor-pointer">
              <FaRegHeart />
            </div>
            <div className="p-1 bg-main-200 text-main-600 cursor-pointer">
              <FaPlus />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
