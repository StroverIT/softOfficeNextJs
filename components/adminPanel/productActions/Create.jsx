import React, { useState } from "react";

// Components
import Input from "../../form/AccInput";
import OutlinedBtn from "../../buttons/Outlined";
import Article from "./create/Article";

// Fetching
import { create } from "../fetchActions";
import { ProductContext } from "./ProductContext";
// NextJs
import { useRouter } from "next/router";
// Icons
import { BsArrowReturnLeft } from "react-icons/bs";
export default function Create() {
  const router = useRouter();

  const [sectionState, setSectionState] = useState({
    name: "",
    nameToDisplay: "",
    subsection: [],
  });

  const addArticle = (e) => {
    setSectionState((prevState) => ({
      ...prevState,
      subsection: [
        ...prevState.subsection,
        { items: [], tiput: "", opisanie: "", nameToDisplay: "" },
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
            console.log(article.imageUrl);
            formData.append("article", article.imageUrl);
            article.imageUrl = article.imageUrl?.name;
          }
          article.items = article.items.map((item) => {
            if (item.img) {
              formData.append("item", item.img);
              item.img = item.img?.originalname;
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
    console.log(res, data);
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
          className="my-5 text-2xl text-primary-lighter"
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
              placeholder="name - за намирането на продукта"
              id="name"
              value={sectionState.name}
              onChange={changeHandler}
            />
            <Input
              type="text"
              placeholder="nameToDisplay - името което ще се показва"
              id="nameToDisplay"
              onChange={changeHandler}
            />
            {/* <Input
              type="file"
              placeholder="Снимка"
              id="imageUrl"
              onChange={changeHandler}
            /> */}
            {sectionState.subsection &&
              sectionState.subsection.map((article, index) => {
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
