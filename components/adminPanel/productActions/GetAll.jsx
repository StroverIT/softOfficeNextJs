// React things
import React, { useState, useEffect } from "react";
import { InputContext } from "./getAll/Context";
import { ArticleContext } from "./adding/Context";

// NextJs
import Image from "next/image";

// Components
import Edit from "./getAll/Edit";
import Article from "./getAll/Article";
import Input from "./getAll/Input";
import ArticleCreate from "./adding/Article";

// Notifications
import {
  toastPromise,
  toastSuccess,
  toastError,
  toastHideAll,
} from "../../notificataions/Toast";

// Fetches
import { edit } from "../../../services/productServiceFetch";
import { AiOutlinePlusCircle } from "react-icons/ai";

// Icons

export default function GetAll({ product, setMenuImgData }) {
  const [stroverInputs, setStroverInputs] = useState([])
  const [inputs, setInputs] = useState(null);
  const [productMenu, setProductMenu] = useState(false);
  const [isForm, setIsForm] = useState(false);
  const [openImgMenu, setOpenImgMenu] = useState(false);

  const [articles, setArticles] = useState([]);

  const changeHandler = (e, oldInput,text) => {
    const name = e.target.name;
    let value = e.target.value;
    
    const addInputData ={
      oldArticle:{
        oldInput,
        text,
      },
      newArticle: {
        section: product.nameToDisplay,
        subsection: null,
        name,
        value 
      }
    }
    if(stroverInputs.length == 0 ){
      setStroverInputs([addInputData])
    }else{
      const isLargeNumber = (element) => element.oldArticle.oldInput == oldInput;
      const foundIndex = stroverInputs.findIndex(isLargeNumber)
      if(foundIndex == -1){
        setStroverInputs(prevState=>[...prevState,addInputData])
      }else{
        setStroverInputs(stroverInputs.map((input, inputIdx)=>{
          if(inputIdx == foundIndex){
            return {
              ...input, newArticle: {
                ...input.newArticle, 
                value
              }
            }
          }else return input
  
        }))
      }
       
    }


    setInputs((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  useEffect(()=>{
    console.log(stroverInputs);
  },[stroverInputs])
  useEffect(()=>{
    const newProductRef = JSON.parse(JSON.stringify(product))
    setInputs(newProductRef)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  const submitHandler = async (e) => {
    toastPromise("Изпраща се...");

    const data = await edit({ data: inputs, productId: product._id, stroverData: stroverInputs});
    
    toastHideAll();
    if (data?.error) {
      toastError(data?.error);
    }
    if (data?.message) {
      toastSuccess(data?.message);
      
    }
    setStroverInputs([])
  };

  const addArticle = () => {
    setArticles((prevState) => [
      ...prevState,
      { items: [], tiput: "", opisanie: "", nameToDisplay: "" },
    ]);
  };
  const submitArticleHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("sectionId", product._id);
    // formData.append("subsection", JSON.stringify(articles));

    const subsection = articles.map((article, index) => {
      // Object.entries(article).forEach((onlyArt) => {
      //   console.log(onlyArt);
      // });
      formData.append("article", article.imageUrl);
      article.imageUrl = article.imageUrl.name;
      return article;
    });
    const options = {
      method: "POST",
      body: formData,
    };
    const res = await fetch("/api/products/addArticles", options);
    const data = await res.json();
  };
  return (
    <InputContext.Provider value={{ inputs, setInputs, setMenuImgData }}>
      <section className="p-2 mb-10 shadow-xl rounded-md md:p-5">
        <section className="relative mb-5">
          {!isForm && (
            <>
             
                <div>Име: {product.name}</div>
                <div>Името което се показва: {product.nameToDisplay}</div>

               
        </>
          )}
      
        {productMenu && stroverInputs.length > 0 &&   <div className="sticky flex items-center justify-center top-24 z-20 ">
                <button
                  className="py-1 text-lg font-semibold text-white border bg-green hover:text-green hover:bg-transparent border-green px-14 shadow-2xl rounded-md transition-all"
                  onClick={submitHandler}
                >
                  Изпрати
                </button>
              </div>}
          {isForm && (
            <div className="relative flex  flex-col gap-y-5">
             
              <Input
                id="name"
                text="Секция"
                holder="Име"
                value={inputs.name}
                handler={(e)=>changeHandler(e, product.name, "Секция" )}
              />
              <Input
                id="nameToDisplay"
                text="Името което се показва"
                holder="Име"
                value={inputs.nameToDisplay}
                handler={(e)=>changeHandler(e, product.nameToDisplay, "Името което се показва" )}
              />

             
            </div>
          )}
          <div className="absolute top-0 right-0 flex flex-col items-end justify-end space-y-2 z-30">Ф
          <div >
              <Edit
                clickHandler={() => setProductMenu(!productMenu)}
                theme={!productMenu ? "green" : "red"}
                text={!productMenu ? "Покажи продуктите" : "Скрий продуктите"}
              />
            </div>
          <div> 
              {productMenu && <Edit
                clickHandler={() => setIsForm(!isForm)}
                theme={!isForm ? "blueLight" : "red"}
                text={!isForm ? "Редактирай Секцията" : "Откажи Редакцията"}
              />}
            </div>
           
          </div>
          {productMenu && (
                  <div className="p-5 mt-14 mb-4 ">
                    <h1 className="text-lg font-bold text-center text-primary-500">
                      Продукти:
                    </h1>
                    <div className="flex flex-wrap items-center p-2 my-2 ">
                      {JSON.parse(JSON.stringify(product)).subsection.map((subsection,subIndex) => {
                        let img = "nqma";
                        if (subsection.img) {
                          img =
                            subsection?.img?.originalname ||
                            subsection?.img[0]?.originalname;
                        }
                        return (
                          <Article
                            key={subsection._id}
                            sectionName={product.name}
                            sectionDisplay={product.nameToDisplay}
                            sectionId={product._id}
                            subIndex={subIndex}
                            subsection={subsection}
                            img={img}
                            inputs={inputs} setInputs={setInputs}
                            stroverInputs={stroverInputs}
                            setStroverInputs={setStroverInputs}
                          />
                        );
                      })}

                      <ArticleContext.Provider
                        value={{ articles, setArticles }}
                      >
                        {articles.map((article, index) => {
                          return (
                            <ArticleCreate
                              key={index}
                              articleLen={index}
                              articleData={article}
                            />
                          );
                        })}
                      </ArticleContext.Provider>
                      <div
                        className="flex items-center justify-center w-full my-5 text-3xl cursor-pointer select-none text-primary-trans"
                        onClick={addArticle}
                      >
                        <AiOutlinePlusCircle />
                        <span className="pl-1 text-2xl">Добави артикули</span>
                      </div>
                      {articles.length > 0 && (
                        <div className="">
                          <button
                            type="button"
                            onClick={submitArticleHandler}
                            className="flex justify-center py-2 mx-auto font-medium text-white rounded-md bg-green px-14 "
                          >
                            Изпрати заявка
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                )}

        </section>
      </section>
    </InputContext.Provider>
  );
}
