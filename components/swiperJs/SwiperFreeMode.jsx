import React, { useEffect, useState } from "react";
// NextJs
import { useRouter } from "next/router";

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
import SwiperNav from "./SwiperNav";

import Promo from "../Home/Promo"

export default function SwiperPromo({ data, navSize }) {
  const router = useRouter();
  const [stateData, setStateData] = useState([]);
  useEffect(() => {
    const existed = [];
    const newData = [];
    data?.forEach((item) => {
      const sectionName = item.product?.section.nameToDisplay;
      const subSectionName = item.product?.subsection.nameToDisplay;

      const name = `${sectionName} ${subSectionName}`;
      if (existed.includes(name)) {
        const indexOfFound = newData.findIndex(
          (index) =>
            index.product?.section.nameToDisplay == sectionName &&
            index.product?.subsection.nameToDisplay == subSectionName
        );
        if (indexOfFound != -1) newData[indexOfFound].moreThanOne = true;

        return;
      } else existed.push(name);
      newData.push({ ...item, moreThanOne: false });
    });
    setStateData(newData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  console.log(stateData);
  return (
    <>
      <div className="flex flex-row items-stretch ">
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
              slidesPerView: 3,
            },
          }}
          modules={[FreeMode, Pagination, Navigation]}
          className={`mySwiper  freeModeSwiper w-full !overflow-visible `}
        >
          {stateData.map((promo) => {
          return <SwiperSlide  className="relative flex flex-col my-2 bg-white shadow-lg cursor-pointer hover:shadow-xl "
          key={promo._id}> <Promo promo={promo} router={router}/></SwiperSlide>
          })}
          {/* Nav */}
          <SwiperNav size={navSize} />
          <div
            className={`${style.pagination} z-10 flex justify-center gap-2 mt-10`}
          ></div>
        </Swiper>
      </div>
    </>
  );
}
