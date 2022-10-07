<<<<<<< HEAD
import React, { useState } from "react";
=======
import React from "react";
>>>>>>> d26f7cda55573513073816b1ede2bc730122a61e

// Styles
import style from "../../styles/account/myFavourites.module.css";

// Components
import { Card } from "./Card";

export default function MyFavourites({ favData }) {
<<<<<<< HEAD
  const [favState, setFavState] = useState(favData);
  return (
    <section className="pb-2">
      <h2 className="mt-5 mb-2 text-3xl font-semibold text-center">
        Любими продукти
      </h2>
      {favState.length == 0 && (
        <div className="pb-10 text-center text-secondary">
=======
  return (
    <section className="pb-2">
      <h2 className="mb-2 text-3xl font-semibold text-center mt-5">
        Любими продукти
      </h2>
      {favData.length == 0 && (
        <div className="text-center text-secondary pb-10">
>>>>>>> d26f7cda55573513073816b1ede2bc730122a61e
          Нямате сложени любими продукти
        </div>
      )}
      <section
        className={` flex-wrap gap-5 justify-center grid ${style.itemsContainer}`}
      >
<<<<<<< HEAD
        {favState.map((data) => {
          return (
            <Card key={data._id} itemData={data} setFavState={setFavState} />
          );
=======
        {favData.map((data) => {
          return <Card key={data._id} itemData={data} />;
>>>>>>> d26f7cda55573513073816b1ede2bc730122a61e
        })}
      </section>
    </section>
  );
}
