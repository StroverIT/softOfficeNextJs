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
<<<<<<< HEAD
  lg: "lg:h-[35rem]",
};
export default function ThumsGallery({ navSize, image }) {
=======
  lg: "lg:h-[21rem]",
};
export default function ThumsGallery({ navSize }) {
>>>>>>> d26f7cda55573513073816b1ede2bc730122a61e
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
<<<<<<< HEAD
            <section className="sm:px-24">
              <div
                className={`relative  h-96 sm:h-[30rem] md:h-[20rem] ${dictionary.lg} flex items-center justify-center`}
              >
                <Image src={`/uploads/${image}`} layout="fill" alt="Img" />
              </div>
            </section>
          </SwiperSlide>

=======
            <div className={`relative w-full h-52 ${dictionary.lg}`}>
              <Image
                src="/images/testCarousel.jpg"
                layout="fill"
                alt="This is test image"
              />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className={`relative w-full h-52 ${dictionary.lg}`}>
              <Image
                src="/images/testCarousel.jpg"
                layout="fill"
                alt="This is test image"
              />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className={`relative w-full h-52 ${dictionary.lg}`}>
              <Image
                src="/images/testCarousel.jpg"
                layout="fill"
                alt="This is test image"
              />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className={`relative w-full h-52 ${dictionary.lg}`}>
              <Image
                src="/images/testCarousel.jpg"
                layout="fill"
                alt="This is test image"
              />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className={`relative w-full h-52 ${dictionary.lg}`}>
              <Image
                src="/images/testCarousel.jpg"
                layout="fill"
                alt="This is test image"
              />
            </div>
          </SwiperSlide>
>>>>>>> d26f7cda55573513073816b1ede2bc730122a61e
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
<<<<<<< HEAD
          className="mt-3 mySwiper"
=======
          className="mySwiper mt-3"
>>>>>>> d26f7cda55573513073816b1ede2bc730122a61e
        >
          <SwiperSlide>
            <div className="relative w-full h-24">
              <Image
<<<<<<< HEAD
                src={`/uploads/${image}`}
                layout="fill"
                alt="Img"
                className="object-contain"
=======
                src="/images/testCarousel.jpg"
                layout="fill"
                alt="This is test image"
              />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="relative w-full h-24">
              <Image
                src="/images/testCarousel.jpg"
                layout="fill"
                alt="This is test image"
              />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="relative w-full h-24">
              <Image
                src="/images/testCarousel.jpg"
                layout="fill"
                alt="This is test image"
              />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="relative w-full h-24">
              <Image
                src="/images/testCarousel.jpg"
                layout="fill"
                alt="This is test image"
              />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="relative w-full h-24">
              <Image
                src="/images/testCarousel.jpg"
                layout="fill"
                alt="This is test image"
>>>>>>> d26f7cda55573513073816b1ede2bc730122a61e
              />
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </>
  );
}
