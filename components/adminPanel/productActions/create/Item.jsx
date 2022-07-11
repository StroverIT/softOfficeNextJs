import { useState } from "react";
import Input from "../../../form/AccInput";

function Item({ articleState }) {
  const [isColors, setIsColors] = useState(false);
  const [isImage, setIsImage] = useState(false);

  return (
    <div className="border border-gray my-9 py-5 px-2 rounded-sm">
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-2">
        <div className="flex">
          <button
            onClick={() => setIsImage(!isImage)}
            className="text-semibold border border-green py-1 px-5 text-green rounded-full hover:-translate-y-1 transition-transform"
          >
            Добави Снимка
          </button>
        </div>
        <div className="flex">
          <button
            onClick={() => setIsColors(!isColors)}
            className="text-semibold border border-green py-1 px-5 text-green rounded-full hover:-translate-y-1 transition-transform"
          >
            Добави цвят
          </button>
        </div>
      </div>

      <Input
        type="text"
        placeholder="КатНомер"
        id={`[${articleState.length}][katNomer]`}
      />
      <Input
        type="text"
        placeholder="Цена"
        id={`[${articleState.length}][price]`}
      />
      <div>
        <label htmlFor="types">Типове</label>
        <textarea
          name="types"
          id="types"
          className="w-full min-h-20 bg-primary-0 text-dark font-semibold text-lg p-2 pl-5"
        ></textarea>
      </div>
      {isColors && (
        <div>
          <label htmlFor="colors">Цветове</label>
          <textarea
            name="colors"
            id="colors"
            className="w-full min-h-20 bg-primary-0 text-dark font-semibold text-lg p-2 pl-5"
          ></textarea>
        </div>
      )}
      {isImage && <Input type="file" placeholder="Снимка" id="imageUrl" />}
    </div>
  );
}

export default Item;
