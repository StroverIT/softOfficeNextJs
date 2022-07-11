import { useState } from "react";
import Input from "../../../form/AccInput";

function Item({}) {
  const [neshtoState, setNeshtoState] = useState({});
  const [isColors, setIsColors] = useState(false);
  const [isImage, setIsImage] = useState(false);

  const changeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setNeshtoState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  return (
    <div className="px-2 py-5 border rounded-sm border-gray my-9">
      <div className="flex flex-col items-center justify-center gap-3 mb-2 sm:flex-row">
        <div className="flex">
          <button
            onClick={() => setIsImage(!isImage)}
            className="px-5 py-1 transition-transform border rounded-full text-semibold border-green text-green hover:-translate-y-1"
          >
            Добави Снимка
          </button>
        </div>
        <div className="flex">
          <button
            onClick={() => setIsColors(!isColors)}
            className="px-5 py-1 transition-transform border rounded-full text-semibold border-green text-green hover:-translate-y-1"
          >
            Добави цвят
          </button>
        </div>
      </div>

      <Input
        type="text"
        placeholder="КатНомер"
        id="katNomer"
        onChange={changeHandler}
      />
      <Input
        type="text"
        placeholder="Цена"
        id="price"
        onChange={changeHandler}
      />
      <div>
        <label htmlFor="types">Типове</label>
        <textarea
          name="types"
          id="types"
          className="w-full p-2 pl-5 text-lg font-semibold min-h-20 bg-primary-0 text-dark"
        ></textarea>
      </div>
      {isColors && (
        <div>
          <label htmlFor="colors">Цветове</label>
          <textarea
            name="colors"
            id="colors"
            className="w-full p-2 pl-5 text-lg font-semibold min-h-20 bg-primary-0 text-dark"
            onChange={changeHandler}
          ></textarea>
        </div>
      )}
      {isImage && <Input type="file" placeholder="Снимка" id="imageUrl" />}
    </div>
  );
}

export default Item;
