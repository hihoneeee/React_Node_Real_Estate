import { useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  BreadCreumbPublic,
  Button,
  DetailSidebar,
  ImageDetail,
  SimilarProperty,
  TitleDetail,
} from "src/components";
import Loading from "src/components/common/loading";
import { useCategoryStore } from "src/store/useCategoryStore";
import { usePropertyStore } from "src/store/usePropertyStore";
import { showStatusProperty, showTypeProperty } from "src/utils/constant";
import icons from "src/utils/icons";
import { format, parseISO } from "date-fns";
import moment from "moment";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
const { MdOutlineBathtub, IoBedOutline, FaCropSimple, MdOutlineGarage } = icons;
const DetailProperty = () => {
  const { id } = useParams();
  const { getProperty, property } = usePropertyStore();
  const { categories } = useCategoryStore();
  useEffect(() => {
    getProperty(id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [id]);

  if (!property) {
    return (
      <div className="flex items-center justify-center content-center h-full w-full">
        <Loading />
      </div>
    );
  }

  const area = property?.price / property?.dataDetail?.size;
  const formattedArea = area?.toFixed(2);
  return (
    <div className="px-[16rem] desktop:px-[22rem] py-6 space-y-6 ">
      <div>
        <BreadCreumbPublic style="text-gray-500" />
      </div>
      <TitleDetail property={property} />
      <div className="space-y-8">
        <div className="flex justify-between gap-2">
          <ImageDetail images={property?.dataDetail?.images} />
          <DetailSidebar
            userData={property?.dataDetail?.userData}
            propertyId={property?.id}
          />
        </div>
        <div className="w-[70%] space-y-8">
          <div className="bg-white w-full rounded-md shadow-[5px_5px_5px_rgba(0,0,0,0.24)] border p-4 space-y-4">
            <h3 className=" laptop:text-xl text-base font-semibold cursor-pointer">
              <span className="border-l-8 border-main-500 mr-2"></span>
              Overview
            </h3>
            <div className="flex items-center justify-between">
              <div className="desktop:text-base laptop:text-sm text-xs font-medium">
                <p>Updated On:</p>
                <span>
                  {format(parseISO(property.updatedAt), "MMMM dd, yyyy")}
                </span>
              </div>
              <div className="desktop:text-base laptop:text-sm text-xs font-medium flex flex-col items-center justify-center">
                <IoBedOutline size={22} />
                <p>{property?.dataDetail?.bedroom} Bedrooms</p>
              </div>
              <div className="desktop:text-base laptop:text-sm text-xs font-medium flex flex-col items-center justify-center">
                <MdOutlineBathtub size={22} />
                <p>{property?.dataDetail?.bathroom} Bathrooms</p>
              </div>
              <div className="desktop:text-base laptop:text-sm text-xs font-medium flex flex-col items-center justify-center">
                <MdOutlineGarage size={22} />
                <p>{property?.dataDetail?.gara} Garages</p>
              </div>
              <div className="desktop:text-base laptop:text-sm text-xs font-medium flex flex-col items-center justify-center">
                <FaCropSimple size={22} />
                <p>{property?.dataDetail?.size} ft2</p>
              </div>
            </div>
          </div>
          <div className="bg-white w-full rounded-md shadow-[5px_5px_5px_rgba(0,0,0,0.24)] border p-4 space-y-4">
            <h3 className=" laptop:text-xl text-base font-semibold cursor-pointer">
              <span className="border-l-8 border-main-500 mr-2"></span>
              Description
            </h3>
            <div className="text-gray-500 desktop:text-base laptop:text-sm text-xs">
              {property?.description}
            </div>
          </div>
          <div className="bg-white w-full rounded-md shadow-[5px_5px_5px_rgba(0,0,0,0.24)] border p-4 space-y-4">
            <h3 className=" laptop:text-xl text-base font-semibold cursor-pointer">
              <span className="border-l-8 border-main-500 mr-2"></span>
              Location
            </h3>
            <div className="grid grid-cols-3 gap-2">
              <p className="desktop:text-base laptop:text-sm text-xs font-medium">
                Address:
                <span className="ml-1 laptop:text-sm text-xs text-gray-400">
                  {property?.dataDetail?.address}
                </span>
              </p>
              <p className="desktop:text-base laptop:text-sm text-xs font-medium">
                Province:
                <span className="ml-1 laptop:text-sm text-xs text-gray-400">
                  {property?.dataDetail?.province}
                </span>
              </p>
              <p className="desktop:text-base laptop:text-sm text-xs font-medium">
                City:
                <span className="ml-1 laptop:text-sm text-xs text-gray-400">
                  {property?.dataDetail?.city}
                </span>
              </p>
              <p className="desktop:text-base laptop:text-sm text-xs font-medium">
                Zipcode:
                <span className="ml-1 laptop:text-sm text-xs text-gray-400">
                  524662
                </span>
              </p>
              <p className="desktop:text-base laptop:text-sm text-xs font-medium">
                Country:
                <span className="ml-1 laptop:text-sm text-xs text-gray-400">
                  United States
                </span>
              </p>
            </div>
            <Button
              text="Open In Google Maps"
              className="px-2 py-1 bg-green-400 rounded-lg text-white hover:bg-overlay-50"
            />
          </div>
          <div className="bg-white w-full rounded-md shadow-[5px_5px_5px_rgba(0,0,0,0.24)] border p-4 space-y-4">
            <h3 className=" laptop:text-xl text-base font-semibold cursor-pointer">
              <span className="border-l-8 border-main-500 mr-2"></span>
              Details
            </h3>
            <div className="grid grid-cols-3 gap-2">
              <p className="desktop:text-base laptop:text-sm text-xs font-medium">
                Property code:
                <span className="ml-1 laptop:text-sm text-xs text-gray-400">
                  #{property?.id}
                </span>
              </p>
              <p className="desktop:text-base laptop:text-sm text-xs font-medium">
                Category:
                {categories?.map(
                  (el) =>
                    property?.categoryId === el.id && (
                      <span
                        key={el.value}
                        className="ml-1 laptop:text-sm text-xs text-gray-400"
                      >
                        {el.title}
                      </span>
                    )
                )}
              </p>
              <p className="desktop:text-base laptop:text-sm text-xs font-medium">
                Property type:
                {showTypeProperty?.map(
                  (el) =>
                    property?.type === el.value && (
                      <span
                        key={el.value}
                        className="ml-1 laptop:text-sm text-xs text-gray-400"
                      >
                        {el.title}
                      </span>
                    )
                )}
              </p>
              <p className="desktop:text-base laptop:text-sm text-xs font-medium">
                Property status:
                {showStatusProperty?.map(
                  (el) =>
                    property?.dataDetail?.status === el.value && (
                      <span
                        key={el.value}
                        className="ml-1 laptop:text-sm text-xs text-gray-400"
                      >
                        {el.title}
                      </span>
                    )
                )}
              </p>
              <p className="desktop:text-base laptop:text-sm text-xs font-medium">
                Price:
                <span className="ml-1 laptop:text-sm text-xs text-gray-400">
                  $ {property?.price}
                </span>
              </p>
              <p className="desktop:text-base laptop:text-sm text-xs font-medium">
                Price infor:
                <span className="ml-1 laptop:text-sm text-xs text-gray-400">
                  $ {formattedArea} / sq ft
                </span>
              </p>
              <p className="desktop:text-base laptop:text-sm text-xs font-medium">
                Bedrooms:
                <span className="ml-1 laptop:text-sm text-xs text-gray-400">
                  {property?.dataDetail?.bedroom}
                </span>
              </p>
              <p className="desktop:text-base laptop:text-sm text-xs font-medium">
                Bathrooms:
                <span className="ml-1 laptop:text-sm text-xs text-gray-400">
                  {property?.dataDetail?.bathroom}
                </span>
              </p>
              <p className="desktop:text-base laptop:text-sm text-xs font-medium">
                Garages size:
                <span className="ml-1 laptop:text-sm text-xs text-gray-400">
                  {property?.dataDetail?.gara} cars
                </span>
              </p>
              <p className="desktop:text-base laptop:text-sm text-xs font-medium">
                Year Built:
                <span className="ml-1 laptop:text-sm text-xs text-gray-400">
                  {property?.dataDetail?.yearBuild}
                </span>
              </p>
              <p className="desktop:text-base laptop:text-sm text-xs font-medium">
                Available from :
                <span className="ml-1 laptop:text-sm text-xs text-gray-400">
                  {moment(property?.dataDetail?.createdAt).format("YYYY-MM-DD")}
                </span>
              </p>
            </div>
          </div>
        </div>
        <SimilarProperty cateId={property?.categoryId} />
      </div>
    </div>
  );
};

export default DetailProperty;
