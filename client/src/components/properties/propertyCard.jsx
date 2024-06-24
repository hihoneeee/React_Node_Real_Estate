/* eslint-disable react/prop-types */
import { formatMoney } from "src/utils/constant";
import icons from "src/utils/icons";
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
    <div className="w-[20rem] h-[25rem] rounded-xl bg-white shadow-xl transition-all ">
      <img
        src={properties?.avatar}
        alt="image"
        className="w-full h-[12.5rem] rounded-t-xl"
      />
      <div className="px-3 py-1 h-[12.5rem]">
        <div className="space-y-3 py-3 border-b-2 h-[8.5rem]">
          <p className="lg:text-base text-sm font-semibold hover:text-main-600 hover:underline cursor-pointer">
            {properties?.address}, {properties?.title} - {properties?.yearBuild}
          </p>
          <p className="text-main-600 font-semibold">
            $ {formatMoney(properties?.price)}
          </p>
          <div className="flex items-center gap-4 lg:text-sm text-xs">
            <span className="text-gray-500 flex items-center gap-1">
              <IoBedOutline /> {properties?.bedroom}
            </span>
            <span className="text-gray-500 flex items-center gap-1">
              <MdOutlineBathtub /> {properties?.bathroom}
            </span>
            <span className="text-gray-500 flex items-center gap-1">
              <FaCropSimple /> {properties?.size}{" "}
              <span>
                m<sup>2</sup>
              </span>
            </span>
          </div>
        </div>
        <div className="flex items-center justify-between py-3 h-[4rem]">
          <div className="flex items-center gap-2">
            <img
              src={properties?.userData?.avatar}
              alt="avatar"
              className="rounded-full h-8 w-8 object-cover cursor-pointer"
            />
            <p className="lg:text-sm text-xs font-semibold hover:text-main-600 cursor-pointer">
              {properties?.userData?.name}
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
