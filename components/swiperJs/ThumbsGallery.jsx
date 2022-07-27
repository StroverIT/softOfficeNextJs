import React, { useRef, useState } from "react";
// NextJs
import Image from "next/image";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import "swiper/css/zoom";
// Styles
import navStyle from "../../styles/swiperJs/SwiperNav.module.css";
// Components
import SwiperNav from "./SwiperNav";

// import required modules
import { FreeMode, Navigation, Thumbs, Zoom } from "swiper";

const dictionary = {
  lg: "lg:h-[21rem]",
};
export default function ThumsGallery({ navSize, image }) {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  return (
    <>
      <div>
        <Swiper
          zoom={true}
          spaceBetween={10}
          navigation={{
            nextEl: `.${navStyle.swiperNext}`,
            prevEl: `.${navStyle.swiperPrev}`,
            disabledClass: `${navStyle.swiperDisabled}`,
          }}
          thumbs={{
            swiper:
              thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
          }}
          modules={[FreeMode, Navigation, Thumbs, Zoom]}
          className="relative mySwiper2 "
        >
          {image && (
            <SwiperSlide>
              <div className="flex items-center justify-center">
                <div
                  className={`relative w-full sm:w-64 md:w-96 h-52 ${dictionary.lg} `}
                >
                  <Image src={`/uploads/${image}`} layout="fill" alt={image} />
                </div>
              </div>
            </SwiperSlide>
          )}

          <SwiperNav size={navSize} />
        </Swiper>

        <Swiper
          onSwiper={setThumbsSwiper}
          spaceBetween={10}
          slidesPerView={2}
          freeMode={true}
          watchSlidesProgress={true}
          modules={[FreeMode, Navigation, Thumbs]}
          breakpoints={{
            // when window width is >= 640px
            670: {
              slidesPerView: 3,
            },

            // when window width is >= 768px
          }}
          className="mySwiper mt-3"
        >
          {/* <SwiperSlide>
            <div className="relative w-36 h-24">
              <Image src={`/uploads/${image}`} layout="fill" alt={image} />
            </div>
          </SwiperSlide> */}
        </Swiper>
      </div>
    </>
  );
}
