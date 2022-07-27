import { useContext, useState, useEffect } from "react";
import { HiX } from "react-icons/hi";
import Input from "../../../form/AccInput";
import { ProductContext } from "../ProductContext";

import IsComponent from "./IsComponent";

function Item({ itemLen, articleLen, itemData }) {
  const { sectionState, setSectionState } = useContext(ProductContext);

  const removeItem = (e) => {
    const itemRem = sectionState.articles.map((article, index) => {
      if (index == articleLen) {
        article.items = article.items.filter((item, itemInd) => {
          return itemInd != itemLen;
        });
      }
      return article;
    });
    setSectionState((prevState) => ({
      ...prevState,
      articles: itemRem,
    }));
  };
  const changeHandler = (e) => {
    const name = e.target.name;
    let value = e.target.value;
    console.log(name, value);
    if (name.includes("image")) {
      value = e.target.files[0];
    }

    setSectionState((prevState) => ({
      ...prevState,
      articles: sectionState.articles.map((article, index) => {
        if (articleLen == index) {
          article.items = article.items.map((item, itemIndex) => {
            if (itemIndex == itemLen) {
              item[name] = value;
            }
            return item;
          });
        }
        return article;
      }),
    }));
  };

  return (
    <div className="px-2 py-5 border rounded-sm border-gray my-9">
      <div className="flex justify-between">
        <div>
          {articleLen}
          {itemLen}
        </div>
        <div className="">
          <button
            type="button"
            className="text-lg text-secondary"
            onClick={removeItem}
          >
            <HiX />
          </button>
        </div>
      </div>

      {/* <div>
        <label htmlFor="types">Типове</label>
        <textarea
          name="types"
          id="types"
          value={itemData?.types}
          className="w-full p-2 pl-5 text-lg font-semibold min-h-20 bg-primary-0 text-dark"
          onChange={changeHandler}
        ></textarea>
      </div> */}
      <Input
        type="text"
        placeholder="Тежест"
        id="weight"
        value={itemData?.weight}
        onChange={changeHandler}
      />
      <Input
        type="text"
        placeholder="Цена"
        id="price"
        value={itemData?.price}
        onChange={changeHandler}
      />
    </div>
  );
}

export default Item;
