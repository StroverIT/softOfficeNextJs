import Image from "next/image";
import React, { useState, useEffect } from "react";

import Edit from "./getAll/Edit";
import Article from "./getAll/Article";
import ItemsEdit from "./getAll/ItemsEdit";
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
  const [inputs, setInputs] = useState(product);
  const [isForm, setIsForm] = useState(false);

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
  const changeHandlerSubSection = (e, subLen) => {
    const name = e.target.name;
    let value = e.target.value;

    setInputs((prevState) => ({
      ...prevState,
      subsection: prevState.subsection.map((subsection, index) => {
        if (subLen == index) {
          return { ...subsection, [name]: value };
        }
        return subsection;
      }),
    }));
  };
  const changeHandlerItem = (e, subLen, itemLen) => {
    const name = e.target.name;
    let value = e.target.value;

    setInputs((prevState) => ({
      ...prevState,
      subsection: prevState.subsection.map((subsection, index) => {
        // If is found the current array
        if (subLen == index) {
          subsection.items = subsection.items.map((item, itemIdx) => {
            if (itemIdx == itemLen) {
              return { ...item, [name]: value };
            }
            return item;
          });
        }
        return subsection;
      }),
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
              <div>Име: {product.name}</div>
              <div>Името което се показва: {product.nameToDisplay}</div>

              <div className="p-5 my-2 border border-primary-50">
                <h1 className="text-lg font-bold text-center text-primary-500">
                  Продукти:
                </h1>
                <div className="flex flex-wrap items-center p-2 my-2 border border-primary-200">
                  {product.subsection.map((subsection) => {
                    let img = "nqma";
                    if (subsection.img) {
                      img = subsection?.img[0]?.originalname;
                    }
                    return (
                      <section
                        className="p-5 my-2 border border-primary-300"
                        key={subsection._id}
                      >
                        <div className="flex items-center">
                          Снимка:
                          <div className="relative ml-2 w-28 h-28">
                            <Image
                              layout="fill"
                              src={`/uploads/${img}`}
                              alt={img}
                            />
                          </div>
                        </div>
                        <div>Типът: {subsection.tiput}</div>
                        <div>
                          Името което се показва: {subsection.nameToDisplay}
                        </div>
                        <div>Описание: {subsection.opisanie}</div>
                        <div>
                          {subsection.items.map((item, index) => {
                            return (
                              <section
                                key={item?._id ? item._id : index}
                                className="p-5 border border-green"
                              >
                                <div>
                                  Цена:
                                  <span className="pl-1">
                                    {item?.cena && item.cena}
                                  </span>
                                </div>
                                <div>
                                  Катномер:
                                  <span className="pl-1">
                                    {item?.katNomer && item.katNomer}
                                  </span>
                                </div>
                                <div>
                                  Типове:
                                  <span className="pl-1">
                                    {item?.tipove && item.tipove}
                                  </span>
                                </div>
                                {item?.promotionalPrice && (
                                  <div>
                                    Промоционална цена:
                                    <span className="pl-1">
                                      {item?.promotionalPrice &&
                                        item.promotionalPrice}
                                    </span>
                                  </div>
                                )}
                              </section>
                            );
                          })}
                        </div>
                      </section>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
          {isForm && (
            <div className="relative">
              <div className="sticky flex items-center justify-center top-24">
                <button
                  className="py-1 text-lg font-semibold text-white border bg-primary hover:text-primary hover:bg-transparent border-primary px-14"
                  onClick={submitHandler}
                >
                  Изпрати
                </button>
              </div>
              <Input
                id="name"
                text="Секция"
                holder="Име"
                value={inputs.name}
                handler={changeHandler}
              />
              <Input
                id="nameToDisplay"
                text="Името което се показва"
                holder="Име"
                value={inputs.nameToDisplay}
                handler={changeHandler}
              />

              {inputs.subsection.map((subsection, index) => {
                return (
                  <section
                    key={index}
                    className="p-5 mb-10 border border-green"
                  >
                    <Input
                      id="nameToDisplay"
                      text="Името което се показва"
                      holder="Името което се показва"
                      value={inputs.subsection[index].nameToDisplay}
                      handler={(e) => changeHandlerSubSection(e, index)}
                    />
                    <Input
                      id="tiput"
                      text="tiput"
                      holder="tiput"
                      value={inputs.subsection[index].tiput}
                      handler={(e) => changeHandlerSubSection(e, index)}
                    />
                    <label htmlFor="types">Описание</label>
                    <textarea
                      name="opisanie"
                      id="opisanie"
                      value={inputs?.subsection[index].opisanie}
                      className="w-full p-2 pl-5 text-lg font-semibold min-h-20 bg-primary-0 text-dark"
                      onChange={(e) => changeHandlerSubSection(e, index)}
                    ></textarea>
                    {subsection?.items?.map((item, itemIdx) => {
                      return (
                        <ItemsEdit
                          key={itemIdx}
                          inputs={inputs}
                          itemIdx={itemIdx}
                          index={index}
                          changeHandler={changeHandlerItem}
                        />
                      );
                    })}
                  </section>
                );
              })}
            </div>
          )}
          <div className="absolute top-0 right-0">
            <Edit
              clickHandler={() => setIsForm(!isForm)}
              theme={!isForm ? "blueLight" : "red"}
              text={!isForm ? "Редактирай" : "Откажи"}
            />
          </div>
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
      </section>
    </InputContext.Provider>
  );
}
