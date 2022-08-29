import React, { useEffect, useState } from "react";

// NextJs
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
//Components
import Pricing from "../../priceStyling/Pricing";
import BuyBtn from "../../base/BuyBtn";
import ListItem from "./ListItem";
import { HiX } from "react-icons/hi";

export default function Product({ section, article, addProduct }) {
  const router = useRouter();
  const routerHash = router?.asPath?.split("#");

  const [openItemsMenu, setOpenItemsMenu] = useState(false);
  const name = `${section.name} ${article.nameToDisplay} `;
  const imgUrl = article?.img[0]?.originalname;
  const articleData = {
    name: article.nameToDisplay,
    route: article._id,
    imgUrl,
  };

  const openMenu = (e) => {
    const _id = e.target.getAttribute("data");
    router.push(`#${_id}`, undefined, { shallow: true });
    setOpenItemsMenu(true);
  };
  const closeMenu = () => {
    setOpenItemsMenu(false);
  };
  useEffect(() => {
    if (article._id == routerHash[1]) setOpenItemsMenu(true);
  }, [article._id]);
  useEffect(() => {
    if (openItemsMenu) {
      document.body.style.overflowY = "hidden";
    } else {
      document.body.style.removeProperty("overflow-y");
    }
  }, [openItemsMenu]);
  return (
    <section className="flex items-center mb-5 border border-gray ">
      <div className="flex flex-col justify-between w-full h-full">
        <div className="flex flex-col items-center px-3 py-3">
          {imgUrl && (
            <Link href={`/products/${section.route}/${article._id}`}>
              <div className="relative w-full cursor-pointer h-96 sm:h-80">
                <Image src={`/uploads/${imgUrl}`} layout="fill" alt={imgUrl} />
              </div>
            </Link>
          )}
          <div className="w-full py-4 text-center border-t border-gray">
            <Link href={`/products/${section.route}/${article._id}`}>
              <h2 className="text-xl font-semibold cursor-pointer">{name}</h2>
            </Link>
          </div>
        </div>
        <div className="bg-gray-300">
          <div className="container flex flex-col justify-center py-5">
            {/* Create grayer color for future*/}
            <div className="mb-3">
              {article.items.length > 1 ? (
                <BuyBtn
                  text="Избери типа"
                  onClick={openMenu}
                  metaData={article._id}
                />
              ) : (
                <BuyBtn />
              )}
            </div>
            <Link href={`/products/${section.route}/${article._id}`}>
              <button className="py-1 font-semibold border rounded-full border-primary text-primary">
                Виж повече
              </button>
            </Link>
          </div>
        </div>
      </div>
      {openItemsMenu && article._id == routerHash[1] && (
        <>
          <section className="fixed top-0 left-0 z-50 w-screen h-screen overflow-x-auto">
            <section className="container relative h-full">
              <div
                className="fixed z-20 p-1 text-3xl border rounded-full cursor-pointer right-4 bg-dark-100 text-secondary border-secondary top-10"
                onClick={closeMenu}
              >
                <HiX />
              </div>
              <div className="flex flex-wrap items-center justify-center w-full h-full py-10 md:py-auto">
                <section className="relative z-20 flex flex-wrap justify-center gap-5">
                  {article.items.map((item) => {
                    return (
                      <ListItem
                        key={item._id}
                        item={item}
                        articleData={articleData}
                        section={section}
                      />
                    );
                  })}
                </section>
                <div className="fixed z-10 blury-bg" onClick={closeMenu}></div>
              </div>
            </section>
          </section>
        </>
      )}
    </section>
  );
}
