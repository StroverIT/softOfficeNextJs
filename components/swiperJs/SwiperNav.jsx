import React from "react";
// Icons
import { IoMdArrowDropright, IoMdArrowDropleft } from "react-icons/io";
// Styles
import style from "../../styles/swiperJs/SwiperNav.module.css";

const SwiperNav = ({ size }) => {
  return (
    <div className={`${style.swiperNav} z-10 text-${size} hidden sm:inline`}>
      <div
        className={`${style.swiperPrev} flex items-center justify-center cursor-pointer absolute z-10 select-none p-3`}
      >
        <IoMdArrowDropleft />
      </div>
      <div
        className={`${style.swiperNext} flex items-center justify-center cursor-pointer absolute z-10 select-none p-3 `}
      >
        <IoMdArrowDropright />
      </div>
    </div>
  );
};

export default SwiperNav;
