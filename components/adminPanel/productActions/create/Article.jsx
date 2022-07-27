import React, { useState, useEffect, useContext } from "react";

import Input from "../../../form/AccInput";
import { ProductContext } from "../ProductContext";

import Item from "./Item";
import { HiX } from "react-icons/hi";

function Article({ articleLen, articleData }) {
  const { sectionState, setSectionState } = useContext(ProductContext);

  const articleCons = sectionState.articles[articleLen];
  const itemsCons = articleCons?.items;

  const addItem = (e) => {
    const addItemArticle = sectionState.articles.map((article, index) => {
      if (articleLen == index) {
        article.items.push({ weight: "", price: "" });
      }
      return article;
    });
    setSectionState((prevState) => ({
      ...prevState,
      articles: addItemArticle,
    }));
  };
  const removeArticle = (e) => {
    setSectionState((prevState) => ({
      ...prevState,
      articles: sectionState.articles.filter((item, index) => {
        return index != articleLen;
      }),
    }));
  };
  const changeHandler = (e) => {
    const name = e.target.name;
    let value = e.target.value;

    if (name.includes("image")) {
      value = e.target.files[0];
    }
    if (name == "commonName") {
      value = !e.target.checked;
    }
    setSectionState((prevState) => ({
      ...prevState,
      articles: sectionState.articles.map((article, index) => {
        if (articleLen == index) {
          return { ...article, [name]: value };
        }
        return article;
      }),
    }));
  };

  return (
    <div className="px-2 py-5 border rounded-sm border-gray my-9">
      <div className="flex justify-between">
        <div>{articleLen}</div>
        <div>
          <button
            type="button"
            className="text-lg text-secondary"
            onClick={removeArticle}
          >
            <HiX />
          </button>
        </div>
      </div>

      <Input
        type="text"
        placeholder="Име на артикула"
        id="articleName"
        value={articleData?.articleName}
        onChange={changeHandler}
      />

      {itemsCons &&
        itemsCons.map((item, index) => {
          return (
            <Item
              key={index}
              itemData={item}
              itemLen={index}
              articleLen={articleLen}
            />
          );
        })}
      <button
        type="button"
        onClick={() => addItem()}
        className="flex justify-end px-10 py-2 ml-auto text-sm font-medium text-white rounded-md bg-primary-lighter"
      >
        Добави тип
      </button>
    </div>
  );
}

export default Article;
