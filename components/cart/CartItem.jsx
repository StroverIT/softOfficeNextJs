import React from "react";

// Components
import ImageAndListTableData from "./ImageAndListTableData";
import LgScreenTableData from "./LgScreenTableData";
import MobileScreenTableData from "./MobileScreenTableData";

export default function CartItem({
  cartData,
  removeProduct,
  changeQty,
  personalPromotions,
}) {
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
  if (personalPromotions?.sectionPromo) {
    const found = personalPromotions.sectionPromo.find((promo) => {
      return (promo.name = cartData.item.section.name);
    });
    if (found) {
      const promoPerc = found.customPromo || personalPromotions.generalPromo;
      const realPrice = cartData.item.item.cena;

      const personalPromoToPrice = (100 - promoPerc) / 100;

      const personalPromo = realPrice * personalPromoToPrice;

      if (cartData.item.item.isOnPromotions) {
        const promotionalPrice = cartData.item.item.promotionalPrice;

        const whichIsBetter =
          personalPromo < promotionalPrice ? personalPromo : promotionalPrice;

        price.promotionalPrice = whichIsBetter;
      } else {
        price.promotionalPrice = personalPromo;
      }
    }
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
