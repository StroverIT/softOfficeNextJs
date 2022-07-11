import React, { useState, useEffect } from "react";

import Input from "../../../form/AccInput";

import Item from "./Item";

function Article({ articlesState, setArticlesState, articleLength }) {
  const [currArticleState, setCurrArticleState] = useState({});
  const [items, setItems] = useState([]);

  const addItem = (e) => {
    setItems((lastItems) => [
      ...lastItems,
      <Item
        key={itemId}
        articleState={articleState}
        setArticleState={setArticleState}
      />,
    ]);
  };
  const changeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setCurrArticleState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  useEffect(() => {
    const updatedArticle = articlesState.map((item) => {
      if (item.length == articleLength) {
        return { ...item, ...currArticleState };
      }
      return item;
    });
    setArticlesState(updatedArticle);
  }, [articlesState]);
  return (
    <div className="px-2 py-5 border rounded-sm border-gray my-9">
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
