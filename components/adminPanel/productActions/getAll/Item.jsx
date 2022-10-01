import React, { useContext, useState } from "react";

import { InputContext } from "./Context";

export default function Item({ item, articleId, sectionId, img }) {
  const { setMenuImgData } = useContext(InputContext);

  return (
    <section className="p-5 border border-green">
      <div>
        Цена:
        <span className="pl-1">{item?.cena && item.cena}</span>
      </div>
      <div>
        Катномер:
        <span className="pl-1">{item?.katNomer && item.katNomer}</span>
      </div>
      <div>
        Типове:
        <span className="pl-1">{item?.tipove && item.tipove}</span>
      </div>
      {item?.promotionalPrice && (
        <div>
          Промоционална цена:
          <span className="pl-1">
            {item?.promotionalPrice && item.promotionalPrice}
          </span>
        </div>
      )}
      <div>
        <button
          onClick={() => {
            setMenuImgData({
              articleId: articleId,
              imgUrl: img,
              sectionId: sectionId,
              itemId: item._id,
            });
          }}
          className="px-5 py-1 ml-auto text-sm text-white border cursor-pointer bg-primary-100 hover:bg-transparent hover:text-primary-100 border-primary-100"
        >
          Редактирай/Сложи
          <span className="pl-1 font-bold uppercase">снимка</span>
        </button>
      </div>
    </section>
  );
}
