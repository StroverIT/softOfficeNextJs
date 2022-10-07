import React, { useState, useEffect, useContext } from "react";

import Input from "../../../form/AccInput";
import { ProductContext } from "../ProductContext";
import { v4 as uuidv4 } from "uuid";

import Item from "./Item";
import { HiX } from "react-icons/hi";

import IsComponent from "./IsComponent";

function Article({ articleLen, articleData }) {
  const { sectionState, setSectionState } = useContext(ProductContext);
  const [isImage, setIsImage] = useState(false);

<<<<<<< HEAD
  const articleCons = sectionState.subsection[articleLen];
  const itemsCons = articleCons?.items;

  const addItem = (e) => {
    const addItemArticle = sectionState.subsection.map((article, index) => {
      if (articleLen == index) {
        article.items.push({ katNomer: "", cena: "", tipove: "" });
=======
  const articleCons = sectionState.articles[articleLen];
  const itemsCons = articleCons?.items;

  const addItem = (e) => {
    const addItemArticle = sectionState.articles.map((article, index) => {
      if (articleLen == index) {
        article.items.push({ katNomer: "", price: "", types: "" });
>>>>>>> d26f7cda55573513073816b1ede2bc730122a61e
      }
      return article;
    });
    setSectionState((prevState) => ({
      ...prevState,
<<<<<<< HEAD
      subsection: addItemArticle,
=======
      articles: addItemArticle,
>>>>>>> d26f7cda55573513073816b1ede2bc730122a61e
    }));
  };
  const removeArticle = (e) => {
    setSectionState((prevState) => ({
      ...prevState,
<<<<<<< HEAD
      subsection: sectionState.subsection.filter((item, index) => {
=======
      articles: sectionState.articles.filter((item, index) => {
>>>>>>> d26f7cda55573513073816b1ede2bc730122a61e
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
<<<<<<< HEAD

    setSectionState((prevState) => ({
      ...prevState,
      subsection: sectionState.subsection.map((article, index) => {
=======
    if (name == "commonName") {
      value = !e.target.checked;
    }
    setSectionState((prevState) => ({
      ...prevState,
      articles: sectionState.articles.map((article, index) => {
>>>>>>> d26f7cda55573513073816b1ede2bc730122a61e
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
<<<<<<< HEAD
      {/* <div className="flex justify-center">
=======
      <div className="flex justify-center">
>>>>>>> d26f7cda55573513073816b1ede2bc730122a61e
        <IsComponent
          state={isImage}
          setState={setIsImage}
          onText="Добави Снимка"
          offText="Премахни снимка"
          sectionState={sectionState}
          setSectionState={setSectionState}
        />
<<<<<<< HEAD
      </div> */}

      {/* <div>
=======
      </div>

      <div>
>>>>>>> d26f7cda55573513073816b1ede2bc730122a61e
        <input
          type="checkbox"
          id="commonName"
          name="commonName"
          onChange={changeHandler}
        />
        <label htmlFor="commonName">Премахни общото име</label>
<<<<<<< HEAD
      </div> */}
      <Input
        type="text"
        placeholder="nameToDisplay"
        id="nameToDisplay"
        value={articleData?.nameToDisplay}
        onChange={changeHandler}
      />
      <Input
        type="text"
        placeholder="tiput"
        id="tiput"
        value={articleData?.tiput}
        onChange={changeHandler}
      />
      <div>
        <label htmlFor="colors">Описание</label>
        <textarea
          name="opisanie"
          id="opisanie"
          className="w-full p-2 pl-5 text-lg font-semibold min-h-20 bg-primary-0 text-dark"
          onChange={changeHandler}
        ></textarea>
      </div>

      <Input
        type="file"
        placeholder="Снимка"
        id="imageUrl"
        onChange={changeHandler}
      />
=======
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
>>>>>>> d26f7cda55573513073816b1ede2bc730122a61e
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
<<<<<<< HEAD
        className="flex justify-end px-10 py-2 ml-auto text-sm font-medium text-white rounded-md bg-primary-100"
=======
        className="flex justify-end px-10 py-2 ml-auto text-sm font-medium text-white rounded-md bg-primary-lighter"
>>>>>>> d26f7cda55573513073816b1ede2bc730122a61e
      >
        Добави тип
      </button>
    </div>
  );
}

export default Article;
