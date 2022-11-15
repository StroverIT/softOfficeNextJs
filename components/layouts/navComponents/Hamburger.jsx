// React and nextJs things
import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";

// Styles
import styles from "../../../styles/navigation/Hamburger.module.css";
// Components

const Hamburger = ({ headRef, isOpen, menuState }) => {
  const router = useRouter();

  const hamburger = useRef(null);

  useEffect(() => {
    menuState(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router]);
  useEffect(() => {
    if (isOpen) {
      hamburger.current.classList.add(styles.open);
    }
    if (!isOpen) {
      hamburger.current.classList.remove(styles.open);
    }
  }, [headRef, isOpen]);

  return (
    <>
      <div
        className={`px-2 lg:pl-10 cursor-pointer h-full  flex  lg:pt-3  justify-center items-center`}
        onClick={() => menuState(!isOpen)}
      >
        <div className={`${styles.hamburger}`} ref={hamburger}>
          <div className="block w-6 h-[1px] md:w-6 md:h-[2px] lg:bg-primary-100 bg-white"></div>
          <div className="block w-6 h-[1px] md:w-6 md:h-[2px] lg:bg-primary-100 bg-white"></div>
          <div className="block w-3 h-[1px] md:w-3 md:h-[2px] lg:bg-primary-100 bg-white"></div>
        </div>
        <div className="hidden pl-2 -mt-1 text-lg font-medium text-white lg:flex">
          Каталог
        </div>
      </div>
    </>
  );
};

export default Hamburger;
