import React, { useState, useEffect, useContext } from "react";

import Input from "../../../form/AccInput";
import { ProductContext } from "../productContext";
import { v4 as uuidv4 } from "uuid";

import Item from "./Item";
import { HiX } from "react-icons/hi";

import IsComponent from "./IsComponent";

function Article({ articleLen, articleData }) {
  const { sectionState, setSectionState } = useContext(ProductContext);
  const [isImage, setIsImage] = useState(false);

  const articleCons = sectionState.articles[articleLen];
  const itemsCons = articleCons?.items;

  const addItem = (e) => {
    const addItemArticle = sectionState.articles.map((article, index) => {
      if (articleLen == index) {
        article.items.push({ katNomer: "", price: "", types: "" });
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
      <div className="flex justify-center">
        <IsComponent
          state={isImage}
          setState={setIsImage}
          onText="Добави Снимка"
          offText="Премахни снимка"
          sectionState={sectionState}
          setSectionState={setSectionState}
        />
      </div>

      <div>
        <input
          type="checkbox"
          id="commonName"
          name="commonName"
          onChange={changeHandler}
        />
        <label htmlFor="commonName">Премахни общото име</label>
      </div>
      <Input
        type="text"
        placeholder="Име на артикула"
        id="articleName"
        value={articleData?.articleName}
        onChange={changeHandler}
      />
      <Input
        type="text"
        placeholder="Описание"
        id="description"
        value={articleData?.description}
        onChange={changeHandler}
      />
      {isImage && (
        <Input
          type="file"
          placeholder="Снимка"
          id="imageUrl"
          onChange={changeHandler}
        />
      )}
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
