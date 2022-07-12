import React, { useEffect, useState, userId } from "react";

import { v4 as uuidv4 } from "uuid";
// Components
import Input from "../../form/AccInput";
import OutlinedBtn from "../../buttons/Outlined";
import Article from "./create/Article";

import { create } from "../fetchActions";
import { ProductContext } from "./productContext";

export default function Create() {
  const [articles, setArticles] = useState([]);

  const [sectionState, setSectionState] = useState({
    secLen: 0,
    articles: [],
  });

  const addArticle = (e) => {
    const keyProduct = uuidv4();
    const initVal = {};
    setArticles((lastItems) => [
      ...lastItems,
      <Article key={keyProduct} articleLen={sectionState.secLen} />,
    ]);
    setSectionState((prevState) => ({
      ...prevState,
      secLen: sectionState.secLen + 1,
      articles: [...prevState.articles, initVal],
    }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const res = await create(sectionState);
    const data = await res.json();
    console.log(res, data);
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
        <button>
          Nqkude {sectionState.secLen} {sectionState.articles?.length}
        </button>
      </div>
      <div>
        <ProductContext.Provider value={{ sectionState, setSectionState }}>
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
        </ProductContext.Provider>
      </div>
    </div>
  );
}
