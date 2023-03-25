// React things
import React, { useState, useEffect } from "react";
import { InputContext } from "./getAll/Context";
import { ArticleContext } from "./adding/Context";

// NextJs
import Image from "next/image";

// Components
import Edit from "./getAll/Edit";
import Article from "./getAll/Article";
import ItemsEdit from "./getAll/ItemsEdit";
import Input from "./getAll/Input";
import ArticleCreate from "./adding/Article";

// Notifications
import {
  toastPromise,
  toastSuccess,
  toastError,
  toastHideAll,
} from "../../notificataions/Toast";

// Fetches
import { edit } from "../../../services/productServiceFetch";
import { AiOutlinePlusCircle } from "react-icons/ai";

// Icons

export default function GetAll({ product, setMenuImgData }) {
  const [inputs, setInputs] = useState(product);
  const [productMenu, setProductMenu] = useState(false);
  const [isForm, setIsForm] = useState(false);
  const [openImgMenu, setOpenImgMenu] = useState(false);

  const [articles, setArticles] = useState([]);

  const changeHandler = (e) => {
    const name = e.target.name;
    let value = e.target.value;

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

  const addArticle = () => {
    setArticles((prevState) => [
      ...prevState,
      { items: [], tiput: "", opisanie: "", nameToDisplay: "" },
    ]);
  };
  const submitArticleHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("sectionId", product._id);
    // formData.append("subsection", JSON.stringify(articles));

    const subsection = articles.map((article, index) => {
      // Object.entries(article).forEach((onlyArt) => {
      //   console.log(onlyArt);
      // });
      formData.append("article", article.imageUrl);
      article.imageUrl = article.imageUrl.name;
      return article;
    });
    formData.append("subsection", JSON.stringify(subsection));

    const options = {
      method: "POST",
      body: formData,
    };
    const res = await fetch("/api/products/addArticles", options);
    const data = await res.json();
  };
  return (
    <InputContext.Provider value={{ inputs, setInputs, setMenuImgData }}>
      <section className="p-2 mb-10 border border-primary md:p-5">
        <section className="relative mb-5">
          {!isForm && (
            <>
              <div>
                <div>Име: {product.name}</div>
                <div>Името което се показва: {product.nameToDisplay}</div>

                {productMenu && (
                  <div className="p-5 mt-10 mb-2 border border-primary-50">
                    <h1 className="text-lg font-bold text-center text-primary-500">
                      Продукти:
                    </h1>
                    <div className="flex flex-wrap items-center p-2 my-2 border border-primary-200">
                      {product.subsection.map((subsection) => {
                        let img = "nqma";
                        if (subsection.img) {
                          img =
                            subsection?.img?.originalname ||
                            subsection?.img[0]?.originalname;
                        }
                        return (
                          <Article
                            key={subsection._id}
                            sectionName={product.name}
                            sectionId={product._id}
                            subsection={subsection}
                            img={img}
                          />
                        );
                      })}
                      <ArticleContext.Provider
                        value={{ articles, setArticles }}
                      >
                        {articles.map((article, index) => {
                          return (
                            <ArticleCreate
                              key={index}
                              articleLen={index}
                              articleData={article}
                            />
                          );
                        })}
                      </ArticleContext.Provider>
                      <div
                        className="flex items-center justify-center w-full my-5 text-3xl cursor-pointer select-none text-primary-trans"
                        onClick={addArticle}
                      >
                        <AiOutlinePlusCircle />
                        <span className="pl-1 text-2xl">Добави артикули</span>
                      </div>
                      {articles.length > 0 && (
                        <div className="">
                          <button
                            type="button"
                            onClick={submitArticleHandler}
                            className="flex justify-center py-2 mx-auto font-medium text-white rounded-md bg-green px-14 "
                          >
                            Изпрати заявка
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </>
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
          <div className="absolute top-0 right-0 flex flex-col items-end justify-end space-y-2">
            <div>
              <Edit
                clickHandler={() => setIsForm(!isForm)}
                theme={!isForm ? "blueLight" : "red"}
                text={!isForm ? "Редактирай" : "Откажи"}
              />
            </div>
            <div>
              <Edit
                clickHandler={() => setProductMenu(!productMenu)}
                theme={!productMenu ? "green" : "red"}
                text={!productMenu ? "Покажи продуктите" : "Скрий продуктите"}
              />
            </div>
          </div>
        </section>
      </section>
    </InputContext.Provider>
  );
}
