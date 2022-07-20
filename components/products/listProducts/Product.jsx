import React from "react";

// NextJs
import Image from "next/image";
import Link from "next/link";
//Components
import Pricing from "../../priceStyling/Pricing";
import BuyBtn from "../../base/BuyBtn";

export default function Product({
  article,
  item,
  commonName,
  sectionName,
  addProduct,
}) {
  const price = item.price.toFixed(2).split(".");
  const itemTypes = item.types.toString().split("\n");
  let imageUrl;
  item.articleName = `${commonName} ${article.articleName}`;
  item.sectionName = sectionName;
  return (
    <section className="flex items-center mb-5 border border-gray">
      <div className="md:grid grid-cols-[80%20%] w-full h-full">
        <div className="items-center h-full py-3 sm:flex">
          {imageUrl && (
            <Link href={`/products/${sectionName}/${item._id}`}>
              <div className="relative flex w-full h-48 cursor-pointer sm:w-52 sm:h-32">
                <Image
                  src={`/images/${imageUrl}`}
                  layout="fill"
                  alt={`${item.articleName}`}
                />
              </div>
            </Link>
          )}
          <div className="pl-4">
            <Link href={`/products/${sectionName}/${item._id}`}>
              <h2 className="text-lg cursor-pointer">
                {commonName} {article.articleName}
              </h2>
            </Link>
            <ul className="pt-2 text-sm text-gray-darker">
              {itemTypes.slice(0, 5).map((type) => {
                return <li key={type}>{type}</li>;
              })}
            </ul>
          </div>
        </div>
        <div className="bg-grayBg">
          <div className="container flex flex-col justify-center h-full itesm-center">
            <div className="flex justify-center">
              <Pricing price={price[0]} priceDec={price[1]} size="2xl" />
            </div>
            {/* Create grayer color for future*/}
            <BuyBtn border={true} onClick={() => addProduct(item)} />
          </div>
        </div>
      </div>
    </section>
  );
}
