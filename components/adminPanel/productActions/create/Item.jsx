import { useContext, useState, useEffect } from "react";
import Input from "../../../form/AccInput";
import { ProductContext } from "../productContext";

function IsComponent({ state, setState, onText, offText }) {
  return (
    <button
      onClick={() => setState(!state)}
      className={`px-5 py-1 transition-transform border rounded-full text-semibold ${
        !state ? "border-green text-green" : "border-secondary text-secondary"
      } hover:-translate-y-1`}
    >
      {!state ? onText : offText}
    </button>
  );
}
function Item({ itemLen, articleLen }) {
  const { sectionState, setSectionState } = useContext(ProductContext);

  const [itemState, setItemState] = useState({});
  const [isColors, setIsColors] = useState(false);
  const [isImage, setIsImage] = useState(false);

  const changeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setItemState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  useEffect(() => {
    const articles = sectionState.articles.map((article, index) => {
      if (index == articleLen) {
        article.items = article.items.map((item, itemInd) => {
          if (itemInd == itemLen - 1) {
            return { ...item, ...itemState };
          }
          return item;
        });
      }
      return article;
    });
    setSectionState((prevState) => ({
      ...prevState,
      articles: [...articles],
    }));
  }, [itemState]);
  return (
    <div className="px-2 py-5 border rounded-sm border-gray my-9">
      <div className="flex flex-col items-center justify-center gap-3 mb-2 sm:flex-row">
        <div className="flex">
          {/* Button is here */}
          <IsComponent
            state={isImage}
            setState={setIsImage}
            onText="Добави снимка"
            offText="Премахни снимката"
          />
        </div>
        <div className="flex">
          <IsComponent
            state={isColors}
            setState={setIsColors}
            onText="Добави Цветовете"
            offText="Премахни Цветовете"
          />
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
