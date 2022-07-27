import React, { useContext, useState } from "react";
import Input from "./Input";
import Edit from "./Edit";
import { InputContext } from "./Context";

export default function Item({ item, itemLen, articleLen }) {
  const { inputs, setInputs } = useContext(InputContext);

  const [isForm, setIsForm] = useState(false);

  const changeHandler = (e) => {
    const name = e.target.name;
    let value = e.target.value;

    setInputs((prevState) => ({
      ...prevState,
      articles: inputs.articles.map((article, index) => {
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
    <div key={item._id} className="relative border border-gray-200 md:p-5">
      {!isForm && (
        <>
          <div>Тежест: {item.weight}</div>
          <div>Цена: {item.price}</div>
        </>
      )}
      {isForm && (
        <div className="flex flex-wrap flex-col ">
          <Input
            id="weight"
            text="Тежест"
            holder="Тежест"
            value={item.weight}
            handler={changeHandler}
          />
          <Input
            id="price"
            text="Цена"
            holder="Цена"
            value={item.price}
            handler={changeHandler}
          />
        </div>
      )}
      <div className="absolute top-1/2 right-5 -translate-y-1/2">
        <Edit
          clickHandler={() => setIsForm(!isForm)}
          theme={!isForm ? "green" : "red"}
          text={!isForm ? "Редактирай" : "Откажи"}
          size="xs"
        />
      </div>
    </div>
  );
}
