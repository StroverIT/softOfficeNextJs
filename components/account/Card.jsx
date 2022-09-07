import React from "react";
// Next
import Link from "next/link";
import Image from "next/image";
//Icons
import { BsTrash } from "react-icons/bs";

// Components
import OldPrice from "../priceStyling/OldPrice";
import Pricing from "../priceStyling/Pricing";
// Redux
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/actions/productActions";
// Notifications
import {
  toastError,
  toastHideAll,
  toastPromise,
  toastSuccess,
} from "../notificataions/Toast";

export function Card({ itemData, setFavState, personalPromotions }) {
  const removeFavourites = async (productId) => {
    toastPromise("Изпраща се...");

    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ productId }),
    };

    const res = await fetch("/api/account/favourites/remove", options);
    const data = await res.json();

    toastHideAll();

    if (data.error) {
      toastError(data.error);
    }
    if (data.message) {
      toastSuccess(data.message);
      setFavState((prevState) =>
        prevState.filter((obj) => obj.product._id != productId)
      );
    }
  };
  const product = itemData.product;
  const price = product.item.cena.toFixed(2).split(".");
  if (personalPromotions?.sectionPromo) {
    const find = personalPromotions.sectionPromo.find(
      (item) => item.name == product.section.route
    );

    if (find) {
      const promoPerc = find.customPromo || personalPromotions.generalPromo;
      const promoPrice = (product.item.cena * (100 - promoPerc)) / 100;
      if (product.item.isOnPromotions) {
        product.item.promoPrice =
          promoPrice < product.item.promoPrice
            ? promoPrice
            : product.item.promoPrice;
        console.log(product.item.promoPrice);
      } else {
        product.item.promoPrice = promoPrice;
      }
    }
  }
  return (
    <div className="w-full">
      <Link
        href={`/products/${product.section.route}/${product.article.route}`}
      >
        <div className="relative w-full h-48 cursor-pointer">
          <Image
            src={`/uploads/${product.article.imgUrl}`}
            layout="fill"
            objectFit="contain"
            alt="Test image is that"
          />
          <div
            className="absolute right-0 p-2 text-xl transition-all bg-white border border-gray-200 rounded-full cursor-pointer top-3 text-dark hover:scale-105 hover:text-primary"
            onClick={() => removeFavourites(product._id)}
          >
            <BsTrash />
          </div>
        </div>
      </Link>
      <div>
        <h5 className="text-sm font-semibold text-center">
          <span> {product.commonName}</span>
          <span className="ml-1"> {product.articleName}</span>
        </h5>
      </div>
      <div className="pt-1 pb-2">
        {!product.item.isOnPromotions && (
          <Pricing price={price[0]} priceDec={price[1]} size="sm" />
        )}
        {product.item.isOnPromotions && (
          <div className="flex items-center justify-center gap-x-5">
            <div className="text-gray-200">
              <OldPrice price={price[0]} priceDec={price[1]} size="xl" />
            </div>
            <Pricing
              price={product.item.promoPrice.toFixed(2).split(".")[0]}
              priceDec={product.item.promoPrice.toFixed(2).split(".")[1]}
              size="xl"
            />
          </div>
        )}
      </div>
      <div>
        <Link
          href={`/products/${product.section.route}/${product.article.route}`}
        >
          <button
            type="button"
            className="w-full py-2 text-xs font-semibold text-white bg-primary"
          >
            ВИЖ ПРОДУКТА
          </button>
        </Link>
      </div>
    </div>
  );
}
