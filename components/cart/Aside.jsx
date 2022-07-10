import React, { useEffect, useState, useRef } from "react";

// Components
import Price from "../priceStyling/Pricing";
import BtnOutlined from "../buttons/Outlined";
import Input from "./AsideInput";

function Aside({ subtotal, total }) {
  const addInfo = useRef(null);
  const [isHidd, setHidd] = useState(true);
  const [hidText, setHidText] = useState("Добави адрес");

  useEffect(() => {
    if (!isHidd) {
      setHidText("Отмяна");
    } else {
      setHidText("Добави адрес");
    }
  }, [isHidd]);
  return (
    <aside className="border-[10px] border-gray-100 p-5">
      <section className="flex items-center justify-between border-b b-[#e4e7e6] py-2">
        <div className="font-semibold uppercase ">Междинна сума:</div>
        <div>
          <Price size="2xl" price={200} priceDec={20} />
        </div>
      </section>
      <section className="border-b b-[#e4e7e6] py-5">
        <section className="flex items-center justify-between ">
          <div className="font-semibold uppercase ">Доставка:</div>
          <button
            type="button"
            className="text-sm underline cursor-pointer text-gray-250"
            onClick={() => setHidd(!isHidd)}
          >
            {hidText}
          </button>
        </section>
        <section className={isHidd ? "hidden" : ""} ref={addInfo}>
          <form action="">
            <section className="container w-full mt-3">
              <Input id="name" type="text" text="Име" holder="Иван Иванов" />
              <Input
                id="telNumber"
                type="number"
                text="Телефон"
                holder="087 123 4561"
              />
              <Input id="city" type="text" text="Град" holder="София" />
              <Input
                id="poshtenskiKod"
                type="text"
                text="Пощенски код"
                holder="1584"
              />
              <div className="flex flex-col justify-between ">
                <div className="flex items-center mb-1">
                  <label
                    htmlFor="address"
                    className="font-medium text-dark-400"
                  >
                    Адрес
                  </label>
                </div>
                <textarea
                  id="address"
                  type="text"
                  text="Адрес"
                  placeholder="РУМ Дружба 2 срещу блок 205"
                  className="px-3 py-1 text-sm leading-tight text-gray-700 border rounded shadow appearance-none resize-none focus:outline-none focus:shadow-outline placeholder:text-gray-200"
                  cols="22"
                  rows="2"
                ></textarea>
              </div>
            </section>

            <div className="mt-2 ">
              <div className="mb-2">
                <label htmlFor="moreInfo" className="font-medium text-dark-400">
                  Коментар
                </label>
              </div>
              <textarea
                name="moreInfo"
                id="moreInfo"
                cols="10"
                rows="2"
                className="w-full p-3 px-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none resize-none focus:outline-none focus:shadow-outline placeholder:text-gray-200"
              ></textarea>
            </div>
            <div className="flex justify-center mt-2">
              <button
                type="button"
                className="w-full py-2 text-sm font-medium text-white uppercase transition-colors duration-300 border px-14 bg-dark hover:bg-transparent hover:text-dark border-dark"
              >
                ОЦЕНКА НА ДОСТАВКАТА
              </button>
            </div>
          </form>
        </section>
      </section>
      <section className="flex items-center justify-between py-2 mb-2">
        <div className="font-semibold uppercase ">Обща цена:</div>
        <div>
          <Price size="3xl" price={200} priceDec={20} />
        </div>
      </section>
      <div className="flex justify-center">
        <BtnOutlined type="button" text="завърши" />
      </div>
    </aside>
  );
}
export default Aside;
