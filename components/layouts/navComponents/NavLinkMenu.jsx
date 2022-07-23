import React, { useRef, useEffect, useState } from "react";
import { useRouter } from "next/router";
import classNames from "classnames";
// Icons
import { AiOutlineArrowLeft } from "react-icons/ai";
// Components

// Styles
import style from "../../../styles/navigation/NavLinks.module.css";
// Getted from tailwind config

const lg = "1024";

import NavLinkSubMenu from "./NavLinkSubMenu";
import LinkComp from "./LinkComp";

const NavLinkMenu = ({ title, articles, isHome }) => {
  const router = useRouter();

  const menu = useRef(null);
  const subMenu = useRef(null);

  const [xAnim, setXAnims] = useState(false);
  const [mobSubmenu, setMobSubMenu] = useState(false);
  // Resizing bug fix
  useEffect(() => {
    function handleResize() {
      console.log(window.innerWidth, lg);

      if (window.innerWidth >= lg) {
        setXAnims(false);
      }
    }
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  });
  // On router change to hide the submenu
  useEffect(() => {
    setMobSubMenu(false);
  }, [router.pathname]);

  // Remove submenu spacing on click BELOW LG version
  function showMenu(e) {
    if (window.innerWidth >= lg) return;
    setXAnims(true);
    setMobSubMenu(true);
  }

  const isXAnim = classNames({
    [style.subOpen]: xAnim,
  });

  return (
    <li
      className={`item w-full font-thin group ${!isHome ? "lg:w-64 mt-2" : ""}`}
    >
      {/* Menu */}
      <div
        className={`bg-white cursor-pointer text-dark lg:hover:text-dark lg:hover:bg-color ${
          !isHome ? "px-5 py-[0.40rem]" : "pl-4"
        } lg:py-2 flex w-full peer group-hover:lg:bg-color group-hover:lg:text-primary font-normal font-sans text-lg leading-5`}
        onClick={showMenu}
        ref={menu}
      >
        <div className={`${!isHome ? "max-lg:container" : ""}`}>{title}</div>
      </div>
      {/* Submenu */}
      <div
        className={`fixed  lg:absolute py-2 overflow-auto  ${
          mobSubmenu ? "translate-x-0" : "translate-x-full"
        } transition-transform lg:transition-none lg:translate-x-0 lg:scale-0 h-full w-full  top-0  bg-color  ${
          isHome ? "right-0" : "lg:right-[0px] xl:right-[0]"
        } lg:hover:scale-100 text-dark peer-hover:lg:scale-100 lg:max-w-[780px]  xl:max-w-[1050px]  ${isXAnim} `}
        ref={subMenu}
      >
        <div className={` flex items-center ml-2`}>
          <div
            type="button"
            className={`${style.icon} flex py-2 px-2 lg:hidden`}
            onClick={() => setMobSubMenu(false)}
          >
            <AiOutlineArrowLeft className="text-xl icon" />
          </div>
          <div className="pl-4 font-semibold">{title}</div>
        </div>
        {/* submenu list */}
        <ul className={`px-5  mt-2  grid grid-cols-2 lg:grid-cols-3 gap-x-2`}>
          {articles.map((article, index) => {
            const isObject = typeof article === "object";
            if (isObject) article = JSON.stringify(article);
            return isObject ? (
              <NavLinkSubMenu subMenuData={article} key={index} />
            ) : (
              <LinkComp
                route={article}
                mainRoute={title}
                isHome={isHome}
                key={article}
              />
            );
          })}
        </ul>
      </div>
    </li>
  );
};

export default NavLinkMenu;
