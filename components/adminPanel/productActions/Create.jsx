import React, { useEffect, useState } from "react";

import Input from "../../form/AccInput";
import OutlinedBtn from "../../buttons/Outlined";
import Article from "./create/Article";

export default function Create() {
  const articlesObj = {
    length: 0,
    items: {
      length: 0,
    },
  };
  const [articleState, setArticleState] = useState(articlesObj);

  const [articles, setArticles] = useState([]);

  const addArticle = (e) => {
    setArticles((lastItems) => [
      ...lastItems,
      <Article key={articles.length} articleState={articleState} />,
    ]);
    setArticleState((prevState) => ({
      ...prevState,
      length: articlesObj.length + 1,
    }));
  };

  const createHandler = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const userData = Object.fromEntries(formData);
    console.log(userData);
  };
  return (
    <div>
      <div>
        <button>Nqkude</button>
      </div>
      <div>
        <form onSubmit={createHandler}>
          <Input type="text" placeholder="Секция" id="section" />
          <Input type="file" placeholder="Снимка" id="imageUrl" />
          {articles}
          <div className="">
            <button
              type="button"
              onClick={() => addArticle()}
              className="flex  justify-center mx-auto bg-orange  py-2 px-14 text-white rounded-md font-medium "
            >
              Добави артикул
            </button>
          </div>
          <OutlinedBtn
            type="submit"
            text="Създай"
            custom="bg-green border-green hover:text-green rounded-md md:w-1/4 my-5 transition-colors"
          />
        </form>
      </div>
    </div>
  );
}
