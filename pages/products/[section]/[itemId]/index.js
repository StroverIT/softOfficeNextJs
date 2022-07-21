import React, { useState } from "react";

// Icons
import { AiOutlineHeart } from "react-icons/ai";
// Styling
import style from "../../../../styles/products/showProduct.module.css";
// Components
import ThumbsGallery from "../../../../components/swiperJs/ThumbsGallery";
import Pricing from "../../../../components/priceStyling/Pricing";
import QuanityInput from "../../../../components/base/QuanityInput";
import { productByItemId } from "../../../../services/productService";

import { useDispatch } from "react-redux";
import { addToCart } from "../../../../redux/actions/productActions";
import AddProductInput from "../../../../components/products/AddProductInput";

export default function Index({ product }) {
  const price = product.item.price.toFixed(2).split(".");
  const [currQty, setQty] = useState(1);

  const dispatch = useDispatch();

  const addProduct = (product) => {
    let newObj = {};

    for (let [key, value] of Object.entries(product.item)) {
      newObj[key] = value;
    }
    for (let [key, value] of Object.entries(product)) {
      if (key != "item") {
        newObj[key] = value;
      }
    }
    dispatch(addToCart(newObj, currQty));
  };

  return (
    <main className="mb-auto">
      <div className="container">
        <div className="flex flex-col justify-between py-5 my-5 border-b md:flex-row border-gray-bord">
          <div className="text-2xl font-semibold">
            <span>{product.commonName}</span>
            <span className="ml-1">{product.articleName}</span>
          </div>
          <div className="mt-5 md:mt-1">
            <ul className="text-sm text-right text-gray-250">
              {/* <li>Код: 23141412</li> */}
              <li>КатНомер: {product.item.katNomer}</li>
            </ul>
          </div>
        </div>
        <div className="grid-cols-2 lg:grid xl:grid-cols-[40%30%30%] auto-cols-max">
          <ThumbsGallery navSize="2xl" />
          <section className="p-4 bg-gray-400 xl:order-2">
            <section className="flex items-center justify-between border-b border-gray-bord ">
              <div>Цена:</div>
              <div>
                <Pricing price={price[0]} priceDec={price[1]} size="3xl" />
              </div>
            </section>
            <section className="my-5 ">
              <div className="">
                <div className="mb-1">
                  <label htmlFor="qty" className="text-sm font-semibold ">
                    Бройки:
                  </label>
                </div>
                <div className="grid grid-cols-[30%70%]">
                  <AddProductInput setQty={setQty} currQty={currQty} />
                  <button
                    type="button"
                    className={`w-full px-2 flex py-2  justify-center items-end font-semibold text-white  bg-primary text-sm ml-3`}
                    onClick={() => addProduct(product)}
                  >
                    Купи
                  </button>
                  <div className="flex items-center justify-center col-span-2 mt-6 cursor-pointer group ">
                    <div className="inline-flex p-2 text-xl rounded-full bg-gray group-hover:bg-gray-200 group-hover:text-white md:ml-5">
                      <AiOutlineHeart />
                    </div>
                    <span className="ml-1 text-sm select-none group-hover:font-medium">
                      Добави в любими
                    </span>
                  </div>
                </div>
              </div>
            </section>
          </section>
          <section className="p-4 mt-4 bg-gray-300 xl:order-1 md:col-span-2 xl:col-span-1 md:mt-0">
            <h3 className="text-xl font-semibold">Кратко описание</h3>
            <ul className="text-[#3b3b3b] text-sm mt-1  pb-4">
              {product.item.types[0]
                .split("\n")
                .slice(0, 5)
                .map((type) => {
                  return <li key={type}>{type}</li>;
                })}
            </ul>
            <div className="flex justify-center">
              <ul className=" text-[0.95rem]">
                {product.description.slice(0, 2).map((description) => {
                  return <li key={description}>{description}</li>;
                })}
              </ul>
            </div>
          </section>
        </div>

        <section className="my-16">
          <h3 className="py-5 text-xl font-semibold text-center">
            ВСИЧКИ ХАРАКТЕРИСТИКИ
          </h3>
          <table className={`table-fixed  ${style.table} w-full`}>
            <tbody className="even:bg-dark">
              {product.item.types[0]
                .split("\n")

                .map((type) => {
                  type = type.split(":");
                  return (
                    <tr key={type}>
                      <td>{type[0]}</td>
                      <td>{type[1]}</td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </section>
        <section className="pt-5 pb-10 my-16 bg-gray-300">
          <h3 className="py-5 text-xl font-semibold text-center">
            Пълно Описание
          </h3>
          <div className="flex justify-center">
            <ul className="text-lg list-disc ">
              {product.description.map((description) => {
                return <li key={description}>{description}</li>;
              })}
            </ul>
          </div>
        </section>
      </div>
    </main>
  );
}

// Getting specific item product
export async function getServerSideProps(context) {
  const { itemId } = context.params;

  const product = await productByItemId(itemId);
  return {
    props: { product: JSON.parse(JSON.stringify(product)) },
  };
}
