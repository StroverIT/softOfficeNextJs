import React, { useEffect, useState } from "react";

//NextJs
import Image from "next/image";
// Swiper
import { SwiperSlide } from "swiper/react";
// Components
import Pricing from "../priceStyling/Pricing";
import OldPrice from "../priceStyling/OldPrice";

const SwiperProductSelectSwiperSlide = ({ article, item, sectionName }) => {
  const [price, setPrice] = useState(null);
  let imageUrl = article?.img;

  if (item.imageUrl) imageUrl = item.imageUrl;

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
            src={`/uploads/${imageUrl}`}
            layout="fill"
            alt={imageUrl}
            className="object-contain"
          />
        </div>

        <ul
          className={`flex flex-col justify-center px-10 py-4 text-center ${
            !article.isCustomQty ? "border-y" : "border-t"
          } border-gray`}
        >
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
        {!item.isOnPromotions &&
          !article.isCustomQty &&
          sectionName != "Обадете се" && (
            <Pricing
              price={parseFloat(price?.forItem)?.toFixed(2).split(".")[0]}
              priceDec={parseFloat(price?.forItem)?.toFixed(2).split(".")[1]}
              size="2xl"
            />
          )}
        {item.isOnPromotions && sectionName != "Обадете се" && (
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
        {sectionName == "Обадете се" && (
          <div className="flex flex-col items-center justify-center w-full py-4 text-xl font-bold bg-gray">
            <div className="font-normal text-[0.95rem]">
              Обадете се за цена!
            </div>

            <div>088 888 4687</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SwiperProductSelectSwiperSlide;
