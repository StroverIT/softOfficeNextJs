import React, { useEffect, useState } from "react";
// Nextjs
import { getSession } from "next-auth/react";
import { useRouter } from "next/router";
import Image from "next/image";

// Components
import OldPrice from "../../../../components/priceStyling/OldPrice";
import Pricing from "../../../../components/priceStyling/Pricing";

// Icons
import { AiOutlineHeart } from "react-icons/ai";
import { IoArrowUndo } from "react-icons/io5";
// Styling

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
import PriceWithQuantity from "../../../../components/products/PriceWithQuantity";
import { formatterById } from "../../../../utils/Bittel";

export default function Index({ data, userData, isInFav }) {
  const router = useRouter();
  const routerHash = router?.asPath?.split("#");

  const [product, setProduct] = useState(data);

  // const alternatives = data?.alternatives;
  const item = product.item;

  const [currQty, setQty] = useState(1);
  const [price, setPrice] = useState({
    forItem: item.cena,
    promoPrice: item.promotionalPrice,
  });
  const [isFav, setIsFav] = useState(isInFav);
  const [isSelected, setSelected] = useState(false);
  const [customQtySelected, customQtySetSelected] = useState({
    name: "Количество",
  });
  const dispatch = useDispatch();
  let imgUrl = product.article.imgUrl;

  const addProduct = (product, productName) => {
    const section = product.section;
    const article = product.article;
    const item = product.item;

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
        imgUrl,
        name: "",
        route: article._id,
      },
      section: {
        name: section.nameToDisplay,
        route: section.name,
      },
    };
    if (product.article.isCustomQty) {
      newObj.item.cena = customQtySelected.price;
      newObj.item.tipove += `;${customQtySelected.name}`;
    }
    toastProduct(
      `Добавихте ${currQty} ${currQty > 1 ? "броя" : "брой"} "${
        section.name
      }" в количката си`
    );
    dispatch(addToCart(newObj, currQty));
  };
  const addFavourites = async (product) => {
    toastPromise("Изпраща се...");
    const section = product.section;
    const article = product.article;
    const item = article.items[0];
    let imgUrl;
    if (article.img) {
      imgUrl = article?.img?.originalname || article?.img[0]?.originalname;
    }
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
        imgUrl: imgUrl,
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

  const itemName = `${product.section.name} `;

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
  useEffect(() => {
    // if (routerHash[1]) {
    //   const newData = JSON.parse(JSON.stringify(data.foundItem));
    //   inner: for (let item of newData?.article?.items) {
    //     if (item._id == routerHash[1]) {
    //       newData.article.items = [{ ...item }];
    //       break inner;
    //     }
    //   }
    //   if (newData?.article?.items?.length >= 1) {
    //     setProduct(newData);
    //     const priceInit = { forItem: newData?.article?.items[0].cena };
    //     if (newData.article.items[0].isOnPromotions) {
    //       priceInit.promoPrice = newData?.article?.items[0].promotionalPrice;
    //     }
    //     setPrice(priceInit);
    //     setSelected(true);
    //   }
    // } else {
    //   setProduct({ ...data.foundItem });
    //   setSelected(false);
    // }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.asPath]);

  const forItem = parseFloat(price.forItem * currQty)
    .toFixed(2)
    .split(".");
  const promoPrice = parseFloat(price.promoPrice * currQty)
    .toFixed(2)
    .split(".");

  return (
    <main className="mb-auto">
      <div className="container">
        <div className="flex flex-col justify-between pt-5 pb-4 my-5 text-gray-500 border-b md:flex-row border-gray-bord">
          <div className="text-2xl font-semibold">
            <span className="ml-1 ">{itemName}</span>
          </div>
          <div className="flex items-center justify-center text-sm text-right text-gray-250">
            Кат. номер: {item.katNomer}
          </div>
        </div>

        <div className={`grid-cols-2 lg:grid xl:grid-cols-[25%50%25%] `}>
          {/* <div className={`grid-cols-2 lg:grid xl:grid-cols-[25%20%30%25%] `}> */}
          <div className="py-5 ">
            <div className="relative w-full h-96">
              <Image
                src={`${imgUrl}`}
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
          <section className="flex items-center justify-center w-full xl:px-10">
            <ul className="grid w-full grid-cols-2 py-5 pl-5 mb-1 list-disc justify-content-center gap-x-10 border-y border-gray-250 ">
              {item.tipove
                .split(";")
                .filter((e) => e.length < 30)
                .splice(0, 10)

                .map((type) => {
                  return <li key={type}>{type}</li>;
                })}
            </ul>
          </section>
          {/* <section></section> */}
          <section className="flex flex-col justify-center p-5 space-y-10">
            {!product.article.isCustomQty && (
              <section className="flex items-center justify-between border-b border-gray-bord ">
                {product.section.nameToDisplay != "Обадете се" && (
                  <div className="text-lg font-bold">Цена:</div>
                )}
                {price?.forItem &&
                  !price.promoPrice &&
                  product.section.nameToDisplay != "Обадете се" && (
                    <Pricing
                      price={forItem[0]}
                      priceDec={forItem[1]}
                      size="3xl"
                    />
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
                    onClick={() => addProduct(product, itemName)}
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
            )}
          </section>
        </div>
        <section className="pt-2 mt-16 mb-5 border border-gray-150">
          <h3 className="py-2 ml-4 text-2xl font-semibold sm:ml-8 text-primary">
            Пълно описание
          </h3>
          <div className="container flex px-3 pb-6 ml-4 sm:ml-10">
            <ul className="mb-1 list-disc">
              {product.item.tipove.split(";").map((type) => {
                return <li key={type}>{type}</li>;
              })}
              <li>
                {product?.article?.opisanie && product?.article?.opisanie}
              </li>
            </ul>
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
      </div>
    </main>
  );
}

// Getting specific item product
export async function getServerSideProps(context) {
  const { articleId, section, itemId } = context.query;
  const session = await getSession({ req: context.req });

  const res = await fetch(
    "https://dealers.bittel.bg/bg/api/json/341092012d162fa0d19e2ebad93fc708",
    {
      method: "GET",
    }
  );
  const data = await res.json();

  const product = formatterById(data.products, itemId);
  let isInFav = false;

  return {
    props: {
      data: JSON.parse(JSON.stringify(product)),
      userData: JSON.parse(JSON.stringify(session)),
      isInFav,
    },
  };
}
