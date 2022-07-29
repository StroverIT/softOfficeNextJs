import React from "react";
import { BsTrash } from "react-icons/bs";
import Image from "next/image";
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

export function Card({ itemData, setFavState }) {
  const dispatch = useDispatch();

  const addProduct = (product) => {
    dispatch(addToCart(product));
  };
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
  const price = product.price.toFixed(2).split(".");
  return (
    <div className="w-full">
      <div className="relative w-full h-48">
        <Image
          src={`/uploads/${product.imageUrl}`}
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
      <div>
        <h5 className="text-sm font-semibold text-center">
          <span> {product.commonName}</span>
          <span className="ml-1"> {product.articleName}</span>
        </h5>
      </div>
      <div className="pt-1 pb-2">
        <Pricing price={price[0]} priceDec={price[1]} size="sm" />
      </div>
      <div>
        <button
          type="button"
          className="w-full py-2 text-xs font-semibold text-white bg-primary"
          onClick={() => addProduct(itemData.product)}
        >
          ДОБАВИ В КОЛИЧКА
        </button>
      </div>
    </div>
  );
}
