import React, { useEffect, useState } from "react";
// Nextjs
import { getSession } from "next-auth/react";
import { useRouter } from "next/router";
import Image from "next/image";
// Icons
import { IoArrowUndo } from "react-icons/io5";
// Styling

import {
  getAllProducts,
  productByItemId,
} from "../../../../services/productService";

// Redux
import { useDispatch } from "react-redux";

// Notifications

import Card from "../../../../components/products/Card";
// Service
import { isFav } from "../../../../services/favouriteService";
import { getUser } from "../../../../services/userServicejs";
import FullDescription from "../../../../components/products/IndividualProduct/FullDescription";
import BuyProduct from "../../../../components/products/IndividualProduct/BuyProduct";
import MainProduct from "../../../../components/products/IndividualProduct/MainProduct";

export default function Index({ data, userData, isInFav, alternatives }) {
  const router = useRouter();

  const [product, setProduct] = useState(null);

  useEffect(() => {
    setProduct(data.foundItem);
  }, [router, product]);

  // eslint-disable-next-line react-hooks/rules-of-hooks

  // const alternatives = data?.alternatives;
  const item = product?.item;

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [currQty, setQty] = useState(1);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [price, setPrice] = useState({
    forItem: item?.cena,
    promoPrice: item?.promotionalPrice,
  });
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [isFav, setIsFav] = useState(isInFav);
  const [isSelected, setSelected] = useState(false);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [customQtySelected, customQtySetSelected] = useState({
    name: "Количество",
  });
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const dispatch = useDispatch();
  let imgUrl;

  // Future use

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

  if (!product) return <div>Зарежда се...</div>;

  return (
    <main className="mb-20">
      <div className="container">
        <MainProduct
          itemName={itemName}
          item={item}
          imgUrl={imgUrl}
          product={product}
          price={price}
          currQty={currQty}
          setQty={setQty}
          userData={userData}
          isFav={isFav}
          setIsFav={setIsFav}
          dispatch={dispatch}
            customQtySelected={customQtySelected}
            customQtySetSelected={customQtySetSelected}
        />

        <section className="flex flex-wrap justify-center my-20 gap-x-16 gap-y-10 ">
          {console.log(alternatives)}
          {alternatives &&
            alternatives.items
              .filter((item) => item._id != router.query?.itemId)
              .splice(0,5)
              .map((alt) => {
                return (
                  <Card
                    data={alt}
                    key={alt._id}
                    imgUrl={imgUrl}
                    productName={`${product.section.nameToDisplay} ${product.article.nameToDisplay}`}
                    isCustomQty={product.article.isCustomQty}
                    sectionName={product.section.nameToDisplay}
                    url={`/products/${product.section.name}/${product.article._id}?itemId=${alt._id}`}
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
  const { articleId, section, itemId } = context.query;
  const session = await getSession({ req: context.req });
  const product = await productByItemId(articleId, session, itemId);
  let isInFav = false;

  if (session) {
    const user = await getUser(session.user.email);
    isInFav = await isFav(articleId, user._id);
  }
  let alternatives = await getAllProducts(section, session);

  alternatives = alternatives.subsection.find((sub) => sub._id == articleId);

  return {
    props: {
      data: JSON.parse(JSON.stringify(product)),
      userData: JSON.parse(JSON.stringify(session)),
      alternatives: JSON.parse(JSON.stringify(alternatives)),
      isInFav,
    },
  };
}
