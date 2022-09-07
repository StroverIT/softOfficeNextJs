import React, { useRef, useState } from "react";
// NextJs
import Image from "next/image";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";

// Custom styles
import style from "../../styles/swiperJs/SwiperFreeMode.module.css";
import navStyle from "../../styles/swiperJs/SwiperNav.module.css";

// import required modules
import { FreeMode, Pagination, Navigation } from "swiper";

// Components
import Pricing from "../priceStyling/Pricing";
import OldPrice from "../priceStyling/OldPrice";

import SwiperNav from "./SwiperNav";
import SwiperProductSelectSwiperSlide from "./SwiperProductSelectSwiperSlide";

export default function SwiperProductSelect({
  articleItems,
  article,
  navSize,
  onClick,
  name,
  personalPromotions,
}) {
  return (
    <>
      <div className="flex flex-row items-stretch swipebody">
        <Swiper
          slidesPerView={3}
          spaceBetween={10}
          freeMode={true}
          navigation={{
            nextEl: `.${navStyle.swiperNext}`,
            prevEl: `.${navStyle.swiperPrev}`,
            disabledClass: `${navStyle.swiperDisabled}`,
          }}
          pagination={{
            el: `.${style.pagination}`,
            clickable: true,
          }}
          breakpoints={{
            // when window width is >= 640px
            0: {
              slidesPerView: articleItems.length > 1 ? 1 : 1.25,
            },
            640: {
              slidesPerView: articleItems.length > 1 ? 1 : 2,
            },
            // when window width is >= 768px
            768: {
              slidesPerView: articleItems.length > 3 ? 3 : 2,
            },
          }}
          modules={[FreeMode, Pagination, Navigation]}
          className={`mySwiper relative freeModeSwiper`}
        >
          {articleItems.map((item) => {
            return (
              <SwiperSlide
                className="flex flex-col bg-white shadow-lg cursor-pointer hover:shadow-xl"
                key={item._id}
                onClick={() => onClick({ item })}
              >
                <SwiperProductSelectSwiperSlide
                  article={article}
                  personalPromotions={personalPromotions}
                  item={item}
                />
              </SwiperSlide>
            );
          })}
          {/* Nav */}
          <SwiperNav size={navSize} />
          <div
            className={`${style.pagination} z-10 flex justify-center gap-2 mt-5`}
          ></div>
        </Swiper>
      </div>
    </>
  );
}
