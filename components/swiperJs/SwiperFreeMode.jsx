import React, { useEffect, useState } from "react";
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
          {stateData.map((promo) => {
            const product = promo.product;
            const sum =
              (product?.item.promotionalPrice / product?.item.cena) * 100;
            const percentageRate = (100 - sum).toFixed(2).split(".");
            let pageUrl = `${product?.section.name}/${product?.subsection._id}`;

            const name = `${product?.section.nameToDisplay} ${product?.subsection.nameToDisplay}`;
            return (
              <SwiperSlide
                className="relative flex flex-col my-2 bg-white shadow-lg cursor-pointer hover:shadow-xl "
                key={promo._id}
              >
                <div
                  onClick={() => router.push(`/products/${pageUrl}`)}
                  className="flex flex-col justify-between h-full "
                >
                  <div className="">
                    <div className="flex flex-col items-center justify-center py-10">
                      <div className="relative h-60 w-60 ">
                        <Image
                          src={`/uploads/${
                            product?.subsection && product?.subsection?.imgUrl
                          }`}
                          layout="fill"
                          alt={product?.subsection.imgUrl}
                          className="object-contain"
                        />
                      </div>
                    </div>
                    <div
                      className={`container py-2 font-medium text-center border-t border-gray `}
                    >
                      <div className="text-xl">{name}</div>
                      {!promo.moreThanOne && (
                        <ul className="text-sm font-normal ">
                          {product?.item.tipove
                            .split(";")
                            .splice(0, 5)
                            .map((type) => {
                              return <li key={type}>{type}</li>;
                            })}
                        </ul>
                      )}
                      {promo.moreThanOne && (
                        <div className="flex items-center justify-center mt-10 text-xl text-primary-100 ">
                          <div className="w-1/2">
                            Вижте всички промоционални продукти на тази серия
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  {!promo.moreThanOne && (
                    <PricingPromo
                      price={product.item.cena}
                      promoPrice={product.item.promotionalPrice}
                    />
                  )}
                </div>
                {!promo.moreThanOne && (
                  <div className="absolute z-50 p-2 text-sm text-white rounded-full -top-2 -right-2 bg-primary-100">
                    -{percentageRate[0]}%
                  </div>
                )}
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
