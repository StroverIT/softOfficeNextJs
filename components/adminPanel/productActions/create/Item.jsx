import { useContext, useState, useEffect } from "react";
import { HiX } from "react-icons/hi";
import Input from "../../../form/AccInput";
import { ProductContext } from "../productContext";

import IsComponent from "./IsComponent";

function Item({ itemLen, articleLen, itemData }) {
  const { sectionState, setSectionState } = useContext(ProductContext);

  const [itemState, setItemState] = useState({});

  const [isColors, setIsColors] = useState(false);
  const [isImage, setIsImage] = useState(false);

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
      <div className="flex justify-end">
        {articleLen}
        {itemLen}
        <button
          type="button"
          className="text-secondary text-lg"
          onClick={removeItem}
        >
          <HiX />
        </button>
      </div>
      <div className="flex flex-col items-center justify-center gap-3 mb-2 sm:flex-row">
        <div className="flex">
          {/* Button is here */}
          <IsComponent
            state={isImage}
            setState={setIsImage}
            onText="Добави снимка"
            offText="Премахни снимката"
          />
        </div>
        <div className="flex">
          <IsComponent
            state={isColors}
            setState={setIsColors}
            onText="Добави Цветовете"
            offText="Премахни Цветовете"
          />
        </div>
      </div>

      <Input
        type="text"
        placeholder="КатНомер"
        id="katNomer"
        value={itemData?.katNomer}
        onChange={changeHandler}
      />
      <Input
        type="text"
        placeholder="Цена"
        id="price"
        value={itemData?.price}
        onChange={changeHandler}
      />
      <div>
        <label htmlFor="types">Типове</label>
        <textarea
          name="types"
          id="types"
          value={itemData?.types}
          className="w-full p-2 pl-5 text-lg font-semibold min-h-20 bg-primary-0 text-dark"
          onChange={changeHandler}
        ></textarea>
      </div>
      {isColors && (
        <div>
          <label htmlFor="colors">Цветове</label>
          <textarea
            name="colors"
            id="colors"
            className="w-full p-2 pl-5 text-lg font-semibold min-h-20 bg-primary-0 text-dark"
            onChange={changeHandler}
          ></textarea>
        </div>
      )}

      {isImage && (
        <Input
          type="file"
          placeholder="Снимка"
          id="imageUrl"
          onChange={changeHandler}
        />
      )}
    </div>
  );
}

export default Item;
