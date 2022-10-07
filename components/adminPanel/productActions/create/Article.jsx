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

  const articleCons = sectionState.subsection[articleLen];
  const itemsCons = articleCons?.items;

  const addItem = (e) => {
    const addItemArticle = sectionState.subsection.map((article, index) => {
      if (articleLen == index) {
        article.items.push({ katNomer: "", cena: "", tipove: "" });
      }
      return article;
    });
    setSectionState((prevState) => ({
      ...prevState,
      subsection: addItemArticle,
    }));
  };
  const removeArticle = (e) => {
    setSectionState((prevState) => ({
      ...prevState,
      subsection: sectionState.subsection.filter((item, index) => {
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

    setSectionState((prevState) => ({
      ...prevState,
      subsection: sectionState.subsection.map((article, index) => {
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
      {/* <div className="flex justify-center">
        <IsComponent
          state={isImage}
          setState={setIsImage}
          onText="Добави Снимка"
          offText="Премахни снимка"
          sectionState={sectionState}
          setSectionState={setSectionState}
        />
      </div> */}

      {/* <div>
        <input
          type="checkbox"
          id="commonName"
          name="commonName"
          onChange={changeHandler}
        />
        <label htmlFor="commonName">Премахни общото име</label>
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
        className="flex justify-end px-10 py-2 ml-auto text-sm font-medium text-white rounded-md bg-primary-100"
      >
        Добави тип
      </button>
    </div>
  );
}

export default Article;
