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
import PricingPromo from "../priceStyling/PricingPromo";
import SwiperNav from "./SwiperNav";

export default function SwiperProductSelect({
  articleItems,
  article,
  navSize,
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
              slidesPerView: 1.25,
            },
            640: {
              slidesPerView: 2,
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
            let price = item.cena.split(".");
            return (
              <SwiperSlide
                className="flex flex-col bg-white shadow-lg cursor-pointer hover:shadow-xl"
                key={item._id}
              >
                <div className="flex flex-col justify-between w-full h-full">
                  <div>
                    <div className="relative w-full h-96">
                      <Image
                        src={`/uploads/${article.img}`}
                        height={700}
                        width={1000}
                        // layout="fill"
                        alt={article.img}
                      />
                    </div>
                    <div className="container font-medium text-center border-t border-gray">
                      Gosho
                    </div>
                  </div>
                  <PricingPromo
                    // isPromo={image.isPromo}
                    price={price[0]}
                    priceDec={price[1]}
                  />
                </div>
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
