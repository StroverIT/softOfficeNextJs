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
  lg: "lg:h-[35rem]",
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
          className="relative mySwiper2"
        >
          <SwiperSlide>
            <section className="sm:px-24">
              <div
                className={`relative  h-96 sm:h-[30rem] md:h-[20rem] ${dictionary.lg} flex items-center justify-center`}
              >
                <Image src={`/uploads/${image}`} layout="fill" alt="Img" />
              </div>
            </section>
          </SwiperSlide>

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
          className="mt-3 mySwiper"
        >
          <SwiperSlide>
            <div className="relative w-full h-24">
              <Image
                src={`/uploads/${image}`}
                layout="fill"
                alt="Img"
                className="object-contain"
              />
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </>
  );
}
