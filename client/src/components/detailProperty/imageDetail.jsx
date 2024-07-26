import { Image } from "antd";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { useState } from "react";
import "../../index.css";
const ImageDetail = ({ images }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  return (
    <div className="w-[70%] space-y-4 rounded-md">
      <Swiper
        style={{
          "--swiper-navigation-color": "#ccc",
          "--swiper-pagination-color": "#fff",
        }}
        spaceBetween={10}
        navigation={true}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper2"
      >
        {images?.map((el, idx) => (
          <SwiperSlide key={idx}>
            <Image className="rounded-md w-full important" src={el} alt="images" />
          </SwiperSlide>
        ))}
      </Swiper>
      <Swiper
        onSwiper={setThumbsSwiper}
        spaceBetween={10}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper"
      >
        {images?.map((el, idx) => (
          <SwiperSlide key={idx}>
            <img className="rounded-md" src={el} alt="images" />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ImageDetail;
