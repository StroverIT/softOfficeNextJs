import React, { useState } from "react";

import Input from "../../../form/AccInput";

import Item from "./Item";

function Article({ articleState }) {
  const [items, setItems] = useState([]);
  const addItem = (e) => {
    setItems((lastItems) => [
      ...lastItems,
      <Item key={items.length} articleState={articleState} />,
    ]);
  };
  return (
    <div className="border border-gray my-9 py-5 px-2 rounded-sm">
      <Input
        type="text"
        placeholder="Име на артикула"
        id={`[${articleState.length}][articleName]`}
      />
      <Input
        type="text"
        placeholder="Описание"
        id={`[${articleState.length}][description]`}
      />
      {items}
      <button
        type="button"
        onClick={() => addItem()}
        className="flex  justify-center mx-auto bg-primary-lighter py-2 px-10 text-white rounded-md font-medium text-sm"
      >
        Добави тип
      </button>
    </div>
  );
}

export default Article;
