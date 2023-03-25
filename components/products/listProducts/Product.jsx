import React, { useEffect, useState } from "react";

// NextJs
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
//Components
import Pricing from "../../priceStyling/Pricing";
import BuyBtn from "../../base/BuyBtn";
import ListItem from "./ListItem";
import { HiX } from "react-icons/hi";

export default function Product({ section, article, addProduct }) {
  const router = useRouter();
  const routerHash = router?.asPath?.split("#");

  let imgUrl;
  if (article.img) {
    imgUrl = article?.img?.originalname || article?.img[0]?.originalname;
  }
  const articleData = {
    name: article.nameToDisplay,
    route: article._id,
    imgUrl,
  };
  if (article.isCustomQty) {
    articleData.isCustomQty = article.isCustomQty;
  }

  return (
    <>
      {article.items.map((item) => {
        const route = `${section.route}?itemId=${item._id}`;
        return (
          <ListItem
            key={item._id}
            item={item}
            articleData={articleData}
            route={route}
            section={section}
            imgUrl={imgUrl}
            addProduct={addProduct}
          />
        );
      })}
    </>
  );
}

{
  /* <section className="flex items-center mb-5 border border-gray ">
<div className="flex flex-col justify-between w-full h-full">
  <div className="flex flex-col items-center px-3 py-3">
    {imgUrl && (
      <Link href={`/products/${section.route}/${article._id}`}>
        <div className="relative w-full cursor-pointer h-96 sm:h-80">
          <Image
            src={`/uploads/${imgUrl}`}
            layout="fill"
            alt={imgUrl}
            className="object-contain"
          />
        </div>
      </Link>
    )}
    <div className="w-full py-4 text-center border-t border-gray">
      <Link href={`/products/${section.route}/${article._id}`}>
        <h2 className="text-xl font-semibold cursor-pointer">{name}</h2>
      </Link>
    </div>
    {article.items.length == 1 && (
      <div>
        <Pricing
          price={parseFloat(itemData.price).toFixed(2).split(".")[0]}
          priceDec={parseFloat(itemData.price).toFixed(2).split(".")[1]}
          padding=""
          size="2xl"
        />
      </div>
    )}
  </div>
  <div className="bg-gray-300">
    <div className="container flex flex-col justify-center py-5">
      {/* Create grayer color for future*/
}
//       <div className="mb-3">
//         <BuyBtn
//           onClick={() =>
//             addProduct({
//               item: {
//                 itemsLen,
//                 tipove: article.items[0].tipove,
//                 katNomer: article.items[0].katNomer,
//                 route: article.items[0]._id,
//                 types: article.items[0].tipove,
//                 cena: article.items[0].cena,
//                 promotionalPrice: article.items[0].promotionalPrice,
//                 isOnPromotions: article.items[0].isOnPromotions,
//                 isOnlyNumb: article.items[0].isOnlyNumb,
//               },
//               article: {
//                 ...articleData,
//               },
//               section: {
//                 name: section.name,
//                 route: section.route,
//               },
//             })
//           }
//         />
//       </div>
//       <Link href={`/products/${section.route}/${article._id}`}>
//         <button className="py-1 font-semibold border rounded-full border-primary text-primary">
//           Виж повече
//         </button>
//       </Link>
//     </div>
//   </div>
// </div>
// </section>
