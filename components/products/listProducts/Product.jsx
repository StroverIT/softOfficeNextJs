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
  sectionName,
  addProduct,
  imageUrl,
  sectionRoute,
}) {
  const price = item?.price.toFixed(2).split(".");
  item.articleName = `${sectionName} ${article.articleName} - ${item.weight}`;
  item.sectionName = sectionName;
  item.imageUrl = imageUrl;
  return (
    <section className="flex items-center mb-5 border border-gray">
      <div className="md:grid grid-cols-[80%20%] w-full h-full">
        <div className="items-center h-full py-3 sm:flex">
          {imageUrl && (
            <Link href={`/products/${sectionRoute}/${item._id}`}>
              <div className="relative flex w-full h-64 cursor-pointer sm:w-40 sm:h-32">
                <Image
                  src={`/uploads/${imageUrl}`}
                  layout="fill"
                  alt={`${item.articleName}`}
                />
              </div>
            </Link>
          )}
          <div className="pl-4">
            <Link href={`/products/${sectionRoute}/${item._id}`}>
              <h2 className="text-lg cursor-pointer">{item.articleName}</h2>
            </Link>
          </div>
        </div>
        <div className="bg-grayBg">
          <div className="container flex flex-col justify-center h-full itesm-center">
            <div className="">
              <Pricing price={price[0]} priceDec={price[1]} size="2xl" />
            </div>
            {/* Create grayer color for future*/}
            <BuyBtn
              border={true}
              onClick={() => addProduct(item, item.articleName)}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
