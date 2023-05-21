import React from "react";
import Image from "next/image";

import PricingPromo from "../../priceStyling/PricingPromo";


const Promo = ({ promo, router}) => {
    
  const product = promo.product;
  const sum = (product?.item.promotionalPrice / product?.item.cena) * 100;
  const percentageRate = (100 - sum).toFixed(2).split(".");
  let pageUrl = `${product?.section.name}/${product?.subsection._id}?itemId=${product.item._id}`;

  const name = `${product?.section.nameToDisplay} ${product?.subsection.nameToDisplay}`;

  const onClick = !promo.moreThanOne
    ? () => router.push(`/products/${pageUrl}`)
    : () => router.push(`/products/${product?.section.name}?onlyPromo=true`)

  return (
    <>
      <div onClick={onClick} className="flex flex-col justify-between h-full ">
        <div className="">
          <div className="flex flex-col items-center justify-center py-10">
            <div className="relative h-60 w-60 ">
              <Image
                src={`/uploads/${
                  product?.subsection && product?.subsection?.imgUrl
                }`}
                layout="fill"
                alt={product?.subsection.imgUrl}
                className="object-contain"
              />
            </div>
          </div>
          <div
            className={`container py-2 font-medium text-center border-t border-gray `}
          >
            <div className="text-xl">{name}</div>
            {!promo.moreThanOne && (
              <ul className="text-sm font-normal ">
                {product?.item.tipove
                  .split(";")
                  .splice(0, 5)
                  .map((type) => {
                    return <li key={type}>{type}</li>;
                  })}
              </ul>
            )}
            {promo.moreThanOne && (
              <div className="flex items-center justify-center mt-10 text-xl text-primary-100 ">
                <div className="w-1/2">
                  Вижте всички промоционални продукти на тази серия
                </div>
              </div>
            )}
          </div>
        </div>
        {!promo.moreThanOne && (
          <PricingPromo
            price={product.item.cena}
            promoPrice={product.item.promotionalPrice}
          />
        )}
      </div>
      {!promo.moreThanOne && (
        <div className="absolute z-50 p-2 text-sm text-white rounded-full -top-2 -right-2 bg-primary-100">
          -{percentageRate[0]}%
        </div>
      )}
    </>
  );
};

export default Promo;
