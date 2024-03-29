import React from 'react';

import Image from "next/image"

import FullDescription from './FullDescription';
import BuyProduct from './BuyProduct';

const MainProduct = ({itemName, item, imgUrl,product, price, currQty, setQty, userData,isFav, setIsFav, dispatch, customQtySetSelected, customQtySelected}) => {
    if(item.imageUrl) imgUrl = item.imageUrl
    return (
        <>
          <div className="flex flex-col justify-between pt-5 pb-4 my-5 border-b md:flex-row border-gray-bord">
          <div className="text-2xl font-semibold">
           
            <span className="ml-1 ">{!item.customName ? itemName : item.customName}</span>
          </div>
         
        </div>

        <div className={`grid-cols-2 lg:grid xl:grid-cols-[25%50%25%] self-start `}>
          {/* <div className={`grid-cols-2 lg:grid xl:grid-cols-[25%20%30%25%] `}> */}
          <div className="py-5 ">
            <div className="relative w-full h-64 lg:h-96">
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
            <ul className="grid w-full grid-cols-2 py-5 mb-1 list-disc pl-7 justify-content-center gap-x-10 border-y border-gray-250 ">
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
        </>
    );
}

export default MainProduct;
