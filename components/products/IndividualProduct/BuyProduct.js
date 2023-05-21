import React from "react";
import Pricing from "../../priceStyling/Pricing";
import OldPrice from "../../priceStyling/OldPrice";
import PriceWithQuantity from "../PriceWithQuantity";
import AddProductInput from "../AddProductInput";
import { AiOutlineHeart } from "react-icons/ai";

import { addProduct, addFavourites, removeFavourites } from "./helpers";
import PricingWithName from "../../priceStyling/PricingWithName";

const BuyProduct = ({
  product,
  price,
  currQty,
  setQty,
  userData,
  isFav,
  dispatch,
  setIsFav,
  imgUrl,
  customQtySelected,
  customQtySetSelected,
  item
}) => {
  console.log(customQtySelected);
  return (
    <section className="flex flex-col justify-center p-5 space-y-10">
      <PricingWithName product={product} price={price} currQty={currQty}/>
      {/* If is custom qty like /products/beliPlikove */}
      {product.article.isCustomQty && (
        <section className="flex flex-col justify-center w-full h-full ">
          <PriceWithQuantity
            selected={customQtySelected}
            setSelected={customQtySetSelected}
            data={item.quantityWithPrices}
          />
          {customQtySelected.name != "Количество" && (
            <button
              type="button"
              className={`w-full px-2 flex py-2  justify-center items-end font-semibold text-white  bg-primary mt-6 text-xl border border-primary hover:bg-transparent hover:text-primary transition-colors `}
              onClick={() => addProduct({dispatch, product, imgUrl,currQty:1, customQtySelected })}
            >
              Купи
            </button>
          )}
        </section>
      )}
      {!product.article.isCustomQty && (
        <section className="flex flex-col justify-center ">
          <div className="mb-1">
            <label htmlFor="qty" className="font-semibold text-gray-200">
              Количество:
            </label>
          </div>
          <AddProductInput setQty={setQty} currQty={currQty} />
          <button
            type="button"
            className={`w-full px-2 flex py-2  justify-center items-end font-semibold text-white  bg-primary mt-6 text-xl border border-primary hover:bg-transparent hover:text-primary transition-colors `}
            onClick={() => addProduct({dispatch,product, imgUrl, currQty})}
          >
            Купи
          </button>
          {/* Favourites div */}
          {userData && !isFav && (
            <div
              className="flex items-center justify-center col-span-2 mt-6 transition-transform cursor-pointer group hover:-translate-y-1"
              onClick={() => addFavourites(product,setIsFav)}
            >
              <div className="inline-flex p-2 text-xl rounded-full bg-gray group-hover:text-white group-hover:bg-primary md:ml-5 ">
                <AiOutlineHeart />
              </div>
              <span className="ml-1 text-sm select-none group-hover:text-primary">
                Добави в любими
              </span>
            </div>
          )}
          {userData && isFav && (
            <div
              className="flex items-center justify-center col-span-2 mt-6 transition-transform cursor-pointer group hover:-translate-y-1"
              onClick={() => removeFavourites(product._id,setIsFav)}
            >
              <div className="inline-flex p-2 text-xl rounded-full bg-gray group-hover:text-white group-hover:bg-secondary md:ml-5 ">
                <AiOutlineHeart />
              </div>
              <span className="ml-1 text-sm select-none group-hover:text-secondary">
                Премахни от любими
              </span>
            </div>
          )}
        </section>
      )}
    </section>
  );
};

export default BuyProduct;
