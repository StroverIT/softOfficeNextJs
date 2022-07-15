import React, { useEffect, useState, userId } from "react";

// Components
import Input from "../../form/AccInput";
import OutlinedBtn from "../../buttons/Outlined";
import Article from "./create/Article";

// Fetching
import { create } from "../fetchActions";
import { ProductContext } from "./productContext";
// NextJs
import { useRouter } from "next/router";
// Icons
import { BsArrowReturnLeft } from "react-icons/bs";
export default function Create() {
  const router = useRouter();

  const [sectionState, setSectionState] = useState({
    articles: [],
  });

  const addArticle = (e) => {
    setSectionState((prevState) => ({
      ...prevState,
      articles: [
        ...prevState.articles,
        { items: [], articleName: "", description: "" },
      ],
    }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    Object.entries(sectionState).forEach((section) => {
      let [key, value] = section;

      // If is article
      if (Array.isArray(value)) {
        // Map through the article
        let article = value.map((article) => {
          // If image append to formData as file
          if (article.imageUrl) {
            formData.append("article", article.imageUrl);
            article.imageUrl = article.imageUrl?.name;
          }
          article.items = article.items.map((item) => {
            if (item.imageUrl) {
              formData.append("item", item.imageUrl);
              item.imageUrl = item.imageUrl?.name;
            }
            return item;
          });
          return article;
        });
        value = JSON.stringify(article);
      }
      if (key.includes("image")) {
        formData.append("media", value);
        value = value?.name;
        return;
      }

      formData.append(key, value);
    });

    const res = await create(formData);
    const data = await res.json();
    console.log(data);
    //-------
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
    <div className="mt-5">
      <div>
        <button
          className="text-2xl text-primary-lighter my-5"
          onClick={() => router.push("/adminPanel#prodykti")}
        >
          <BsArrowReturnLeft />
        </button>
      </div>
      <div>
        <ProductContext.Provider
          value={{
            sectionState,
            setSectionState,
          }}
        >
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
            {sectionState.articles &&
              sectionState.articles.map((article, index) => {
                return (
                  <Article
                    key={index}
                    articleData={article}
                    articleLen={index}
                  />
                );
              })}
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
