import React, { useEffect, useState } from "react";
// Nextjs
import { getSession } from "next-auth/react";
import { useRouter } from "next/router";
import Image from "next/image";
// Icons
import { IoArrowUndo } from "react-icons/io5";
// Styling

import { getAllProducts, productByItemId } from "../../../../services/productService";

// Redux
import { useDispatch } from "react-redux";

// Notifications

import Card from "../../../../components/products/Card";
// Service
import { isFav } from "../../../../services/favouriteService";
import { getUser } from "../../../../services/userServicejs";
import FullDescription from "../../../../components/products/IndividualProduct/FullDescription";
import BuyProduct from "../../../../components/products/IndividualProduct/BuyProduct";

export default function Index({ data, userData, isInFav,alternatives }) {
  const router = useRouter();

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
 

 
  if (product?.article?.img) {
    imgUrl = product?.article?.img?.originalname;

    if (product.article.img?.length >= 0) {
      imgUrl = product?.article?.img[0]?.originalname;
    }
  }
  if(item.imageUrl) imgUrl = item.imageUrl

  const itemName = `${
    product?.section?.nameToDisplay != "Обадете се"
      ? product?.section?.nameToDisplay
      : ""
  } ${product?.article?.nameToDisplay} `;


  

  return (
    <main className="mb-20">
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
            customQtySelected={customQtySelected}
            customQtySetSelected={customQtySetSelected}
            item={item}
            imgUrl={imgUrl}
          />
        </div>
        <FullDescription product={product} />

                
              
        {/* <section className="flex flex-wrap justify-center my-20 gap-x-16 gap-y-10 ">
              {alternatives &&
                alternatives.items.filter(item=> item._id != router.query?.itemId).map((alt) => {
                  return (
                    <Card
                      data={alt}
                      key={item._id}
                      imgUrl={imgUrl}
                      productName={`${product.section.nameToDisplay} ${product.article.nameToDisplay}`}
                      isCustomQty={product.article.isCustomQty}
                      sectionName={product.section.nameToDisplay}
                      url={`/products/${product.section.name}/${product.article._id}?itemId=${alt._id}`}
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
  let alternatives = await getAllProducts(section, session);

  alternatives = alternatives.subsection.find(sub => sub._id == articleId)

  return {
    props: {
      data: JSON.parse(JSON.stringify(product)),
      userData: JSON.parse(JSON.stringify(session)),
      alternatives: JSON.parse(JSON.stringify(alternatives)),
      isInFav,
    },
  };
}
