import React, { useEffect, useState } from "react";
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
import {
  toastProduct,
  toastPromise,
  toastSuccess,
  toastError,
  toastHideAll,
} from "../../../../components/notificataions/Toast";
import Card from "../../../../components/products/Card";
// Service
import { isFav } from "../../../../services/favouriteService";
import { getUser } from "../../../../services/userServicejs";
import Image from "next/image";
import SwiperProductSelect from "../../../../components/swiperJs/SwiperProductSelect";

export default function Index({ data, userData, isInFav }) {
  const product = data?.foundItem;
  const alternatives = data?.alternatives;

  const [currQty, setQty] = useState(1);
  const [price, setPrice] = useState(null);
  const [isFav, setIsFav] = useState(isInFav);
  const dispatch = useDispatch();
  const addProduct = (product, productName) => {
    const newObj = productFormater(product);
    // ${productName} Беше успешно добавен в количката
    toastProduct(newObj.articleName);
    dispatch(addToCart(newObj, currQty));
  };
  const addFavourites = async (product) => {
    toastPromise("Изпраща се...");
    const newObj = productFormater(product);
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ product: newObj }),
    };

    const res = await fetch("/api/account/favourites/adding", options);
    const data = await res.json();

    toastHideAll();

    if (data.error) {
      toastError(data.error);
    }
    if (data.message) {
      toastSuccess(data.message);
      setIsFav(true);
    }
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
      setIsFav(false);
    }
  };

  const itemName = `${product?.section?.nameToDisplay} ${product?.article?.nameToDisplay} `;

  useEffect(() => {
    if (product?.article?.items?.length == 1) {
      setPrice(product?.article?.items[0]?.cena);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <main className="mb-auto">
      <div className="container">
        <div className="flex flex-col justify-between py-5 my-5 text-gray-500 border-b md:flex-row border-gray-bord">
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
        {product?.article?.items?.length == 1 && (
          <>
            <div className="grid-cols-2 lg:grid xl:grid-cols-[60%40%] ">
              <div className="py-20 border border-gray-bord">
                <div className="relative w-full h-96">
                  <Image
                    src={`/uploads/${product.article.img.originalname}`}
                    layout="fill"
                    alt="Img"
                    className="object-contain"
                  />
                </div>
                {/* <ThumbsGallery
              navSize="2xl"
              image={product.article.img.originalname}
            /> */}
              </div>
              <section className="flex flex-col p-5 space-y-10">
                <section className="flex items-center justify-between border-b border-gray-bord ">
                  <div className="text-lg font-bold">Цена:</div>
                  {price && (
                    <div>
                      <Pricing
                        price={price.split(".")[0]}
                        priceDec={price.split(".")[1]}
                        size="3xl"
                      />
                    </div>
                  )}
                </section>
                <section className="flex flex-col justify-center w-full h-full px-20">
                  <div className="mb-1">
                    <label
                      htmlFor="qty"
                      className="font-semibold text-gray-200"
                    >
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
                  {userData && !isFav && (
                    <div
                      className="flex items-center justify-center col-span-2 mt-6 transition-transform cursor-pointer group hover:-translate-y-1"
                      onClick={() => addFavourites(product, itemName)}
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
                      onClick={() => removeFavourites(product.item._id)}
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
              </section>
            </div>
            <section className="pt-5 pb-10 my-16 border border-gray-150">
              <h3 className="py-5 text-2xl font-semibold text-center text-primary">
                Описание
              </h3>
              <div className="flex px-3 ml-4 sm:ml-10">
                <ul className="list-disc ">
                  {product.article.opisanie.split(";").map((description) => {
                    return <li key={description}>{description}</li>;
                  })}
                </ul>
              </div>
            </section>
            <section className="flex flex-wrap justify-center my-20 gap-x-16 gap-y-10 ">
              {alternatives &&
                alternatives.map((alt) => {
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
          </>
        )}
        {product?.article?.items?.length > 1 && (
          <>
            <SwiperProductSelect
              articleItems={product?.article?.items}
              article={{ img: product?.article?.img?.originalname }}
              navSize="3xl"
            />
          </>
        )}
      </div>
    </main>
  );
}

// Getting specific item product
export async function getServerSideProps(context) {
  const { itemId } = context.params;

  const product = await productByItemId(itemId);
  const session = await getSession({ req: context.req });
  let isInFav = false;

  if (session) {
    const user = await getUser(session.user.email);
    isInFav = await isFav(itemId, user._id);
  }
  return {
    props: {
      data: JSON.parse(JSON.stringify(product)),
      userData: JSON.parse(JSON.stringify(session)),
      isInFav,
    },
  };
}
