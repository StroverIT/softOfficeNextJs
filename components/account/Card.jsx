import React from "react";
<<<<<<< HEAD
// Next
import Link from "next/link";
import Image from "next/image";
//Icons
import { BsTrash } from "react-icons/bs";

// Components
import OldPrice from "../priceStyling/OldPrice";
=======
import { BsTrash } from "react-icons/bs";
import Image from "next/image";
>>>>>>> d26f7cda55573513073816b1ede2bc730122a61e
import Pricing from "../priceStyling/Pricing";
// Redux
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/actions/productActions";
<<<<<<< HEAD
// Notifications
import {
  toastError,
  toastHideAll,
  toastPromise,
  toastSuccess,
} from "../notificataions/Toast";

export function Card({ itemData, setFavState }) {
  const removeFavourites = async (productId) => {
    toastPromise("Изпраща се...");
=======

export function Card({ itemData }) {
  const dispatch = useDispatch();

  const addProduct = (product) => {
    dispatch(addToCart(product));
  };
  const removeProduct = async () => {
    const ownerId = itemData.ownerId;
    const favId = itemData.favId;
>>>>>>> d26f7cda55573513073816b1ede2bc730122a61e

    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
<<<<<<< HEAD
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
=======
      body: JSON.stringify({ ownerId, favId }),
    };
    const res = await fetch("/api/account/favourites/remove", options);
    console.log(res);
    const data = await res.json();
    console.log(data);
  };
  const product = itemData.product;
  const price = product.price.toFixed(2).split(".");
  return (
    <div className="w-full">
      <div className="relative w-full h-48">
        <Image
          src="/images/testImage2.png"
          layout="fill"
          objectFit="contain"
          alt="Test image is that"
        />
        <div
          className="absolute right-0 top-3 cursor-pointer text-dark bg-white rounded-full p-2 text-xl border border-gray-200 hover:scale-105 hover:text-primary transition-all"
          onClick={removeProduct}
        >
          <BsTrash />
        </div>
      </div>
      <div>
        <h5 className="font-semibold text-sm text-center">
>>>>>>> d26f7cda55573513073816b1ede2bc730122a61e
          <span> {product.commonName}</span>
          <span className="ml-1"> {product.articleName}</span>
        </h5>
      </div>
<<<<<<< HEAD
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
=======
      <div className="pb-2 pt-1">
        <Pricing price={price[0]} priceDec={price[1]} size="sm" />
      </div>
      <div>
        <button
          type="button"
          className="bg-primary text-white py-2 w-full text-xs font-semibold"
          onClick={() => addProduct(itemData.product)}
        >
          ДОБАВИ В КОЛИЧКА
        </button>
>>>>>>> d26f7cda55573513073816b1ede2bc730122a61e
      </div>
    </div>
  );
}
