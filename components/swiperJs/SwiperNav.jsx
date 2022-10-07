import React from "react";
// Icons
import { MdArrowForwardIos, MdOutlineArrowBackIosNew } from "react-icons/md";
import { IoMdArrowDropright, IoMdArrowDropleft } from "react-icons/io";
import { BsArrowRightCircle, BsArrowLeftCircle } from "react-icons/bs";
// Styles
import style from "../../styles/swiperJs/SwiperNav.module.css";

const SwiperNav = ({ size }) => {
  const animateArrow = (e) => {};
  return (
    <div className={`${style.swiperNav} z-10 text-${size} hidden sm:inline`}>
      <div className={`${style.swiperPrev}  absolute z-10  `}>
        <div
          className="relative flex items-center justify-center bg-white rounded-full cursor-pointer select-none text-primary"
          onMouseEnter={animateArrow}
        >
          <div className="relative flex">
            {/* <div className="absolute left-4">
              <MdOutlineArrowBackIosNew />
            </div> */}
            <BsArrowLeftCircle />
          </div>
        </div>
      </div>
      <div className={`${style.swiperNext}  absolute z-10  `}>
        <div
          className="relative flex items-center justify-center bg-white rounded-full cursor-pointer select-none text-primary"
          onMouseEnter={animateArrow}
        >
          <div className="relative flex">
            {/* <div className="absolute left-4">
              <MdArrowForwardIos />
            </div> */}
            <BsArrowRightCircle />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SwiperNav;
