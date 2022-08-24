import Image from "next/image";
import React, { useState, useEffect } from "react";

import Edit from "./getAll/Edit";
import Article from "./getAll/Article";
import { InputContext } from "./getAll/Context";
import Input from "./getAll/Input";

import {
  toastPromise,
  toastSuccess,
  toastError,
  toastHideAll,
} from "../../notificataions/Toast";
import { edit } from "../../../services/productServiceFetch";

export default function GetAll({ product }) {
  const inputInit = {
    sectionName: product.sectionName,
    description: product.description,
    itemUnit: product.itemUnit,
    articles: product.articles.map((article) => {
      return {
        articleName: article.articleName,
        items: article.items.map((item) => {
          return {
            weight: item.weight,
            price: item.price,
          };
        }),
      };
    }),
  };
  const [inputs, setInputs] = useState(inputInit);

  const [isForm, setIsForm] = useState(false);
  const [isItemUnitForm, setItemUnitForm] = useState(false);

  const changeHandler = (e) => {
    const name = e.target.name;
    let value = e.target.value;
    if (name.includes("image")) {
      value = e.target.files[0];
    }

    setInputs((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const submitHandler = async (e) => {
    toastPromise("Изпраща се...");

    const data = await edit({ data: inputs, productId: product._id });

    toastHideAll();
    if (data?.error) {
      toastError(data?.error);
    }
    if (data?.message) {
      toastSuccess(data?.message);
    }
  };

  return (
    <InputContext.Provider value={{ inputs, setInputs }}>
      <section className="p-2 mb-10 border border-primary md:p-5">
        <section className="relative mb-5">
          {!isForm && (
            <div>
              <div>Секция: {product.sectionName}</div>
              <div>Описание: {product.description}</div>
              <div className="flex flex-wrap items-center ">
                Снимка:{" "}
                <div className="relative w-24 h-24">
                  <Image
                    src={`/uploads/${product.imageUrl}`}
                    layout="fill"
                    alt={product.imageUrl}
                  />
                </div>
              </div>
            </div>
          )}
          {isForm && (
            <div>
              <Input
                id="sectionName"
                text="Секция"
                holder="Секция"
                value={inputs.sectionName}
                handler={changeHandler}
              />
              <label htmlFor="types">Описание</label>
              <textarea
                name="description"
                id="description"
                value={inputs?.description}
                className="w-full p-2 pl-5 text-lg font-semibold min-h-20 bg-primary-0 text-dark"
                onChange={changeHandler}
              ></textarea>
            </div>
          )}
          <div className="absolute top-0 right-0">
            <Edit
              clickHandler={() => setIsForm(!isForm)}
              theme={!isForm ? "blueLight" : "red"}
              text={!isForm ? "Редактирай" : "Откажи"}
            />
          </div>
          {!inputs?.itemUnit && (
            <section className="flex justify-between">
              {isItemUnitForm && (
                <section>
                  <Input
                    id="itemUnit"
                    text="Мерна единица"
                    holder="Мерна единица"
                    value={inputs.itemUnit}
                    handler={changeHandler}
                  />
                </section>
              )}
              <Edit
                clickHandler={() => setItemUnitForm(!isItemUnitForm)}
                theme={!isItemUnitForm ? "red" : "red"}
                text={!isItemUnitForm ? "Добави мерна единица" : "Откажи"}
              />
            </section>
          )}
          {inputs?.itemUnit && (
            <section className="flex justify-between">
              {isItemUnitForm && (
                <section>
                  <Input
                    id="itemUnit"
                    text="Мерна единица"
                    holder="Мерна единица"
                    value={inputs.itemUnit}
                    handler={changeHandler}
                  />
                </section>
              )}
              <Edit
                clickHandler={() => setItemUnitForm(!isItemUnitForm)}
                theme={!isItemUnitForm ? "blueLight" : "red"}
                text={!isItemUnitForm ? "Смени мерната единица" : "Откажи"}
              />
            </section>
          )}
        </section>

        {product?.articles &&
          product?.articles.map((article, index) => {
            return (
              <Article
                key={article._id}
                article={inputs.articles[index]}
                articleLen={index}
              />
            );
          })}
        <div className="flex items-center justify-center">
          <button
            className="py-1 text-lg font-semibold text-white border bg-primary hover:text-primary hover:bg-transparent border-primary px-14"
            onClick={submitHandler}
          >
            Изпрати
          </button>
        </div>
      </section>
    </InputContext.Provider>
  );
}
