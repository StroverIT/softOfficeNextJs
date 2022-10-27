import React, { useContext, useState } from "react";

// Components
import Input from "../getAll/Input";
import Item from "./Item";

// NextJs
import Image from "next/image";

// Icons
import { AiOutlinePlusCircle } from "react-icons/ai";
import { HiX } from "react-icons/hi";

//COntexts
import { InputContext } from "./Context";

export default function Article({ sectionName, sectionId, subsection, img }) {
  const { setMenuImgData } = useContext(InputContext);

  const [isForm, setIsForm] = useState(false);
  const [itemsToAdd, setItemsToAdd] = useState([]);

  const addItemsHandler = () => {
    setItemsToAdd((prevState) => [
      ...prevState,
      { cena: "", katNomer: "", tipove: "" },
    ]);
  };
  const itemChangeHandler = (index, e) => {
    const changedArr = itemsToAdd.map((item, itemIdx) => {
      if (itemIdx == index) {
        return { ...item, [e.target.name]: e.target.value };
      }
      return item;
    });
    setItemsToAdd(changedArr);
  };
  const itemRemoveHandler = (index, e) => {
    const changedArr = itemsToAdd.filter((item, itemIdx) => itemIdx != index);
    setItemsToAdd(changedArr);
  };
  const itemFetchHandler = async () => {
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        data: itemsToAdd,
        section: { name: sectionName },
        subsection: { id: subsection._id },
      }),
    };
    const res = await fetch("/api/products/addItems", options);
    const data = await res.json();
    console.log(res, data);
  };
  return (
    <section
      className="w-full p-5 my-2 border border-primary-300"
      key={subsection._id}
    >
      <div className="flex items-center">
        Снимка:
        <div className="relative ml-2 w-28 h-28">
          <Image layout="fill" src={`/uploads/${img}`} alt={img} />
        </div>
        <button
          onClick={() => {
            setMenuImgData({
              articleId: subsection._id,
              imgUrl: img,
              sectionId: sectionId,
            });
          }}
          className="px-5 py-1 ml-auto text-sm text-white border cursor-pointer bg-primary-100 hover:bg-transparent hover:text-primary-100 border-primary-100"
        >
          Редактирай/Сложи
          <span className="pl-1 font-bold uppercase">снимка</span>
        </button>
      </div>
      <div>Типът: {subsection.tiput}</div>
      <div>Името което се показва: {subsection.nameToDisplay}</div>
      <div>Описание: {subsection.opisanie}</div>
      <div>
        {subsection.items.map((item, index) => {
          return (
            <Item
              key={item?._id + index}
              item={item}
              articleId={subsection._id}
              sectionId={sectionId}
              img={img}
            />
          );
        })}
        {itemsToAdd.map((item, index) => {
          return (
            <div
              key={index * 2 - 1 + 2}
              className="px-5 py-4 border border-green"
            >
              <div className="flex justify-end select-none">
                <div
                  className="text-xl cursor-pointer text-secondary"
                  onClick={itemRemoveHandler.bind({}, index)}
                >
                  <HiX />
                </div>
              </div>
              <Input
                id="cena"
                text="Цена"
                holder="Цена"
                value={item.cena}
                handler={itemChangeHandler.bind({}, index)}
              />
              <Input
                id="katNomer"
                text="Кат. номер"
                holder="Кат. номер"
                value={item.katNomer}
                handler={itemChangeHandler.bind({}, index)}
              />
              <label htmlFor="types">Типове</label>
              <textarea
                name="tipove"
                id="tipove"
                value={item.tipove}
                className="w-full p-2 pl-5 text-lg font-semibold min-h-20 bg-primary-0 text-dark"
                onChange={itemChangeHandler.bind({}, index)}
              ></textarea>
            </div>
          );
        })}
        <div
          className="flex items-center justify-center my-5 text-3xl cursor-pointer select-none text-orange"
          onClick={addItemsHandler}
        >
          <AiOutlinePlusCircle />
          <span className="pl-1 text-sm">Добави артикули</span>
        </div>
        {itemsToAdd.length > 0 && (
          <div
            className="flex my-8 cursor-pointer select-none "
            onClick={itemFetchHandler}
          >
            <button className="px-5 py-1 text-white border bg-green hover:bg-transparent hover:text-green border-green">
              Изпрати заявка за добавяне
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
