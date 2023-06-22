import React, { useContext, useState } from "react";

import { InputContext } from "./Context";
import Image from "next/image"
import ItemsEdit from "./ItemsEdit";
import Edit from "./Edit";
export default function Item({ item, articleId, sectionId, img,inputs,setInputs, itemIdx, subIndex, sectionDisplay,subDisplay, stroverInputs, setStroverInputs }) {

  const { setMenuImgData } = useContext(InputContext);
  const [isForm, setIsForm] = useState(false);

  const changeHandlerItem = (e, subLen, itemLen, oldInput, text, custom) => {
    // console.log( "currItem", item);
    const name = e.target.name;
    let value = e.target.value;
    const addInputData ={
      oldArticle:{
        oldInput,
        text,
      },
      newArticle: {
        section: sectionDisplay,
        subsection: subDisplay,
        katNomer: item.katNomer,
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
      subsection: prevState.subsection.map((subsection, index) => {
        // If is found the current array
        if (subLen == index) {
          subsection.items = subsection.items.map((item, itemIdx) => {
           
            if (itemIdx == itemLen) {
              if(custom){
                 return{...item, [custom.type]: {
                  ...item[custom.type], [custom.index]:{
                    ...item[custom.type][custom.index], [e.target.name]: parseFloat(e.target.value)
                  }
                }}
              }
              return { ...item, [name]: value };
            }
            return item;
          });
        }
        return subsection;
      }),
    }));
  };
  if(!item) return <div className="p-4 text-red">Грешка при показване на артикула </div>
  return (
    <section className="p-5 border border-green">
      {!isForm &&  <>
        <div>
          Цена:
          <span className="pl-1">{item?.cena && item.cena}</span>
        </div>
        <div>
          Катномер:
          <span className="pl-1">{item?.katNomer && item.katNomer}</span>
        </div>
        <div>
          Типове:
          <span className="pl-1">{item?.tipove && item.tipove}</span>
        </div>
        {item.quantityWithPrices.map((data,index) =>{
        return <div className="grid grid-cols-2" key={index}>
         <div
      >
        Количество: {data.quantity}
        </div>
        <div
      >
        Цена: {data.price}
        </div>
      </div>
      })}
        {item?.promotionalPrice && (
          <div>
            Промоционална цена:
            <span className="pl-1">
              {item?.promotionalPrice && item.promotionalPrice}
            </span>
          </div>
        )}
      </>}
      {item?.imageUrl && <div className="relative w-20 h-20"><Image src={`/uploads/${item.imageUrl}`} alt="image brat" layout="fill"/></div>}
      <div>
        <button
          onClick={() => {
            setMenuImgData({
              articleId: articleId,
              imgUrl: img,
              sectionId: sectionId,
              itemId: item._id,
            });
          }}
          className="px-5 py-1 ml-auto text-sm text-white border cursor-pointer bg-primary-100 hover:bg-transparent hover:text-primary-100 border-primary-100"
        >
          Редактирай/Сложи
          <span className="pl-1 font-bold uppercase">снимка</span>
        </button>
        <Edit
                clickHandler={() => setIsForm(!isForm)}
                theme={!isForm ? "blueLight" : "red"}
                text={!isForm ? "Редактирай Артикула" : "Откажи Редакцията"}
              />
      </div>
      {isForm &&
                        <ItemsEdit
                          key={itemIdx}
                          inputs={inputs}
                          subIndex={subIndex}
                          itemIdx={itemIdx}
                          currItem={item}
                          changeHandler={changeHandlerItem}
                        />
                      
                    }
    </section>
  );
}
