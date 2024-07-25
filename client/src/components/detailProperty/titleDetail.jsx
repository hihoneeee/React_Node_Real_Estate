import { showStatusProperty, showTypeProperty } from "src/utils/constant";
import Button from "../common/button";
import icons from "src/utils/icons";
import { useCategoryStore } from "src/store";
const { FaMapLocationDot, AiOutlineShareAlt, FaRegHeart, IoPrintSharp } = icons;
const TitleDetail = ({ property }) => {
  const { categories } = useCategoryStore();
  const area = property?.price / property?.dataDetail?.size;
  const formattedArea = area?.toFixed(2);
  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-2">
          {showTypeProperty?.map(
            (el) =>
              property?.type === el.value && (
                <span
                  key={el.value}
                  className="px-3 py-1 laptop:text-xs text-xss bg-main-500 text-white hover:bg-blue-800 cursor-pointer rounded-lg"
                >
                  {el.title}
                </span>
              )
          )}
          {categories?.map(
            (el) =>
              property?.categoryId === el.id && (
                <span
                  key={el.value}
                  className="px-3 py-1 bg-main-500 text-white laptop:text-xs text-xss hover:bg-blue-800 cursor-pointer rounded-lg"
                >
                  {el.title}
                </span>
              )
          )}
          {showStatusProperty?.map(
            (el) =>
              property?.dataDetail?.status === el.value && (
                <span
                  key={el.value}
                  className="px-3 py-1 laptop:text-xs text-xss bg-main-500 text-white hover:bg-blue-800 cursor-pointer rounded-lg"
                >
                  {el.title}
                </span>
              )
          )}
        </div>
        <h2 className="laptop:text-4xl text-3xl font-semibold ">
          {property?.title}
        </h2>
        <div className="flex items-center gap-2">
          <FaMapLocationDot size={20} />
          <p className="laptop:text-xs text-xxs">
            {" "}
            {property?.dataDetail?.address}, {property?.dataDetail?.province},{" "}
            {property?.dataDetail?.city}
          </p>
        </div>
      </div>
      <div className="flex flex-col items-end gap-2">
        <p className="laptop:text-xl text-xs font-semibold text-main-300 shadow-2xl">
          $ {formattedArea} / sq ft
        </p>
        <h2 className="laptop:text-3xl text-xl font-semibold text-main-500 shadow-2xl">
          $ {property?.price?.toLocaleString()}
        </h2>
        <div className="flex items-center gap-2">
          <Button
            text="Share"
            IcAfter={AiOutlineShareAlt}
            className="px-2 py-1 rounded-md bg-white "
          />
          <Button
            text="Favorite"
            IcAfter={FaRegHeart}
            className="px-2 py-1 rounded-md bg-white "
          />
          <Button
            text="Print"
            IcAfter={IoPrintSharp}
            className="px-2 py-1 rounded-md bg-white "
          />
        </div>
      </div>
    </div>
  );
};

export default TitleDetail;
