import image from "src/assets/property.png";
import avatar from "src/assets/avatar.png";
import icons from "src/utils/icons";
const {
  FaCar,
  MdOutlineBathtub,
  FaCropSimple,
  FaRegHeart,
  AiOutlineShareAlt,
  FaPlus,
} = icons;
const PropertyCard = () => {
  return (
    <div className="w-[20rem] h-[24rem] rounded-md bg-white shadow-2xl transition-all">
      <img src={image} alt="image" className="w-full h-[11rem]" />
      <div className="px-3 py-1">
        <div className="space-y-3 py-3 border-b-2">
          <p className="lg:text-base text-sm font-semibold hover:text-main-600 hover:underline cursor-pointer">
            US 92 ALLIUM PLACE, ORLANDO FL 32827
          </p>
          <p className="text-main-600 font-semibold">$ 590,693</p>
          <div className="flex items-center gap-4 lg:text-sm text-xs">
            <span className="text-gray-500 flex items-center gap-1">
              <FaCar /> 4
            </span>
            <span className="text-gray-500 flex items-center gap-1">
              <MdOutlineBathtub /> 2
            </span>
            <span className="text-gray-500 flex items-center gap-1">
              <FaCropSimple /> 2,096.00 ft
            </span>
          </div>
        </div>
        <div className="flex items-center justify-between py-3">
          <div className="flex items-center gap-2">
            <img
              src={avatar}
              alt="avatar"
              className="rounded-full h-8 w-8 object-cover cursor-pointer"
            />
            <p className="lg:text-sm text-xs font-semibold hover:text-main-600 cursor-pointer">
              Jenny Wilson
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
