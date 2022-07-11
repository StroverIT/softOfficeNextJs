import React, { useEffect, useState } from "react";

import Input from "../../form/AccInput";
import OutlinedBtn from "../../buttons/Outlined";
import Article from "./create/Article";

import { create } from "../fetchActions";

export default function Create() {
  const [articles, setArticles] = useState([]);

  const articleStateObj = [];
  const [articlesState, setArticlesState] = useState(articleStateObj);
  const [sectionState, setSectionState] = useState({
    length: 0,
    articles: articleStateObj,
  });

  const addArticle = (e) => {
    setArticles((lastItems) => [
      ...lastItems,
      <Article
        key={sectionState.length}
        articleLength={sectionState.length}
        articlesState={articlesState}
        setArticlesState={setArticlesState}
      />,
    ]);
    setSectionState((prevState) => ({
      ...prevState,
      length: sectionState.length + 1,
    }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    console.log(articlesState, sectionState);
    // const res = await create(articleState);
    // const data = await res.json();
    // console.log(res, data);
  };
  const changeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setSectionState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div>
      <div>
        <button>Nqkude</button>
      </div>
      <div>
        <form onSubmit={submitHandler}>
          <Input
            type="text"
            placeholder="Секция"
            id="sectionName"
            value={sectionState.section}
            onChange={changeHandler}
          />
          <Input
            type="file"
            placeholder="Снимка"
            id="imageUrl"
            onChange={changeHandler}
          />
          {articles}
          <div className="">
            <button
              type="button"
              onClick={() => addArticle()}
              className="flex justify-center py-2 mx-auto font-medium text-white rounded-md bg-orange px-14 "
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
