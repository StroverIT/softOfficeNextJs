import React from "react";
// Next
import Image from "next/image";

export default function Promotions({ promotions }) {
  return (
    <div className="flex flex-wrap items-center justify-center my-10 gap-x-5 gap-y-5">
      {promotions.length >= 1 &&
        promotions.map((promo) => {
          const product = promo.product;
          const name = `${product.section.nameToDisplay} ${product.subsection.nameToDisplay}`;
          return (
            <section
              key={promo._id}
              className="p-10 border rounded-3xl border-primary"
            >
              <div className="relative w-28 h-28">
                <Image
                  layout="fill"
                  src={`/uploads/${product.subsection.imgUrl}`}
                  alt={product.subsection.imgUrl}
                />
              </div>
              <div className="text-lg font-semibold">{name}</div>
              <div>
                <ul className="text-sm">
                  {product.item.tipove.split(";").map((type) => {
                    return <li key={type}>{type}</li>;
                  })}
                </ul>
              </div>
              <div className="mt-1">
                <div>
                  Стара цена:
                  <span className="pl-1">{product.item.cena}</span>
                </div>
                <div>
                  Промо цена:
                  <span className="pl-1">{product.item.promotionalPrice}</span>
                </div>
              </div>
            </section>
          );
        })}
      {promotions.length <= 0 && <div>Няма добавени промоции</div>}
    </div>
  );
}
