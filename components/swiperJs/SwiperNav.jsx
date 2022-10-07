import React from "react";
// Icons
<<<<<<< HEAD
import { MdArrowForwardIos, MdOutlineArrowBackIosNew } from "react-icons/md";
import { IoMdArrowDropright, IoMdArrowDropleft } from "react-icons/io";
import { BsArrowRightCircle, BsArrowLeftCircle } from "react-icons/bs";
=======
import { IoMdArrowDropright, IoMdArrowDropleft } from "react-icons/io";
>>>>>>> d26f7cda55573513073816b1ede2bc730122a61e
// Styles
import style from "../../styles/swiperJs/SwiperNav.module.css";

const SwiperNav = ({ size }) => {
<<<<<<< HEAD
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
=======
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
>>>>>>> d26f7cda55573513073816b1ede2bc730122a61e
      </div>
    </div>
  );
};

export default SwiperNav;
