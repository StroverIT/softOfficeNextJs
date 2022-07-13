import React, { useState, useEffect, useContext } from "react";

import Input from "../../../form/AccInput";
import { ProductContext } from "../productContext";
import { v4 as uuidv4 } from "uuid";

import Item from "./Item";
import { HiX } from "react-icons/hi";

function Article({ articleLen }) {
  const { sectionState, setSectionState, articlesComp, setArticlesComp } =
    useContext(ProductContext);

  const [articlesState, setArticleState] = useState({});
  const [items, setItems] = useState([]);

  const removeArticle = (e) => {
    const filtered = articlesComp.filter((article) => {
      return article.props.articleLen != articleLen;
    });
    let filteredObj;
    if (articlesComp.length > 1) {
      filteredObj = sectionState.articles.filter(function (x, index) {
        if (index != articleLen) {
          return x;
        }
      });
    } else filteredObj = [];

    setSectionState((prevState) => ({
      ...prevState,
      secLen: sectionState.secLen - 1,
      articles: filteredObj,
    }));
    setArticlesComp(filtered);
  };
  const addItem = (e) => {
    const itemId = uuidv4();
    let itemLen;

    const articles = sectionState.articles.map((article, index) => {
      if (index == articleLen) {
        if (!article.items) {
          article.items = [];
          article.itemsLen = 0;
        }
        article.items.push({});
        article.itemsLen = article.itemsLen + 1;
        itemLen = article.itemsLen;
      }
      return article;
    });

    setSectionState((prevState) => ({
      ...prevState,
      articles: [...articles],
    }));

    setItems((lastItems) => [
      ...lastItems,
      <Item key={itemId} articleLen={articleLen} itemLen={itemLen} />,
    ]);
  };
  const changeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setArticleState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  useEffect(() => {
    const articles = sectionState.articles.map((item, index) => {
      if (index == articleLen) {
        return { ...item, ...articlesState };
      }
      return item;
    });
    setSectionState((prevState) => ({
      ...prevState,
      articles: [...articles],
    }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [articlesState]);
  return (
    <div className="px-2 py-5 border rounded-sm border-gray my-9">
      {sectionState.secLen - 1 == articleLen && (
        <div className="flex justify-end">
          <button
            type="button"
            className="text-secondary text-lg"
            onClick={removeArticle}
          >
            <HiX />
          </button>
        </div>
      )}

      <Input
        type="text"
        placeholder="Име на артикула"
        id="articleName"
        onChange={changeHandler}
      />
      <Input
        type="text"
        placeholder="Описание"
        id="description"
        onChange={changeHandler}
      />
      {items}
      <button
        type="button"
        onClick={() => addItem()}
        className="flex justify-center px-10 py-2 mx-auto text-sm font-medium text-white rounded-md bg-primary-lighter"
      >
        Добави тип
      </button>
    </div>
  );
}

export default Article;
