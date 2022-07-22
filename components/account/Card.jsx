import React from "react";
import { BsTrash } from "react-icons/bs";
import Image from "next/image";
import Pricing from "../priceStyling/Pricing";
// Redux
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/actions/productActions";

export function Card({ itemData }) {
  const dispatch = useDispatch();

  const addProduct = (product) => {
    dispatch(addToCart(product));
  };
  const removeProduct = async () => {
    const ownerId = itemData.ownerId;
    const favId = itemData.favId;

    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
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
          <span> {product.commonName}</span>
          <span className="ml-1"> {product.articleName}</span>
        </h5>
      </div>
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
      </div>
    </div>
  );
}
