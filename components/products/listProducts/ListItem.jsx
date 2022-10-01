import React, { useState, useEffect } from "react";

// NextJs
import Image from "next/image";
import Link from "next/link";

// Components
import BuyBtn from "../../base/BuyBtn";
import OldPrice from "../../priceStyling/OldPrice";
import Pricing from "../../priceStyling/Pricing";

export default function ListItem({ section, articleData, item, addProduct }) {
  let imgUrl = articleData?.imgUrl;
  if (item.imageUrl) imgUrl = item.imageUrl;

  const name = `${section.name != "Обадете се" ? section.name : ""} ${
    articleData.name
  }`;
  const types = item.tipove.split(";");
  const [price, setPrice] = useState(null);
  const [sanitizedData, setSanitizedData] = useState({});
  useEffect(() => {
    let priceObjInit = { forItem: item.cena };

    if (item.isOnPromotions) {
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
      setSanitizedData(test);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [price, setPrice]);

  return (
    <div className="flex flex-col items-center justify-center w-full break-words bg-white border shadow-2xl sm:w-96 border-primary rounded-3xl">
      <section className="container">
        {articleData?.imgUrl && (
          <Link href={`/products/${section.route}`}>
            <div className="relative w-full cursor-pointer h-96 sm:h-80">
              <Image
                src={`/uploads/${imgUrl}`}
                layout="fill"
                alt={articleData?.imgUrl}
              />
            </div>
          </Link>
        )}
        <h2 className="w-full py-5 text-xl font-semibold text-center border-y border-gray">
          {name}
        </h2>
        <div className="w-full py-2 border-gray ">
          <ul>
            {types.map((type) => {
              return <li key={type}>{type}</li>;
            })}
          </ul>
        </div>
        <div className="flex items-center justify-center py-2">
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
                  priceDec={parseFloat(price.forItem).toFixed(2).split(".")[1]}
                  size="3xl"
                  NoDDSText={true}
                />
              </div>
              <Pricing
                price={parseFloat(price.promoPrice).toFixed(2).split(".")[0]}
                priceDec={parseFloat(price.promoPrice).toFixed(2).split(".")[1]}
                size="3xl"
              />
            </div>
          )}
        </div>
      </section>

      <div className="w-full bg-gray-300 rounded-3xl mt-auto">
        {section.name == "Обадете се" && (
          <div className="text-xl font-bold bg-gray w-full py-4 flex justify-center items-center flex-col">
            <div className="font-normal text-[0.95rem]">
              Обадете се за цена!
            </div>

            <div>088 888 4687</div>
          </div>
        )}
        <section className="container py-5">
          <div className="mb-3">
            <BuyBtn onClick={() => addProduct(sanitizedData)} />
          </div>
          <Link href={`/products/${section.route}/${articleData.route}`}>
            <button className="w-full py-1 font-semibold border rounded-full border-primary text-primary">
              Виж повече
            </button>
          </Link>
        </section>
      </div>
    </div>
  );
}
