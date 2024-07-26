import { usePropertyStore } from "src/store";
import { PropertyCard } from "..";
import { useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";

import "swiper/css/thumbs";

const SimilarProperty = ({ cateId }) => {
  const { getSimilarProperties, similarProperties } = usePropertyStore();
  useEffect(() => {
    getSimilarProperties({
      categoryId: cateId,
      sort: "-createdAt",
      limit: "9",
    });
  }, []);
  return (
    <div className="w-[70%] bg-white">
      <h3 className="p-4 laptop:text-xl text-base font-semibold cursor-pointer">
        <span className="border-l-8 border-main-500 mr-2"></span>
        Similar Listings
      </h3>{" "}
      <Swiper
        pagination={{
          clickable: true,
        }}
        breakpoints={{
          1366: {
            spaceBetween: 70,
            slidesPerView: 2,
          },
          1920: {
            spaceBetween: -150,
            slidesPerView: 2,
            freeMode: true,
          },
        }}
        modules={[Pagination]}
        className="mySwiper h-[30rem]"
      >
        {similarProperties.map((property) => (
          <SwiperSlide key={property.id} className="cursor-grab">
            <PropertyCard properties={property} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default SimilarProperty;
