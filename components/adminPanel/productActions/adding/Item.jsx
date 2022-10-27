import { useContext, useState, useEffect } from "react";
import { HiX } from "react-icons/hi";
import Input from "../../../form/AccInput";
import { ArticleContext } from "./Context";

import IsComponent from "../create/IsComponent";

function Item({ itemLen, articleLen, itemData }) {
  const { articles, setArticles } = useContext(ArticleContext);

  const [itemState, setItemState] = useState({});

  const [isColors, setIsColors] = useState(false);
  const [isImage, setIsImage] = useState(false);

  const removeItem = (e) => {
    const itemRem = articles.map((article, index) => {
      if (index == articleLen) {
        article.items = article.items.filter((item, itemInd) => {
          return itemInd != itemLen;
        });
      }
      return article;
    });
    setArticles(itemRem);
  };
  const changeHandler = (e) => {
    const name = e.target.name;
    let value = e.target.value;

    if (name.includes("image")) {
      value = e.target.files[0];
    }

    setArticles(
      articles.map((article, index) => {
        if (articleLen == index) {
          article.items = article.items.map((item, itemIndex) => {
            if (itemIndex == itemLen) {
              item[name] = value;
            }
            return item;
          });
        }
        return article;
      })
    );
  };

  return (
    <div className="p-10 border rounded-sm border-primary-50 my-9">
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
      <div className="flex flex-col items-center justify-center gap-3 mb-2 sm:flex-row">
        {/* <div className="flex">
          <IsComponent
            state={isImage}
            setState={setIsImage}
            onText="Добави снимка"
            offText="Премахни снимката"
          />
        </div> */}
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
        placeholder="Кат. номер"
        id="katNomer"
        value={itemData?.katNomer}
        onChange={changeHandler}
      />
      <Input
        type="text"
        placeholder="Цена"
        id="cena"
        value={itemData?.cena}
        onChange={changeHandler}
      />
      <div>
        <label htmlFor="colors">Типове</label>
        <textarea
          name="tipove"
          id="tipove"
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
