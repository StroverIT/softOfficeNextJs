import React from "react";
import { useRouter } from "next/router";
import { SwiperSlide } from "swiper/react";

import Image from "next/image";
import Link from "next/link";
import { translationToRoute } from "../../utils/translationToRoute";

// Components
import PricingPromo from "../priceStyling/PricingPromo";
import { useState } from "react";
import PricingWithName from "../priceStyling/PricingWithName";

export default function Card({ data, imgUrl, sectionName, productName, isCustomQty,url }) {
  // const price = data.item.price.toFixed(2).split(".");

  const router = useRouter();
  const [price, setPrice] = useState({
    forItem: data.cena,

    promoPrice: data.promotionalPrice,
  })
  data.article = {isCustomQty}
  data.section = {nameToDisplay: sectionName}

  return (
    <section className="flex flex-col transition-transform bg-white shadow-lg cursor-pointer hover:shadow-xl hover:-translate-y-2">
      <div
        onClick={() =>
          router.push(
            url
          )
        }
        className="flex flex-col justify-between h-full"
      >
        <div>
        <div className="relative w-full h-96">
              <Image
                src={`/uploads/${imgUrl}`}
                layout="fill"
                alt="Img"
                className="object-contain"
              />
            </div>
            <div>
      <div className="px-10">
        <PricingWithName product={data} price={price} currQty={1}/>
      </div>
              
            </div>
          <div className="py-4 text-xl font-medium text-center ">
            {productName}
          </div>
        </div>
        <section className="flex items-center justify-center w-full xl:px-10">
          <ul className="grid w-full grid-cols-2 py-5 pl-5 mb-1 list-disc border-t justify-content-center gap-x-10 border-gray ">
            {data.tipove
              .split(";")
              .filter((e) => e.length < 30 && e)
              .splice(0, 10)

              .map((type) => {
                return <li key={type}>{type}</li>;
              })}
          </ul>
        </section>
        {/* <PricingPromo isPromo={false} price={price[0]} priceDec={price[1]} /> */}
      </div>
    </section>
  );
}
