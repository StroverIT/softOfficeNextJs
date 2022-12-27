import React, { useRef, useState } from "react";

import Image from "next/image";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

// import required modules
import { EffectCoverflow, Pagination } from "swiper";

import style from "../../styles/swiperJs/SwiperFreeMode.module.css";
import navStyle from "../../styles/swiperJs/SwiperNav.module.css";
import StarsTo5 from "../../lib/createProduct/StarsTo5";

export default function SwiperCoverFlow({ data }) {
  return (
    <>
      <Swiper
        effect={"coverflow"}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={"auto"}
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        }}
        // navigation={{
        //   nextEl: `.${navStyle.swiperNext}`,
        //   prevEl: `.${navStyle.swiperPrev}`,
        //   disabledClass: `${navStyle.swiperDisabled}`,
        // }}
        // pagination={{
        //   el: `.${style.pagination}`,
        //   clickable: true,
        // }}
        modules={[EffectCoverflow, Pagination]}
        className="mySwiper"
      >
        {data.map((review) => {
          return (
            <SwiperSlide
              key={review.key}
              className="w-full h-full p-5 bg-white rounded-xl"
            >
              <div>
                {/* Stars */}
                <section className="flex items-center justify-center">
                  <StarsTo5 stars={review.stars} />
                </section>
                {/* Paragraph */}
                <div className="relative">
                  <p className="relative z-20 py-8 text-sm">
                    {review.paragraph}
                  </p>
                  <div className="absolute top-0 left-0 z-10">
                    <div className="relative h-5 opacity-25 w-7">
                      <Image src="/quote-top.png" alt="quote" layout="fill" />
                    </div>
                  </div>
                  <div className="absolute bottom-0 right-0 z-10">
                    <div className="relative opacity-25 h-7 w-7">
                      <Image
                        src="/quote-bottom.png"
                        alt="quote"
                        layout="fill"
                      />
                    </div>
                  </div>
                </div>
                <div className="flex items-center justif-center gap-x-5">
                  {/* Image */}
                  <div className="relative w-20 h-20 border-2 rounded-full border-blue ">
                    <Image
                      src={review.image || "/user.png"}
                      layout="fill"
                      alt="user"
                      objectFit="contain"
                      className="rounded-full"
                    />
                  </div>
                  <div className="text-xl font-normal lg:text-2xl">
                    {/* Name */}
                    {review.name}
                  </div>
                </div>
              </div>
            </SwiperSlide>
          );
        })}
        {/* <SwiperSlide>
          <img src="https://swiperjs.com/demos/images/nature-2.jpg" />
        </SwiperSlide> */}
      </Swiper>
    </>
  );
}
