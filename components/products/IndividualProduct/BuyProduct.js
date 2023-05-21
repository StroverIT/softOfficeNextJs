import React from "react";
import Pricing from "../../priceStyling/Pricing";
import OldPrice from "../../priceStyling/OldPrice";
import PriceWithQuantity from "../PriceWithQuantity";
import AddProductInput from "../AddProductInput";
import { AiOutlineHeart } from "react-icons/ai";

import { addProduct, addFavourites, removeFavourites } from "./helpers";

const BuyProduct = ({
  product,
  price,
  currQty,
  setQty,
  userData,
  isFav,
  dispatch,
  setIsFav,
  imgUrl
}) => {
  const forItem = parseFloat(price.forItem * currQty)
    .toFixed(2)
    .split(".");
  const promoPrice = parseFloat(price.promoPrice * currQty)
    .toFixed(2)
    .split(".");

  return (
    <section className="flex flex-col justify-center p-5 space-y-10">
      {!product.article.isCustomQty && (
        <section className="flex items-center justify-between border-b border-gray-bord ">
          {product.section.nameToDisplay != "Обадете се" && (
            <div className="text-lg font-bold">Цена:</div>
          )}
          {price?.forItem &&
            !price.promoPrice &&
            product.section.nameToDisplay != "Обадете се" && (
              <Pricing price={forItem[0]} priceDec={forItem[1]} size="3xl" />
            )}
          {price?.promoPrice &&
            product.section.nameToDisplay != "Обадете се" && (
              <div className="flex gap-x-5">
                <div className="text-gray-200">
                  <OldPrice
                    price={forItem[0]}
                    priceDec={forItem[1]}
                    size="3xl"
                    NoDDSText={true}
                  />
                </div>
                <Pricing
                  price={promoPrice[0]}
                  priceDec={promoPrice[1]}
                  size="3xl"
                />
              </div>
            )}
          {/* If is on calling only */}
          {product.section.nameToDisplay == "Обадете се" && (
            <div className="flex flex-col items-center justify-center w-full py-4 text-xl font-bold">
              <div className="font-normal text-[0.95rem]">
                Обадете се за цена!
              </div>

              <div>088 888 4687</div>
            </div>
          )}
        </section>
      )}
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
              onClick={() => addProduct(dispatch, product, imgUrl,currQty)}
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
            onClick={() => addProduct(dispatch,product, imgUrl, currQty)}
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
