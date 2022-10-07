import { useContext, useState, useEffect } from "react";
import { HiX } from "react-icons/hi";
import Input from "../../../form/AccInput";
import { ProductContext } from "../ProductContext";

import IsComponent from "./IsComponent";

function Item({ itemLen, articleLen, itemData }) {
  const { sectionState, setSectionState } = useContext(ProductContext);

  const [itemState, setItemState] = useState({});

  const [isColors, setIsColors] = useState(false);
  const [isImage, setIsImage] = useState(false);

  const removeItem = (e) => {
<<<<<<< HEAD
    const itemRem = sectionState.subsection.map((article, index) => {
=======
    const itemRem = sectionState.articles.map((article, index) => {
>>>>>>> d26f7cda55573513073816b1ede2bc730122a61e
      if (index == articleLen) {
        article.items = article.items.filter((item, itemInd) => {
          return itemInd != itemLen;
        });
      }
      return article;
    });
    setSectionState((prevState) => ({
      ...prevState,
<<<<<<< HEAD
      subsection: itemRem,
=======
      articles: itemRem,
>>>>>>> d26f7cda55573513073816b1ede2bc730122a61e
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
<<<<<<< HEAD
      subsection: sectionState.subsection.map((article, index) => {
=======
      articles: sectionState.articles.map((article, index) => {
>>>>>>> d26f7cda55573513073816b1ede2bc730122a61e
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
<<<<<<< HEAD
    <div className=" border rounded-sm border-primary-50 my-9 p-10">
=======
    <div className="px-2 py-5 border rounded-sm border-gray my-9">
>>>>>>> d26f7cda55573513073816b1ede2bc730122a61e
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
<<<<<<< HEAD
        {/* <div className="flex">
=======
        <div className="flex">
          {/* Button is here */}
>>>>>>> d26f7cda55573513073816b1ede2bc730122a61e
          <IsComponent
            state={isImage}
            setState={setIsImage}
            onText="Добави снимка"
            offText="Премахни снимката"
          />
<<<<<<< HEAD
        </div> */}
=======
        </div>
>>>>>>> d26f7cda55573513073816b1ede2bc730122a61e
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
<<<<<<< HEAD
        id="cena"
        value={itemData?.cena}
        onChange={changeHandler}
      />
      <div>
        <label htmlFor="colors">Типове</label>
        <textarea
          name="tipove"
          id="tipove"
=======
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
>>>>>>> d26f7cda55573513073816b1ede2bc730122a61e
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
