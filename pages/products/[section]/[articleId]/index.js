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
import PriceWithQuantity from "../../../../components/products/PriceWithQuantity";
import FullDescription from "../../../../components/products/IndividualProduct/FullDescription";
import BuyProduct from "../../../../components/products/IndividualProduct/BuyProduct";

export default function Index({ data, userData, isInFav }) {
  const router = useRouter();
  const routerHash = router?.asPath?.split("#");

  const [product, setProduct] = useState(data.foundItem);

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
  let imgUrl;

  // Future use
  const selectedProductHandler = (data) => {
    router.push(`#${data.item._id}`, undefined, { shallow: true });
  };

  // const imgUrl =
  // Variables
  // if (product?.article?.items?.length == 1) {
  //   if (product?.article?.items[0].imageUrl) {
  //     imgUrl = product?.article?.items[0].imageUrl;
  //   }
  // }
  if (product?.article?.img) {
    imgUrl = product?.article?.img?.originalname;

    if (product.article.img?.length >= 0) {
      imgUrl = product?.article?.img[0]?.originalname;
    }
  }

  const itemName = `${
    product?.section?.nameToDisplay != "Обадете се"
      ? product?.section?.nameToDisplay
      : ""
  } ${product?.article?.nameToDisplay} `;

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


  return (
    <main className="mb-auto">
      <div className="container">
        <div className="flex flex-col justify-between pt-5 pb-4 my-5 text-gray-500 border-b md:flex-row border-gray-bord">
          <div className="text-2xl font-semibold">
            {isSelected && (
              <div
                className="flex items-center mb-5 cursor-pointer text-secondary hover:text-primary-100"
                onClick={() =>
                  router.push(
                    `/products/${product.section.name}/${product.article._id}`,
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
          <div className="flex items-center justify-center text-sm text-right text-gray-250">
            Кат. номер: {item.katNomer}
          </div>
        </div>

        <div className={`grid-cols-2 lg:grid xl:grid-cols-[25%50%25%] `}>
          {/* <div className={`grid-cols-2 lg:grid xl:grid-cols-[25%20%30%25%] `}> */}
          <div className="py-5 ">
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
          <BuyProduct
            product={product}
            price={price}
            currQty={currQty}
            itemName={itemName}
            setQty={setQty}
            userData={userData}
            isFav={isFav}
            setIsFav={setIsFav}
            dispatch={dispatch}
            imgUrl={imgUrl}
          />
        </div>
        <FullDescription product={product} />

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

  const product = await productByItemId(articleId, session, itemId);

  let isInFav = false;

  if (session) {
    const user = await getUser(session.user.email);
    isInFav = await isFav(articleId, user._id);
  }

  return {
    props: {
      data: JSON.parse(JSON.stringify(product)),
      userData: JSON.parse(JSON.stringify(session)),
      isInFav,
    },
  };
}
