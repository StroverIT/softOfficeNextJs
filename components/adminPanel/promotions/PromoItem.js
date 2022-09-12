import React, { useState } from "react";

import Image from "next/image";
import { useRouter } from "next/router";
// Components
import IsComponent from "../productActions/create/IsComponent";
import Input from "../../form/AccInput";

const PromoItem = ({ promo }) => {
  const router = useRouter();

  const product = promo.product;
  const name = `${product.section.nameToDisplay} ${product.subsection.nameToDisplay}`;

  const [inputs, setInputs] = useState({
    cena: product.item.cena,
    promotionalPrice: product.item.promotionalPrice,
  });
  const [edit, setEdit] = useState(false);
  const changeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setInputs((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const submitHandler = async () => {
    const sendData = {
      inputs,
      itemId: product.item._id,
      sectionName: product.section.name,
      subsectionId: product.subsection._id,
    };
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(sendData),
    };
    const res = await fetch("/api/promotions/edit", options);
    const data = await res.json();
    console.log(data);
  };
  const deleteItemHandler = async () => {
    const sendData = {
      inputs,
      itemId: product.item._id,
      sectionName: product.section.name,
      subsectionId: product.subsection._id,
    };
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(sendData),
    };
    const res = await fetch("/api/promotions/delete", options);
    const data = await res.json();
    console.log(data);
    router.reload(window.location.pathname);
  };
  return (
    <section key={promo._id} className="p-10 border rounded-3xl border-primary">
      {/* Buttons */}

      <section className="flex flex-col justify-center mb-4 gap-y-4">
        <IsComponent
          state={edit}
          setState={setEdit}
          onText="Редактирай"
          offText="Откажи"
        />
        <button
          onClick={deleteItemHandler}
          className="w-full py-2 text-white border rounded-full bg-secondary hover:bg-transparent hover:text-secondary border-secondary"
        >
          Изтрий
        </button>
      </section>
      {!edit && (
        <>
          <div className="relative w-28 h-28">
            <Image
              layout="fill"
              src={`/uploads/${product.subsection.imgUrl}`}
              alt={product.subsection.imgUrl}
            />
          </div>
          <div className="text-lg font-semibold">{name}</div>
          <div>
            <ul className="text-sm">
              {product.item.tipove.split(";").map((type) => {
                return <li key={type}>{type}</li>;
              })}
            </ul>
          </div>
          <div className="mt-1">
            <div>
              Стара цена:
              <span className="pl-1">{product.item.cena}</span>
            </div>
            <div>
              Промо цена:
              <span className="pl-1">{product.item.promotionalPrice}</span>
            </div>
          </div>
        </>
      )}
      {edit && (
        <div>
          <Input
            type="text"
            id="cena"
            text="Цена"
            placeholder="Цена"
            value={inputs.cena}
            onChange={changeHandler}
          />
          <Input
            type="text"
            id="promotionalPrice"
            text="Промо цена"
            placeholder="Промо цена"
            value={inputs.promotionalPrice}
            onChange={changeHandler}
          />
          <button
            onClick={submitHandler}
            className="w-full py-2 text-white border bg-primary-100 border-primary-100 hover:bg-transparent hover:text-primary-100"
          >
            Изпрати
          </button>
        </div>
      )}
    </section>
  );
};

export default PromoItem;
