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
      className={`item w-full  font-thin group  ${
        !isHome ? "lg:w-64 mt-2" : ""
      }`}
    >
      {/* Menu */}
      <div
        className={`bg-white cursor-pointer text-dark lg:hover:text-dark lg:hover:bg-color 
          px-5 py-[0.40rem] 
         lg:py-2 flex w-full peer group-hover:lg:bg-color group-hover:lg:text-primary font-normal font-sans text-lg leading-5`}
        onClick={showMenu}
        ref={menu}
      >
        <div className={"max-lg:container text-xl"}>{title}</div>
      </div>
      {/* Submenu */}
      {/* Absolute */}
      <div
        className={`fixed  lg:absolute py-2 overflow-auto  ${
          mobSubmenu
            ? "translate-x-0 left-0"
            : "translate-x-[150vw] left-[150vw]"
        } transition-all lg:transition-none lg:translate-x-0 lg:scale-0 h-full w-full  top-0  bg-color   lg:hover:scale-100 text-dark peer-hover:lg:scale-100 lg:left-[255px] pr-[255px] ${isXAnim} `}
        ref={subMenu}
      >
        <div className={` flex items-center ml-2 max-md:w-screen pt-5`}>
          <div
            type="button"
            className={`${style.icon} flex py-2 px-2 lg:hidden`}
            onClick={() => setMobSubMenu(false)}
          >
            <AiOutlineArrowLeft className="text-xl icon" />
          </div>
          <div className="pb-2 pl-4 text-xl font-semibold text-dark">
            {title}
          </div>
        </div>
        {/* submenu list */}
        <ul
          className={`px-8  mt-2 w-screen md:w-auto md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-0 gap-y-2`}
        >
          {articles.map((article, index) => {
            return article?.menu ? (
              <NavLinkSubMenu
                subMenuData={JSON.stringify(article.subMenu)}
                menu={article.menu}
                key={index}
              />
            ) : (
              <LinkComp
                route={article.name}
                name={article.displayName}
                key={index}
              />
            );
          })}
        </ul>
      </div>
    </li>
  );
};

export default NavLinkMenu;
