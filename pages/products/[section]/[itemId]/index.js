import React, { useState } from "react";
// Nextjs
import { getSession } from "next-auth/react";

// Icons
import { AiOutlineHeart } from "react-icons/ai";
// Styling
import style from "../../../../styles/products/showProduct.module.css";
// Components
import ThumbsGallery from "../../../../components/swiperJs/ThumbsGallery";
import Pricing from "../../../../components/priceStyling/Pricing";
import { productByItemId } from "../../../../services/productService";
import AddProductInput from "../../../../components/products/AddProductInput";

// Redux
import { useDispatch } from "react-redux";
import { addToCart } from "../../../../redux/actions/productActions";

// Utils
import productFormater from "../../../../utils/productFormater";

// Notifications
import { toastInformation } from "../../../../components/notificataions/Toast";
import Card from "../../../../components/products/Card";

export default function Index({ data, userData }) {
  const product = data?.foundItem;
  const alternatives = data?.alternatives;

  const price = product?.item?.price?.toFixed(2).split(".");
  const [currQty, setQty] = useState(1);
  const dispatch = useDispatch();

  const addProduct = (product, productName) => {
    const newObj = productFormater(product);
    toastInformation(`Добавихте ${newObj.articleName} в количката`);
    dispatch(addToCart(newObj, currQty));
  };
  const addFavourites = async (product) => {
    const newObj = productFormater(product);
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ product: newObj }),
    };

    const res = await fetch("/api/account/favourites/adding", options);
    const data = await res.json();
  };
  const itemName = `${product.sectionName} ${product.articleName} ${product.item.weight}`;
  return (
    <main className="mb-auto">
      <div className="container">
        <div className="flex flex-col justify-between py-5 my-5 border-b md:flex-row border-gray-bord text-gray-500">
          <div className="text-2xl font-semibold">
            <span className="ml-1 ">{itemName}</span>
          </div>
          {/* <div className="mt-5 md:mt-1">
            <ul className="text-sm text-right text-gray-250">
              <li>Код: 23141412</li> 
              <li>КатНомер: {product.item.katNomer}</li>
            </ul>
          </div> */}
        </div>
        <div className="grid-cols-2 lg:grid xl:grid-cols-[60%40%] ">
          <div className="border border-gray-bord py-20">
            <ThumbsGallery navSize="2xl" image={product.imageUrl} />
          </div>
          <section className="p-5 flex flex-col space-y-10">
            <section className="flex items-center justify-between border-b border-gray-bord ">
              <div className="text-lg font-bold">Цена:</div>
              <div>
                <Pricing price={price[0]} priceDec={price[1]} size="3xl" />
              </div>
            </section>
            <section className="flex flex-col sm:w-1/2 md:w-3/4 mx-auto justify-center h-full">
              <div className="mb-1">
                <label htmlFor="qty" className="font-semibold text-gray-200">
                  Количество:
                </label>
              </div>
              <AddProductInput setQty={setQty} currQty={currQty} />
              <button
                type="button"
                className={`w-full px-2 flex py-2  justify-center items-end font-semibold text-white  bg-primary mt-6 text-xl border border-primary hover:bg-transparent hover:text-primary transition-colors `}
                onClick={() => addProduct(product, itemName)}
              >
                Купи
              </button>
              {/* Favourites div */}
              {userData && (
                <div
                  className="flex items-center justify-center col-span-2 mt-6 cursor-pointer group hover:-translate-y-1 transition-transform"
                  onClick={() => addFavourites(product)}
                >
                  <div className="inline-flex p-2 text-xl rounded-full bg-gray  group-hover:text-white group-hover:bg-primary md:ml-5  ">
                    <AiOutlineHeart />
                  </div>
                  <span className="ml-1 text-sm select-none group-hover:text-primary">
                    Добави в любими
                  </span>
                </div>
              )}
            </section>
          </section>
          {/* <section className="p-4 mt-4 bg-gray-300 xl:order-1 md:col-span-2 xl:col-span-1 md:mt-0">
            <h3 className="text-xl font-semibold">Кратко описание</h3>
             <ul className="text-[#3b3b3b] text-sm mt-1  pb-4">
              {product.description[0]
                .split("\n")
                .slice(0, 5)
                .map((type) => {
                  return <li key={type}>{type}</li>;
                })}
            </ul> 
            <div className="flex justify-center mt-2">
              <ul className=" text-[0.95rem]">
                {product.description.slice(0, 2).map((description) => {
                  return <li key={description}>{description}</li>;
                })}
              </ul>
            </div>
          </section> */}
        </div>

        {/* <section className="my-16">
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
        </section> */}
        <section className="pt-5 pb-10 my-16 border border-gray-150">
          <h3 className="py-5  font-semibold text-center text-primary text-2xl">
            Описание
          </h3>
          <div className="flex ml-4 sm:ml-10 px-3">
            <ul className="list-disc ">
              {product.description[0].split("\n").map((description) => {
                return <li key={description}>{description}</li>;
              })}
            </ul>
          </div>
        </section>
        <section className="flex justify-center gap-x-16 my-20 flex-wrap gap-y-10 ">
          {alternatives &&
            alternatives.map((alt) => {
              console.log();
              return (
                <Card
                  data={alt}
                  key={alt.item._id}
                  sectionImage={product?.imageUrl}
                  sectionName={product.sectionName}
                />
              );
            })}
        </section>
      </div>
    </main>
  );
}

// Getting specific item product
export async function getServerSideProps(context) {
  const { itemId } = context.params;

  const product = await productByItemId(itemId);
  const session = await getSession({ req: context.req });
  return {
    props: {
      data: JSON.parse(JSON.stringify(product)),
      userData: JSON.parse(JSON.stringify(session)),
    },
  };
}
