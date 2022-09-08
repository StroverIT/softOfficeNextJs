import React, { useEffect, useState } from "react";

//NextJs
import Image from "next/image";
// Swiper
import { SwiperSlide } from "swiper/react";
// Components
import Pricing from "../priceStyling/Pricing";
import OldPrice from "../priceStyling/OldPrice";

const SwiperProductSelectSwiperSlide = ({ article, item }) => {
  const [price, setPrice] = useState(null);
  useEffect(() => {
    let priceObjInit = { forItem: item.cena };
    if (item.isOnPromotions) {
      priceObjInit.promoPrice = item.promotionalPrice;
    }

    setPrice(priceObjInit);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="flex flex-col justify-between w-full h-full">
      <div>
        <div className="relative w-full h-96">
          <Image
            src={`/uploads/${article.img}`}
            layout="fill"
            alt={article.img}
            className="object-contain"
          />
        </div>

        <ul className="flex flex-col justify-center py-2 border-y border-gray">
          {item.tipove
            .split(";")
            .splice(0, 5)
            .map((type) => {
              return (
                <li key={type} className="mx-auto text-sm font-normal ">
                  {type}
                </li>
              );
            })}
        </ul>
      </div>
      {/* This can be potential bug!!!! */}
      <div className="py-2 -mt-10">
        {!item.isOnPromotions && (
          <Pricing
            price={parseFloat(price?.forItem)?.toFixed(2).split(".")[0]}
            priceDec={parseFloat(price?.forItem)?.toFixed(2).split(".")[1]}
            size="2xl"
          />
        )}
        {item.isOnPromotions && (
          <div className="flex items-center justify-center gap-x-5">
            <div className="text-gray-200">
              <OldPrice
                price={parseFloat(price?.forItem)?.toFixed(2).split(".")[0]}
                priceDec={parseFloat(price?.forItem)?.toFixed(2).split(".")[1]}
                size="2xl"
              />
            </div>
            <div className="">
              <Pricing
                price={parseFloat(price?.promoPrice)?.toFixed(2).split(".")[0]}
                priceDec={
                  parseFloat(price?.promoPrice)?.toFixed(2).split(".")[1]
                }
                size="2xl"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SwiperProductSelectSwiperSlide;