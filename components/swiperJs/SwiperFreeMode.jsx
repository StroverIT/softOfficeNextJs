import React, { useRef, useState } from "react";
// NextJs
import { useRouter } from "next/router";
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

export default function SwiperPromo({ data, navSize }) {
  const router = useRouter();

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
              slidesPerView: 1,
            },
            640: {
              slidesPerView: 2,
            },
            // when window width is >= 768px
            768: {
              slidesPerView: 2,
            },
          }}
          modules={[FreeMode, Pagination, Navigation]}
          className={`mySwiper relative freeModeSwiper w-full `}
        >
          {data.map((promo) => {
            const product = promo.product;
            const sum =
              (product.item.promotionalPrice / product.item.cena) * 100;
            const percentageRate = (100 - sum).toFixed(2).split(".");
            let pageUrl =
              product.itemLen > 1
                ? `${product.section.name}/${product.subsection._id}#${product.item._id}`
                : `${product.section.name}/${product.subsection._id}`;

            const name = `${product.section.nameToDisplay} ${product.subsection.nameToDisplay}`;
            return (
              <SwiperSlide
                className="flex flex-col bg-white shadow-lg cursor-pointer hover:shadow-xl relative my-2 "
                key={promo._id}
              >
                <div
                  onClick={() => router.push(`/products/${pageUrl}`)}
                  className="flex flex-col justify-between h-full  "
                >
                  <div className="">
                    <div className="flex items-center justify-center flex-col py-10">
                      <div className="relative h-60 w-60 ">
                        <Image
                          src={`/uploads/${product.subsection.imgUrl}`}
                          layout="fill"
                          alt={product.subsection.imgUrl}
                          className="object-contain"
                        />
                      </div>
                    </div>
                    <div className="container font-medium text-center border-t border-gray py-2">
                      <div className="text-xl">{name}</div>
                      <ul className="text-sm font-normal ">
                        {product.item.tipove
                          .split(";")
                          .splice(0, 5)
                          .map((type) => {
                            return <li key={type}>{type}</li>;
                          })}
                      </ul>
                    </div>
                  </div>
                  <PricingPromo
                    price={product.item.cena}
                    promoPrice={product.item.promotionalPrice}
                  />
                </div>
                <div className="absolute  z-50 -top-2 -right-2 bg-primary-100 text-white rounded-full p-2 text-sm">
                  -{percentageRate[0]}%
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
