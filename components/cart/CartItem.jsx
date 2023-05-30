import React from "react";

// Components
import ImageAndListTableData from "./ImageAndListTableData";
import LgScreenTableData from "./LgScreenTableData";
import MobileScreenTableData from "./MobileScreenTableData";

export default function CartItem({ cartData, removeProduct, changeQty }) {
  let route = `${cartData.item.section.route}?itemId=${cartData.item.item.route}`;
  
  console.log(cartData);
  const name = `${!cartData?.item?.item?.customName ? `${cartData?.item?.section?.name} ${cartData?.item?.article?.name}`: cartData?.item?.item?.customName} `;

  let cena = parseFloat(cartData?.item?.item?.cena);

  const price = { fixedPrice: cena };

  if (cartData.item.item.isOnPromotions) {
    price.promotionalPrice = cartData?.item?.item?.promotionalPrice;
  }

  return (
    <tr className="border-b border-gray-[#e4e7e6] flex flex-wrap lg:table-row justify-between items-center py-10 mb-10 gap-10 ">
      {/* Image plus list */}
      <ImageAndListTableData
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
        qty={cartData?.qty}
        removeProduct={removeProduct}
        changeQty={changeQty}
      />
      {/* Large screen version */}
      <LgScreenTableData
        price={price}
        qty={cartData?.qty}
        removeProduct={removeProduct}
        changeQty={changeQty}
      />
    </tr>
  );
}
