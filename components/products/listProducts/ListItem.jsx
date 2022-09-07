import React, { useState, useEffect } from "react";

// NextJs
import Image from "next/image";
import Link from "next/link";

// Components
import BuyBtn from "../../base/BuyBtn";
import OldPrice from "../../priceStyling/OldPrice";
import Pricing from "../../priceStyling/Pricing";

export default function ListItem({
  section,
  articleData,
  item,
  addProduct,
  personalPromotions,
}) {
  const name = `${section.name} ${articleData.name}`;
  const types = item.tipove.split(";");
  const [price, setPrice] = useState(null);
  const [sanitizedData, setSanitizedData] = useState({});
  useEffect(() => {
    let priceObjInit = { forItem: item.cena };

    if (item.isOnPromotions) {
      priceObjInit.promoPrice = item.promotionalPrice;
    }

    if (personalPromotions?.found) {
      const promoPerc =
        personalPromotions?.found.customPromo ||
        personalPromotions.generalPromo;

      const realPrice = priceObjInit.forItem;

      const personalPromoToPrice = (100 - promoPerc) / 100; // This is in percentage

      const personalPromo = realPrice * personalPromoToPrice;

      if (item.isOnPromotions) {
        const promotionalPrice = item.promotionalPrice;
        const whichIsBetter =
          personalPromo < promotionalPrice ? personalPromo : promotionalPrice;

        priceObjInit.promoPrice = whichIsBetter;
      } else {
        priceObjInit.promoPrice = personalPromo;
      }
    }
    setPrice(priceObjInit);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    if (price) {
      console.log(price);
      const test = {
        item: {
          tipove: item.tipove,
          katNomer: item.katNomer,

          route: item._id,
          types: item.tipove,
          cena: price.forItem,
          isOnPromotion: price.promoPrice,
          isOnlyNumb: item.isOnlyNumb,
        },
        article: {
          ...articleData,
        },
        section: {
          ...section,
        },
      };
      setSanitizedData(test);
    }
  }, [price, setPrice]);

  return (
    <div className="flex flex-col items-center justify-center w-full break-words bg-white border shadow-2xl sm:w-96 border-primary rounded-3xl">
      <section className="container">
        {articleData?.imgUrl && (
          <Link href={`/products/${section.route}`}>
            <div className="relative w-full cursor-pointer h-96 sm:h-80">
              <Image
                src={`/uploads/${articleData?.imgUrl}`}
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
          {price?.forItem && !price.promoPrice && (
            <Pricing
              price={price.forItem.toFixed(2).split(".")[0]}
              priceDec={price.forItem.toFixed(2).split(".")[1]}
              size="3xl"
            />
          )}
          {price?.promoPrice && (
            <div className="flex gap-x-5">
              <div className="text-gray-200">
                <OldPrice
                  price={price.forItem.toFixed(2).split(".")[0]}
                  priceDec={price.forItem.toFixed(2).split(".")[1]}
                  size="3xl"
                  NoDDSText={true}
                />
              </div>
              <Pricing
                price={price.promoPrice.toFixed(2).split(".")[0]}
                priceDec={price.promoPrice.toFixed(2).split(".")[1]}
                size="3xl"
              />
            </div>
          )}
        </div>
      </section>
      <div className="w-full bg-gray-300 rounded-3xl">
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
