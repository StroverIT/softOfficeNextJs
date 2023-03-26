import React, { useState, useEffect } from "react";

// NextJs
import Image from "next/image";
import Link from "next/link";

// Components
import BuyBtn from "../../base/BuyBtn";
import OldPrice from "../../priceStyling/OldPrice";
import Pricing from "../../priceStyling/Pricing";
import PriceWithQuantity from "../PriceWithQuantity";

export default function ListItem({
  section,
  articleData,
  item,
  addProduct,
  imgUrl,
  route,
}) {
  const name = `${section.name != "Обадете се" ? section.name : ""}`;
  const types = item?.tipove?.split(";");
  const [price, setPrice] = useState(null);
  const [sanitizedData, setSanitizedData] = useState({});
  const [customQtySelected, customQtySetSelected] = useState({
    name: "Количество",
  });
  useEffect(() => {
    let priceObjInit = { forItem: item.cena };
    if (item.isOnPromotions || item.promotionalPrice > 0) {
      priceObjInit.promoPrice = item.promotionalPrice;
    }

    setPrice(priceObjInit);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    if (price) {
      const test = {
        item: {
          tipove: item.tipove,
          katNomer: item.katNomer,

          route: item._id,
          types: item.tipove,
          cena: price.forItem,
          isOnPromotions: item.isOnPromotions,
          promotionalPrice: price.promoPrice,
          isOnlyNumb: item.isOnlyNumb,
        },
        article: {
          ...articleData,
          imgUrl,
        },
        section: {
          ...section,
        },
      };
      if (articleData.isCustomQty) {
        test.item.tipove += `;${customQtySelected.name}`;
        test.item.cena = customQtySelected.price;
      }
      setSanitizedData(test);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [price, setPrice, customQtySelected]);

  return (
    <div
      className="flex flex-col items-center justify-center w-full break-words transition-shadow bg-white border hover:shadow-2xl border-primary rounded-3xl"
      id={item._id}
    >
      {/* {console.log(route)} */}
      <Link href={route}>
        <section className="container cursor-pointer">
          {articleData?.imgUrl && (
            <div className="relative w-full h-56 my-10 cursor-pointer">
              <Image
                src={imgUrl.includes("https") ? imgUrl : `/uploads/${imgUrl}`}
                layout="fill"
                alt={articleData?.imgUrl}
                className="object-contain"
              />
            </div>
          )}
          {/* ---- Name --- */}

          {/* --- Pricing ----*/}
          <div className="flex items-center justify-center py-2 border-y border-gray">
            {price?.forItem &&
              !price.promoPrice &&
              section.name != "Обадете се" && (
                <Pricing
                  price={parseFloat(price.forItem).toFixed(2).split(".")[0]}
                  priceDec={parseFloat(price.forItem).toFixed(2).split(".")[1]}
                  size="3xl"
                />
              )}
            {price?.promoPrice && section.name != "Обадете се" && (
              <div className="flex gap-x-5">
                <div className="text-gray-200">
                  <OldPrice
                    price={parseFloat(price.forItem).toFixed(2).split(".")[0]}
                    priceDec={
                      parseFloat(price.forItem).toFixed(2).split(".")[1]
                    }
                    size="3xl"
                    NoDDSText={true}
                  />
                </div>
                <Pricing
                  price={parseFloat(price.promoPrice).toFixed(2).split(".")[0]}
                  priceDec={
                    parseFloat(price.promoPrice).toFixed(2).split(".")[1]
                  }
                  size="3xl"
                />
              </div>
            )}
          </div>
          <h2 className="w-full py-4 text-xl font-semibold text-center ">
            {name}
          </h2>
          {/* ---- Types --- */}
          <div className="w-full pb-5 pt-5 border-t border-gray ">
            <ul className="grid grid-cols-2 gap-x-10 ">
              {types &&
                types
                  .filter((e) => e.length < 25)
                  .splice(0, 5)
                  .map((type) => {
                    return (
                      <li key={type} className="text-sm">
                        {type}
                      </li>
                    );
                  })}
            </ul>
          </div>
        </section>
      </Link>

      <div className="w-full mt-auto bg-gray-300 rounded-b-3xl">
        {section.name == "Обадете се" && (
          <div className="flex flex-col items-center justify-center w-full py-4 text-xl font-bold bg-gray">
            <div className="font-normal text-[0.95rem]">
              Обадете се за цена!
            </div>

            <div>088 888 4687</div>
          </div>
        )}
        <section className="container py-5">
          {articleData.isCustomQty && (
            <div className="mb-2">
              <PriceWithQuantity
                selected={customQtySelected}
                setSelected={customQtySetSelected}
                data={item.quantityWithPrices}
              />
            </div>
          )}
          {(customQtySelected.name != "Количество" ||
            !articleData.isCustomQty) && (
            <div className="">
              <BuyBtn onClick={() => addProduct(sanitizedData)} />
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
