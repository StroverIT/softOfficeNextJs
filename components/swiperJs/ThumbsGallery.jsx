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
// Styles
import navStyle from "../../styles/swiperJs/SwiperNav.module.css";
// Components
import SwiperNav from "./SwiperNav";

// import required modules
import { FreeMode, Navigation, Thumbs } from "swiper";

export default function ThumsGallery({ navSize }) {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  return (
    <>
      <div className="swiperContainer">
        <Swiper
          style={{
            "--swiper-navigation-color": "#fff",
            "--swiper-pagination-color": "#fff",
          }}
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
          modules={[FreeMode, Navigation, Thumbs]}
          className="relative mySwiper2"
        >
          <SwiperSlide>
            <div className="relative w-full h-52 lg:h-40">
              <Image src="/images/testCarousel.jpg" layout="fill" />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="relative w-full h-52 lg:h-40">
              <Image src="/images/testCarousel.jpg" layout="fill" />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="relative w-full h-52 lg:h-40">
              <Image src="/images/testCarousel.jpg" layout="fill" />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="relative w-full h-52 lg:h-40">
              <Image src="/images/testCarousel.jpg" layout="fill" />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="relative w-full h-52 lg:h-40">
              <Image src="/images/testCarousel.jpg" layout="fill" />
            </div>
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
          className="mySwiper"
        >
          <SwiperSlide>
            <div className="relative w-full h-24">
              <Image src="/images/testCarousel.jpg" layout="fill" />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="relative w-full h-24">
              <Image src="/images/testCarousel.jpg" layout="fill" />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="relative w-full h-24">
              <Image src="/images/testCarousel.jpg" layout="fill" />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="relative w-full h-24">
              <Image src="/images/testCarousel.jpg" layout="fill" />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="relative w-full h-24">
              <Image src="/images/testCarousel.jpg" layout="fill" />
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </>
  );
}
