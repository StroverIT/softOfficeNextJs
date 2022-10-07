import React from "react";

// Components
import ImageAndListTableData from "./ImageAndListTableData";
import LgScreenTableData from "./LgScreenTableData";
import MobileScreenTableData from "./MobileScreenTableData";
<<<<<<< HEAD

export default function CartItem({ cartData, removeProduct, changeQty }) {
  let route;
  if (cartData.item.item.itemsLen == 1) {
    route = `/products/${cartData.item.section.route}/${cartData.item.article.route}`;
  } else {
    route = `/products/${cartData.item.section.route}/${cartData.item.article.route}#${cartData.item.item.route}`;
  }
  const name = `${cartData?.item?.section?.name} ${cartData?.item?.article?.name} `;

  let cena = cartData?.item?.item?.cena;

  const price = { fixedPrice: cena };

  if (cartData.item.item.isOnPromotions) {
    price.promotionalPrice = cartData?.item?.item?.promotionalPrice;
  }

=======
// Translator
import { translationToRoute } from "../../utils/translationToRoute";

export default function CartItem({ cartData, removeProduct, changeQty }) {
  const route = `/products/${translationToRoute(cartData.item.sectionName)}/${
    cartData.item._id
  }`;
>>>>>>> d26f7cda55573513073816b1ede2bc730122a61e
  return (
    <tr className="border-b border-gray-[#e4e7e6] flex flex-wrap lg:table-row justify-between items-center py-10 mb-10 gap-10 ">
      {/* Image plus list */}
      <ImageAndListTableData
<<<<<<< HEAD
        cartName={name}
        route={route}
        imageUrl={cartData?.item?.article?.imgUrl}
        moreInfo={{
          tipove: cartData?.item?.item?.tipove,
          katNomer: cartData?.item?.item?.katNomer,
        }}
      />
      {/* MObile version */}
      <MobileScreenTableData
        price={price}
=======
        listData={cartData?.item.types[0].split("\n")}
        cartName={cartData?.item.articleName}
        route={route}
      />
      {/* MObile version */}
      <MobileScreenTableData
        price={cartData?.item.price}
>>>>>>> d26f7cda55573513073816b1ede2bc730122a61e
        qty={cartData?.qty}
        removeProduct={removeProduct}
        changeQty={changeQty}
      />
      {/* Large screen version */}
      <LgScreenTableData
<<<<<<< HEAD
        price={price}
=======
        price={cartData?.item.price}
>>>>>>> d26f7cda55573513073816b1ede2bc730122a61e
        qty={cartData?.qty}
        removeProduct={removeProduct}
        changeQty={changeQty}
      />
    </tr>
  );
}
