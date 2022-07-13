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
    setArticles((lastItems) => [
      ...lastItems,
      <Article key={keyProduct} articleLen={sectionState.secLen} />,
    ]);
    setSectionState((prevState) => ({
      ...prevState,
      secLen: sectionState.secLen + 1,
      articles: [...prevState.articles, {}],
    }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    for (let key in sectionState) {
      let value = sectionState[key];
      if (key.includes("image")) {
        key = "media";
      } else if (typeof value === "object" && !key.includes("image")) {
        value = JSON.stringify(value);
      }
      formData.append(key, value);
    }
    const media = formData.get("media");
    const res = await create(formData);
    const data = await res.json();
  };
  const changeHandler = (e) => {
    const name = e.target.name;
    let value = e.target.value;
    if (name.includes("image")) {
      value = e.target.files[0];
    }
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
