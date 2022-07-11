// React and nextJs things
import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";

// Styles
import styles from "../../../styles/navigation/Hamburger.module.css";
// Components
import NavLinks from "./navLinks";

const Hamburger = ({ headRef }) => {
  const router = useRouter();

  const hamburger = useRef(null);
  const navLinks = useRef(null);

  const [isOpen, menuState] = useState(false);

  useEffect(() => {
    menuState(false);
  }, [router]);

  useEffect(() => {
    if (isOpen) {
      hamburger.current.classList.add(styles.open);
      navLinks.current.classList.add(styles.menuOpen);
      navLinks.current.style.top = `${headRef.current.offsetHeight}px`;
      document.body.classList.add("blury");
    }
    if (!isOpen) {
      hamburger.current.classList.remove(styles.open);
      navLinks.current.classList.remove(styles.menuOpen);
      document.body.classList.remove("blury");
    }
  }, [headRef, isOpen]);
  return (
    <>
      <div
        className={`px-2 cursor-pointer mt-1 lg:mt-1 ${styles.hamburger} ${
          router.route == "/" ? "lg:hidden" : ""
        }`}
        onClick={() => menuState(!isOpen)}
        ref={hamburger}
      >
        <div className="block w-6 h-[2px] bg-dark"></div>
        <div className="block w-5 h-[2px] bg-dark"></div>
        <div className="block w-3 h-[2px] bg-dark"></div>
      </div>
      <div
        className={`w-full lg:w-auto hover:lg:w-full fixed lg:absolute -z-20 bg-white py-3 ${
          styles.navLinks
        } ${router.route == "/" ? "lg:hidden" : ""} `}
        ref={navLinks}
      >
        <NavLinks />
      </div>
      <div
        className={`blury-bg -z-30 ${!isOpen ? "hidden" : ""}`}
        onClick={() => menuState(false)}
      ></div>
    </>
  );
};

export default Hamburger;
