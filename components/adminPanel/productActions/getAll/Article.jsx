import React, { useContext, useState } from "react";
import Input from "./Input";
import Edit from "./Edit";
import Item from "./Item";

import { InputContext } from "./Context";

export default function Article({ article, articleLen }) {
  const { inputs, setInputs } = useContext(InputContext);

  const [isForm, setIsForm] = useState(false);

  const changeHandler = (e) => {
    const name = e.target.name;
    let value = e.target.value;

    setInputs((prevState) => ({
      ...prevState,
      articles: inputs.articles.map((article, index) => {
        if (articleLen == index) {
          return { ...article, [name]: value };
        }
        return article;
      }),
    }));
  };
  return (
    <ul className="mb-4 relative">
      {!isForm && (
        <li className="mb-4 font-semibold">
          Име на артикула:{" "}
          <span className="text-primary">{article.articleName}</span>
        </li>
      )}
      {isForm && (
        <li className="flex  flex-wrap">
          <Input
            id="articleName"
            text="Име на артикула"
            holder="Име на артикула"
            value={article.articleName}
            handler={changeHandler}
          />
        </li>
      )}
      <div className="absolute top-0 right-0">
        <Edit
          clickHandler={() => setIsForm(!isForm)}
          theme={!isForm ? "blueLight" : "red"}
          text={!isForm ? "Редактирай" : "Откажи"}
        />
      </div>
      <li>
        {article?.items?.map((item, index) => {
          return (
            <Item
              key={item.weight + index}
              item={item}
              itemLen={index}
              articleLen={articleLen}
            />
          );
        })}
      </li>
    </ul>
  );
}
