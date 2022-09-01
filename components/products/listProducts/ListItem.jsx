import Image from "next/image";
import Link from "next/link";
import React from "react";
import BuyBtn from "../../base/BuyBtn";

import Pricing from "../../priceStyling/Pricing";

export default function ListItem({ section, articleData, item, addProduct }) {
  const name = `${section.name} ${articleData.name}`;
  const types = item.tipove.split(";");
  const price = item.cena.toFixed(2).split(".");

  const sanitezedData = {
    item: {
      tipove: item.tipove,
      katNomer: item.katNomer,

      route: item._id,
      types: item.tipove,
      cena: item.cena,
      isOnPromotion: item.isOnPromotions,
      isOnlyNumb: item.isOnlyNumb,
    },
    article: {
      ...articleData,
    },
    section: {
      ...section,
    },
  };
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
        <div className="py-2">
          <Pricing price={price[0]} priceDec={price[1]} size="2xl" />
        </div>
      </section>
      <div className="w-full bg-gray-300 rounded-3xl">
        <section className="container py-5">
          <div className="mb-3">
            <BuyBtn onClick={() => addProduct(sanitezedData)} />
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
