import React, { useEffect, useState } from "react";
// Nextjs
import { getSession } from "next-auth/react";
import { useRouter } from "next/router";
import Image from "next/image";
// Mongodb

// Components
import OldPrice from "../../../../components/priceStyling/OldPrice";
import Pricing from "../../../../components/priceStyling/Pricing";

// Icons
import { AiOutlineHeart } from "react-icons/ai";
import { IoArrowUndo } from "react-icons/io5";
// Styling

import { productByItemId } from "../../../../services/productService";
import AddProductInput from "../../../../components/products/AddProductInput";

// Redux
import { useDispatch } from "react-redux";
import { addToCart } from "../../../../redux/actions/productActions";

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
import SwiperProductSelect from "../../../../components/swiperJs/SwiperProductSelect";

export default function Index({ data, userData, isInFav }) {
  const router = useRouter();
  const routerHash = router?.asPath?.split("#");

  const [product, setProduct] = useState({ ...data?.foundItem });

  // const alternatives = data?.alternatives;

  const [currQty, setQty] = useState(1);
  const [price, setPrice] = useState(null);
  const [isFav, setIsFav] = useState(isInFav);
  const [isSelected, setSelected] = useState(false);

  const dispatch = useDispatch();

  const addProduct = (product, productName) => {
    const section = product.section;
    const article = product.article;
    const item = article.items[0];
    const newObj = {
      item: {
        route: item._id,
        tipove: item.tipove,
        cena: item.cena,
        promotionalPrice: item.promotionalPrice,
        isOnPromotions: item.isOnPromotions,
        isOnlyNumb: item.isOnlyNumb,
        katNomer: item.katNomer,
      },
      article: {
        imgUrl: article.img[0].originalname || article.img.originalname,
        name: article.nameToDisplay,
        route: article._id,
      },
      section: {
        name: section.nameToDisplay,
        route: section.name,
      },
    };

    toastProduct(
      `${section.nameToDisplay} ${article.tiput} успешно беше добавен в количката`
    );
    dispatch(addToCart(newObj, currQty));
  };
  const addFavourites = async (product) => {
    toastPromise("Изпраща се...");
    const section = product.section;
    const article = product.article;
    const item = article.items[0];
    const newObj = {
      item: {
        route: item._id,
        types: item.tipove,
        cena: item.cena,
        promoPrice: item.promotionalPrice,
        isOnPromotions: item.isOnPromotions,
        isOnlyNumb: item.isOnlyNumb,
      },
      article: {
        imgUrl: article.img[0].originalname || article.img.originalname,
        name: article.nameToDisplay,
        route: article._id,
      },
      section: {
        name: section.nameToDisplay,
        route: section.name,
      },
    };

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

  const itemName = `${
    product?.section?.nameToDisplay != "Обадете се"
      ? product?.section?.nameToDiplay
      : ""
  } ${product?.article?.nameToDisplay} `;

  const selectedProductHandler = (data) => {
    router.push(`#${data.item._id}`, undefined, { shallow: true });
  };

  useEffect(() => {
    if (product?.article?.items?.length == 1) {
      let priceObjInit = { forItem: product?.article?.items[0]?.cena };
      if (product.article.items[0].isOnPromotions) {
        priceObjInit.promoPrice = product?.article?.items[0]?.promotionalPrice;
      }

      setPrice(priceObjInit);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // const imgUrl =

  let imgUrl;
  if (product?.article?.img) {
    imgUrl = product.article.img.originalname;

    if (product.article.img?.length >= 0) {
      imgUrl = article.img[0]?.originalname;
    }
  }

  useEffect(() => {
    if (routerHash[1]) {
      const newData = JSON.parse(JSON.stringify(data.foundItem));
      inner: for (let item of newData?.article?.items) {
        if (item._id == routerHash[1]) {
          newData.article.items = [{ ...item }];
          break inner;
        }
      }
      if (newData?.article?.items?.length >= 1) {
        setProduct(newData);

        const priceInit = { forItem: newData.article.items[0].cena };
        if (newData.article.items[0].isOnPromotions) {
          priceInit.promoPrice = newData.article.items[0].promotionalPrice;
        }

        setPrice(priceInit);
        setSelected(true);
      }
    } else {
      setProduct({ ...data.foundItem });
      setSelected(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.asPath]);
  return (
    <main className="mb-auto">
      <div className="container">
        <div className="flex flex-col justify-between py-5 my-5 text-gray-500 border-b md:flex-row border-gray-bord">
          <div className="text-2xl font-semibold">
            {isSelected && (
              <div
                className="flex items-center mb-5 cursor-pointer text-secondary hover:text-primary-100"
                onClick={() =>
                  router.push(
                    `/products/hartiq/61eb119d7815ce846f1745b7`,
                    undefined,
                    { shallow: true }
                  )
                }
              >
                <div>
                  <IoArrowUndo />
                </div>
                <div className="mt-1 ml-1 text-sm">Назад</div>
              </div>
            )}
            <span className="ml-1 ">{itemName}</span>
          </div>
          {/* <div className="mt-5 md:mt-1">
            <ul className="text-sm text-right text-gray-250">
              <li>Код: 23141412</li> 
              <li>КатНомер: {product.katNomer}</li>
            </ul>
          </div> */}
        </div>
        {(product?.article?.items?.length == 1 || isSelected) && (
          <>
            <div className="grid-cols-2 lg:grid xl:grid-cols-[60%40%] ">
              <div className="py-20 border border-gray-bord">
                <div className="relative w-full h-96">
                  <Image
                    src={`/uploads/${imgUrl}`}
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
                  {product.section.nameToDisplay != "Обадете се" && (
                    <div className="text-lg font-bold">Цена:</div>
                  )}
                  {price?.forItem &&
                    !price.promoPrice &&
                    product.section.nameToDisplay != "Обадете се" && (
                      <Pricing
                        price={
                          parseFloat(price.forItem).toFixed(2).split(".")[0]
                        }
                        priceDec={
                          parseFloat(price.forItem).toFixed(2).split(".")[1]
                        }
                        size="3xl"
                      />
                    )}
                  {price?.promoPrice &&
                    product.section.nameToDisplay != "Обадете се" && (
                      <div className="flex gap-x-5">
                        <div className="text-gray-200">
                          <OldPrice
                            price={
                              parseFloat(price.forItem).toFixed(2).split(".")[0]
                            }
                            priceDec={
                              parseFloat(price.forItem).toFixed(2).split(".")[1]
                            }
                            size="3xl"
                            NoDDSText={true}
                          />
                        </div>
                        <Pricing
                          price={price.promoPrice.toFixed(2).split(".")[0]}
                          priceDec={price.promoPrice.toFixed(2).split(".")[1]}
                          size="3xl"
                        />
                      </div>
                    )}
                  {product.section.nameToDisplay == "Обадете се" && (
                    <div className="text-xl font-bold  w-full py-4 flex justify-center items-center flex-col">
                      <div className="font-normal text-[0.95rem]">
                        Обадете се за цена!
                      </div>

                      <div>088 888 4687</div>
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
                      onClick={() => removeFavourites(product._id)}
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
            <section className="pt-2 mt-16 mb-5 border border-gray-150">
              <h3 className="py-2 text-2xl font-semibold text-center text-primary">
                Описание
              </h3>
              <div className="flex px-3 pb-6 ml-4 sm:ml-10 container">
                <ul className="mb-1 list-disc">
                  {product?.article?.items[0].tipove
                    .split(";")
                    .splice(0, 5)
                    .map((type) => {
                      return <li key={type}>{type}</li>;
                    })}
                  {product.article.opisanie.split(";").map((description) => {
                    return <li key={description}>{description}</li>;
                  })}
                </ul>{" "}
              </div>
            </section>

            {/* <section className="pb-10 mb-16 border-b border-x border-gray-150">
              <h3 className="pt-1 pb-2 text-2xl font-semibold text-center text-primary">
                Допълнителна информация
              </h3>
              <div className="flex px-3 ml-4 sm:ml-10">
                <ul className="list-disc "></ul>
              </div>
            </section> */}
            {/* <section className="flex flex-wrap justify-center my-20 gap-x-16 gap-y-10 ">
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
            </section> */}
          </>
        )}
        {product?.article?.items?.length > 1 && !isSelected && (
          <>
            <SwiperProductSelect
              name={itemName}
              articleItems={product?.article?.items}
              article={{
                img: imgUrl,
              }}
              navSize="3xl"
              onClick={selectedProductHandler}
              sectionName={product.section.nameToDisplay}
            />
          </>
        )}
      </div>
    </main>
  );
}

// Getting specific item product
export async function getServerSideProps(context) {
  const { itemId, section } = context.params;
  const session = await getSession({ req: context.req });

  const product = await productByItemId(itemId, session);
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
