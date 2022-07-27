import React from "react";
import { useRouter } from "next/router";
import { SwiperSlide } from "swiper/react";

import Image from "next/image";
import Link from "next/link";
import { translationToRoute } from "../../utils/translationToRoute";

// Components
import PricingPromo from "../priceStyling/PricingPromo";

export default function Card({ data, sectionImage, sectionName }) {
  const price = data.item.price.toFixed(2).split(".");

  const router = useRouter();

  return (
    <section className="flex flex-col bg-white shadow-lg cursor-pointer hover:shadow-xl hover:-translate-y-2 transition-transform">
      <div
        onClick={() =>
          router.push(
            `/products/${translationToRoute(sectionName)}/${data.item._id}`
          )
        }
        className="flex flex-col justify-between h-full"
      >
        <div>
          <div className="relative h-72 w-80">
            <Image
              src={`/uploads/${sectionImage}`}
              layout="fill"
              alt={sectionName}
            />
          </div>
          <div className="container pt-4 font-medium text-center border-t border-gray py-10">
            {sectionName} {data.articleName} {data.item.weight}
          </div>
        </div>
        <PricingPromo isPromo={false} price={price[0]} priceDec={price[1]} />
      </div>
    </section>
  );
}
