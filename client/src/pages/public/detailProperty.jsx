import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { BreadCreumbPublic, Button, DetailSidebar } from "src/components";
import { useCategoryStore } from "src/store/useCategoryStore";
import { usePropertyStore } from "src/store/usePropertyStore";
import { showTypeProperty } from "src/utils/constant";
import icons from "src/utils/icons";

const { FaMapLocationDot, AiOutlineShareAlt, FaRegHeart, IoPrintSharp } = icons;
const DetailProperty = () => {
  const { id } = useParams();
  const { getProperty, property } = usePropertyStore();
  const { categories } = useCategoryStore();

  useEffect(() => {
    getProperty(id);
  }, [id]);

  if (!property) {
    return <div>Loading...</div>;
  }
  const area = property?.data?.price / property?.data?.dataDetail?.size;
  const formattedArea = area?.toFixed(2);
  return (
    <div className="px-52 py-6 space-y-6 h-screen">
      <div>
        <BreadCreumbPublic style="text-gray-500" />
      </div>
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2">
            {showTypeProperty?.map(
              (el) =>
                property.data?.type === el.value && (
                  <span
                    key={el.value}
                    className="px-2 py-1 laptop:text-xs text-xss bg-main-500 text-white hover:bg-blue-800 cursor-pointer rounded-lg"
                  >
                    {el.title}
                  </span>
                )
            )}
            {categories?.map(
              (el) =>
                property.data?.categoryId === el.id && (
                  <span
                    key={el.value}
                    className="px-2 py-1 bg-main-500 text-white laptop:text-xs text-xss hover:bg-blue-800 cursor-pointer rounded-lg"
                  >
                    {el.title}
                  </span>
                )
            )}
          </div>
          <h2 className="laptop:text-4xl text-3xl font-semibold ">
            {property?.data?.title}
          </h2>
          <div className="flex items-center gap-2">
            <FaMapLocationDot size={20} />
            <p className="laptop:text-xs text-xxs">
              {" "}
              {property?.data?.dataDetail?.address},{" "}
              {property?.data?.dataDetail?.province},{" "}
              {property?.data?.dataDetail?.city}
            </p>
          </div>
        </div>
        <div className="flex flex-col items-end gap-2">
          <p className="laptop:text-xl text-xs font-semibold text-main-300 shadow-2xl">
            $ {formattedArea} / sq ft
          </p>
          <h2 className="laptop:text-3xl text-xl font-semibold text-main-500 shadow-2xl">
            $ {property.data?.price?.toLocaleString()}
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
      <div className="flex items-center gap-8">
        <div className="w-[70%] border border-red-400"></div>
        <DetailSidebar
          userData={property?.data?.dataDetail?.userData}
          propertyId={property?.data?.id}
        />
      </div>
    </div>
  );
};

export default DetailProperty;
