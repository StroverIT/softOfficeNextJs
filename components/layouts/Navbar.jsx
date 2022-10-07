import React, { useRef, useState, useEffect } from "react";
// NextJs
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";

// Nav Components
import Hamburger from "./navComponents/Hamburger";
import style from "../../styles/navigation/Nav.module.css";

// Icons and images
import { AiOutlineUser, AiOutlineHeart, AiOutlineSearch } from "react-icons/ai";
import { BsCart3 } from "react-icons/bs";
// Utils
import isObjectEmpty from "../../utils/isObjectEmpty";
// Redux cart
import { connect } from "react-redux";

const Navbar = ({ cartTotalQty }) => {
  const router = useRouter();

  const headerRef = useRef(null);
  const searchMenu = useRef(null);

  const [show, setShow] = useState(null);
  const [lastScrollY, setLastScrollY] = useState(0);

  const [showSearch, setShowSearch] = useState(false);
  const [searchTabInputs, setSearchTabInputs] = useState({});
  const [searchInput, setSearchInput] = useState("");
  const [cartNum, setCartNum] = useState(0);
  // Navbar control handler
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const controlNavbar = () => {
    if (window.scrollY > lastScrollY) {
      setShow(true);
      setShowSearch(false);
    } else {
      setShow(false);
    }

    const bottom =
      document.body.clientHeight - window.innerHeight <=
      Math.ceil(lastScrollY + 20);
    if (bottom) {
      setShow(false);
    }
    setLastScrollY(window.scrollY);
  };
  const searchHandler = async (e) => {
    setSearchInput(e.target.value);

    const res = await fetch("/api/search", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ input: e.target.value }),
    });
    const data = await res.json();
    setSearchTabInputs(data);
  };
  useEffect(() => {
    setCartNum(cartTotalQty);
  }, [cartTotalQty]);
  // Hide menu on router change
  useEffect(() => setShowSearch(false), [router]);
  useEffect(() => {
    if (showSearch) {
      document.body.style.overflowY = "hidden";
    } else {
      document.body.style.removeProperty("overflow-y");
    }
  }, [showSearch]);
  // Scroll event listener
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("scroll", controlNavbar);
    }

    return () => {
      window.removeEventListener("scroll", controlNavbar);
    };
  }, [controlNavbar, lastScrollY]);

  return (
    <header
      className={`z-50 animate sticky top-0  ${show ? "animateUp" : ""}`}
      ref={headerRef}
    >
<<<<<<< HEAD
      <nav className={`flex bg-[#0D6EFD] ${style.cShadow}`}>
        <div className="container relative flex items-center justify-between ">
          <div className="flex items-center justify-center h-full">
            <Link href="/">
              <div className="items-center justify-between hidden text-4xl font-black cursor-pointer lg:flex text-primary-100 lg:ml-1">
                <span className="text-primary-100">Soft</span>
                <span className="text-white">Office.bg</span>
              </div>
            </Link>
            <Hamburger headRef={headerRef} />

            <li
              className="flex items-center justify-center px-2 transition-colors cursor-pointer lg:hidden group hover:bg-white h-14 "
              onClick={() => setShowSearch(!showSearch)}
            >
              <button
                type="button"
                className="w-full h-full text-white group-hover:text-primary-100"
              >
=======
      <nav className={`flex bg-color ${style.cShadow}`}>
        <div className="container relative flex items-center justify-between ">
          <div className="flex items-center justify-center logo">
            <Hamburger headRef={headerRef} />
            <Link href="/">
              <div className="items-center justify-between hidden text-3xl font-bold cursor-pointer lg:flex text-primary-lighter lg:ml-1">
                <span className="">Soft</span>
                <span>Office.bg</span>
              </div>
            </Link>
            <li
              className="flex items-center justify-center px-2 cursor-pointer lg:hidden hover:text-white hover:bg-gray h-14"
              onClick={() => setShowSearch(!showSearch)}
            >
              <button type="button" className="w-full h-full">
>>>>>>> d26f7cda55573513073816b1ede2bc730122a61e
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <path d="M16.32 14.9l5.39 5.4a1 1 0 0 1-1.42 1.4l-5.38-5.38a8 8 0 1 1 1.41-1.41zM10 16a6 6 0 1 0 0-12 6 6 0 0 0 0 12z" />
                </svg>
              </button>
            </li>
          </div>
          <div className="lg:hidden">
            <Link href="/">
<<<<<<< HEAD
              <div className="flex items-center justify-between text-sm font-bold cursor-pointer lg:block text-primary-100 lg:ml-1">
                <span className="text-primary-100">Soft</span>
                <span className="text-white">Office.bg</span>
=======
              <div className="flex items-center justify-between text-sm font-bold cursor-pointer lg:block text-primary-lighter lg:ml-1">
                <span className="">Soft</span>
                <span>Office.bg</span>
>>>>>>> d26f7cda55573513073816b1ede2bc730122a61e
              </div>
            </Link>
          </div>

          <ul className={`${style.list} flex items-center justify-center `}>
            {/* Search icon */}
            <li
<<<<<<< HEAD
              className="items-center justify-center hidden px-4 text-2xl transition-colors lg:flex h-14 lg:h-20 hover:bg-white group"
              onClick={() => setShowSearch(!showSearch)}
            >
              <div className="font-bold text-white group-hover:text-primary-100">
                <AiOutlineSearch className="icon" />
              </div>
              <div className="pl-1 font-sans text-sm font-medium text-white group-hover:text-primary-100">
=======
              className="items-center justify-center hidden px-4 lg:flex h-14 lg:h-20 hover:bg-gray "
              onClick={() => setShowSearch(!showSearch)}
            >
              <div className="text-xl">
                <AiOutlineSearch className="icon" />
              </div>
              <div className="pl-1 font-sans text-sm font-extralight">
>>>>>>> d26f7cda55573513073816b1ede2bc730122a61e
                Търси
              </div>
            </li>
            {/* Favourite items */}
            <Link href="/account#my-favourites">
<<<<<<< HEAD
              <li className="flex-col items-center justify-center hidden px-4 transition-colors lg:flex h-14 lg:h-20 group hover:bg-white">
                <div className="text-3xl text-white group-hover:text-primary-100">
=======
              <li className="flex-col items-center justify-center hidden px-4 lg:flex h-14 lg:h-20 hover:text-white hover:bg-gray">
                <div className="text-3xl">
>>>>>>> d26f7cda55573513073816b1ede2bc730122a61e
                  <AiOutlineHeart className="icon" />
                </div>
              </li>
            </Link>
            {/* Account */}
            <Link href="/account">
<<<<<<< HEAD
              <li className="flex flex-col items-center justify-center px-4 transition-colors h-14 lg:h-20 group hover:bg-white ">
                <div className="text-2xl text-white md:text-3xl group-hover:text-primary-100">
=======
              <li className="flex flex-col items-center justify-center px-4 h-14 lg:h-20 hover:text-white hover:bg-gray">
                <div className="text-2xl md:text-3xl">
>>>>>>> d26f7cda55573513073816b1ede2bc730122a61e
                  <AiOutlineUser className="icon" />
                </div>
              </li>
            </Link>
            {/* Cart */}
            <Link href="/cart">
<<<<<<< HEAD
              <li className="relative flex flex-col items-center justify-center px-4 transition-colors h-14 lg:h-20 group hover:bg-white">
                <div className="relative text-2xl text-white md:text-3xl group-hover:text-primary-100">
                  <BsCart3 className="icon" />
                  <div className="absolute md:px-2 md:py-1 px-[0.50rem] md:text-sm h-7 flex items-center justify-center text-[0.65rem] font-bold text-white border-2 border-white rounded-full -right-3 -top-3 bg-primary-100">
=======
              <li className="relative flex flex-col items-center justify-center px-4 h-14 lg:h-20 hover:text-white hover:bg-gray">
                <div className="relative text-2xl md:text-3xl">
                  <BsCart3 className="icon" />
                  <div className="absolute md:px-2 md:py-1 px-[0.50rem] md:text-sm h-7 flex items-center justify-center text-[0.65rem] font-bold text-white border-2 border-white rounded-full -right-3 -top-3 bg-primary">
>>>>>>> d26f7cda55573513073816b1ede2bc730122a61e
                    {cartNum}
                  </div>
                </div>
              </li>
            </Link>
          </ul>
        </div>
      </nav>
      {/* Search menu */}
      <div
        className={`relative w-full -translate-y-5   animateSearch -z-10 ${
          showSearch ? "showSearch" : ""
        }`}
        ref={searchMenu}
      >
        <div className="container flex justify-center py-16 bg-white shadow-lg ">
          <div className="relative w-11/12 ">
            <input
              type="text"
              placeholder="Търсене ..."
              className="w-full py-2 pl-3 border-2 rounded-full border-primary focus:outline-none placeholder:text-gray-250"
              value={searchInput}
              onChange={searchHandler}
            />
            <div className="absolute text-2xl font-semibold -translate-y-1/2 cursor-pointer text-primary right-3 top-1/2 ">
              <AiOutlineSearch />
            </div>
          </div>
        </div>
        {searchTabInputs?.katNomera?.length > 0 ||
<<<<<<< HEAD
        searchTabInputs?.subSections?.length > 0 ||
=======
        searchTabInputs?.articleNames?.length > 0 ||
>>>>>>> d26f7cda55573513073816b1ede2bc730122a61e
        searchTabInputs?.sections?.length > 0 ? (
          <div className="">
            <div className="container overflow-auto shadow-lg h-96">
              {searchTabInputs.katNomera?.length > 0 && (
                <div className="w-full py-1 bg-white ">
<<<<<<< HEAD
                  <h3 className="py-2 mb-2 text-lg text-center text-white bg-primary-100">
=======
                  <h3 className="py-2 mb-2 text-lg text-center text-white bg-primary-lighter">
>>>>>>> d26f7cda55573513073816b1ede2bc730122a61e
                    КатНомера
                  </h3>
                  <ul>
                    {searchTabInputs.katNomera.map((item) => {
                      return (
                        <Link key={item._id} href={`/products/${item.route}`}>
                          <li className="px-2 py-1 transition-transform border-b cursor-pointer hover:-translate-y-1 hover:bg-primary hover:text-white border-primary">
                            <span className="text-lg text-green">
                              {item.katNomer} -
                            </span>
<<<<<<< HEAD
                            <span>{item.name}</span>
                            <ul className="flex flex-wrap text-sm">
                              {item.types
                                .split(";")
=======
                            <span>
                              {item.commonName} {item.articleName}
                            </span>
                            <ul className="flex flex-wrap text-sm">
                              {item.types[0]
                                .split("\n")
>>>>>>> d26f7cda55573513073816b1ede2bc730122a61e
                                .slice(0, 5)
                                .map((type, index) => {
                                  return (
                                    <li
                                      key={`${type}=${index}`}
                                      className="py-1 pr-1"
                                    >
                                      {type}
                                    </li>
                                  );
                                })}
                            </ul>
                          </li>
                        </Link>
                      );
                    })}
                  </ul>
                </div>
              )}
<<<<<<< HEAD
              {searchTabInputs.subSections?.length > 0 && (
                <div className="w-full bg-white ">
                  <h3 className="py-2 mb-2 text-lg text-center text-white bg-primary-100">
                    Артикули
                  </h3>
                  <ul>
                    {searchTabInputs.subSections?.map((item) => {
=======
              {searchTabInputs.articleNames?.length > 0 && (
                <div className="w-full bg-white ">
                  <h3 className="py-2 mb-2 text-lg text-center text-white bg-primary-lighter">
                    Артикули
                  </h3>
                  <ul>
                    {searchTabInputs.articleNames?.map((item) => {
>>>>>>> d26f7cda55573513073816b1ede2bc730122a61e
                      return (
                        <Link key={item._id} href={`/products/${item.route}`}>
                          <li className="px-2 py-1 transition-transform border-b cursor-pointer hover:-translate-y-1 hover:bg-primary hover:text-white border-primary">
                            <span className="text-lg text-green">
<<<<<<< HEAD
                              {item.name}
=======
                              {item.commonName} {item.articleName}
>>>>>>> d26f7cda55573513073816b1ede2bc730122a61e
                            </span>
                            <ul className="flex flex-wrap text-sm">
                              {item.types[0]
                                .split("\n")
                                .slice(0, 5)
                                .map((type, index) => {
                                  return (
                                    <li
                                      key={`${type}-${index}`}
                                      className="py-1 pr-1"
                                    >
                                      {type}
                                    </li>
                                  );
                                })}
                            </ul>
                          </li>
                        </Link>
                      );
                    })}
                  </ul>
                </div>
              )}
              {searchTabInputs.sections?.length > 0 && (
                <div className="w-full bg-white">
<<<<<<< HEAD
                  <h3 className="py-2 mb-2 text-lg text-center text-white bg-primary-100">
=======
                  <h3 className="py-2 mb-2 text-lg text-center text-white bg-primary-lighter">
>>>>>>> d26f7cda55573513073816b1ede2bc730122a61e
                    Секции
                  </h3>
                  <ul>
                    {searchTabInputs.sections.map((item) => {
                      return (
<<<<<<< HEAD
                        <Link key={item._id} href={`/products/${item.name}`}>
                          <li className="px-2 py-1 transition-transform cursor-pointer hover:-translate-y-1 hover:bg-primary hover:text-white">
                            {item.nameToDisplay}
=======
                        <Link key={item._id} href={`/products/${item.route}`}>
                          <li className="px-2 py-1 transition-transform cursor-pointer hover:-translate-y-1 hover:bg-primary hover:text-white">
                            {item.sectionName}
>>>>>>> d26f7cda55573513073816b1ede2bc730122a61e
                          </li>
                        </Link>
                      );
                    })}
                  </ul>
                </div>
              )}
            </div>
          </div>
        ) : (
          !isObjectEmpty(searchTabInputs) && (
            <div className="container py-10 text-center bg-white text-secondary">
              <span>Няма намерен резултати</span>
            </div>
          )
        )}
      </div>
      {/* End search menu */}
    </header>
  );
};
export default connect((state) => ({
  cartTotalQty: state.allProducts.cart.reduce((a, b) => a + b.qty, 0),
}))(Navbar);
