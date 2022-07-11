import { useRef, useState, useEffect } from "react";
// NextJs
import Head from "next/head";
import Image from "next/image";
// Icons
import { HiX } from "react-icons/hi";
// Components
import Price from "../components/priceStyling/Pricing";
import QunityInput from "../components/base/QuanityInput";
import BtnOutlined from "../components/buttons/Outlined";

function TableData({ children, classes }) {
  return (
    <td className={`w-full lg:w-auto ${classes ? classes : ""}`}>{children}</td>
  );
}
function Input({ id, text, type, holder }) {
  return (
    <div className="flex flex-col justify-between mb-2 lg:mb-0 lg:flex-row">
      <div className="flex items-center ">
        <label htmlFor={id} className="font-medium text-dark-400">
          {text}
        </label>
      </div>
      <input
        type={type}
        id={id}
        name={id}
        className="px-3 py-2 my-1 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline placeholder:text-gray-200"
        placeholder={holder}
      />
    </div>
  );
}
// import styles from '../styles/Home.module.css'
export default function Cart() {
  const addInfo = useRef(null);
  const [isHidd, setHidd] = useState(true);
  const [hidText, setHidText] = useState("Добави адрес");

  const [mobVerCon, setMobVerCon] = useState(true);

  useEffect(() => {
    if (!isHidd) {
      setHidText("Отмяна");
    } else {
      setHidText("Добави адрес");
    }
  }, [isHidd]);
  return (
    <>
      <Head>
        <title>SoftOffice</title>
        <meta name="description" content="Онлайн магазин SoftOffice" />
      </Head>

      <main className="mb-auto ">
        <div className="container mt-5">
          <h3 className="my-5 text-3xl font-semibold uppercase">
            Твоята количка
          </h3>
          <div className={`xl:grid grid-cols-[70%30%] xl:space-x-4`}>
            <table className="w-full table-auto ">
              <thead className="bg-gray-100 text-gray-250">
                <tr className="hidden mb-1 lg:table-row ">
                  <th colSpan={2} className="py-3 text-left ">
                    Продукт
                  </th>
                  <th colSpan={1} className="px-5 py-3">
                    Цена
                  </th>
                  <th colSpan={1} className="px-5 py-3">
                    Количество
                  </th>
                  <th colSpan={1} className="px-5 py-3 text-left">
                    Общо
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-[#e4e7e6] flex flex-wrap lg:table-row justify-between items-center pb-3 mb-3">
                  <TableData>
                    <div className="flex items-center justify-center lg:justify-start">
                      <div className="relative w-full h-40 sm:w-2/3 sm:h-60 lg:h-32 lg:w-40 ">
                        <Image
                          layout="fill"
                          src="/images/testCarousel.jpg"
                          alt="just for testing"
                        />
                      </div>
                    </div>
                  </TableData>
                  <TableData classes="mt-3 sm:text-center lg:text-left xl:pl-2">
                    <h3 className="">
                      АКУМУЛАТОРЕН КОМПЛЕКТ EINHELL TE-TK 12 Li
                    </h3>
                    <ul className="mt-2 text-xs text-gray-250">
                      <li className="pb-1">
                        ИНСТРУМЕНТ 1 : АКУМУЛАТОРНА БОРМАШИНА
                      </li>
                      <li className="pb-1">
                        ИНСТРУМЕНТ 2 : МУЛТИФУНКЦИОНАЛНО УСТРОЙСТВО
                      </li>
                      <li className="pb-1">
                        ИНСТРУМЕНТ 3 : АКУМУЛАТОРЕН ФЕНЕР ТИП БАТЕРИЯ : Li-Ion
                      </li>
                      <li className="pb-1">НАПРЕЖЕНИЕ : 12.00 V</li>
                    </ul>
                  </TableData>

                  {/* MObile version */}
                  <td className="flex flex-col justify-center w-full mt-5 lg:hidden">
                    <div className="flex items-center justify-center my-1 ">
                      <div className="lg:px-3 flex flex-col sm:items-start sm:-mb-[3rem] sm:mx-auto sm:ml-2 w-full">
                        <div className="text-sm text-center text-gray-250 ">
                          Ед. цена
                        </div>
                        <Price priceDec={20} price={100} size="2xl" />
                      </div>

                      <div className="lg:px-3 flex flex-col sm:items-end sm:-mb-[3rem] sm:mx-auto sm:mr-2 w-full">
                        <div className="text-sm text-center text-gray-250 ">
                          Общо
                        </div>
                        <Price priceDec={48} price={200} size="2xl" />
                      </div>
                    </div>
                    <div>
                      <QunityInput contClass="w-1/2 mx-auto mt-2 lg:mt-10" />
                      <div className="flex items-center justify-center mt-2 ">
                        <button
                          type="button"
                          className="flex items-center justify-center cursor-pointer text-gray-darker"
                        >
                          <div className="mt-[0.25px]">
                            <HiX />
                          </div>
                          <div>Премахни</div>
                        </button>
                      </div>
                    </div>
                  </td>

                  {/* Large screen version */}
                  <TableData classes="lg:px-3 hidden lg:table-cell">
                    <Price priceDec={20} price={100} size="2xl" />
                  </TableData>
                  <TableData classes="hidden lg:table-cell">
                    <QunityInput contClass="w-1/2 mx-auto mt-2 lg:mt-10" />
                    <div className="flex items-center justify-center mt-2">
                      <button
                        type="button"
                        className="flex items-center justify-center cursor-pointer text-gray-darker"
                      >
                        <div className="mt-[0.25px]">
                          <HiX />
                        </div>
                        <div>Премахни</div>
                      </button>
                    </div>
                  </TableData>
                  <TableData classes=" lg:px-3 hidden lg:table-cell">
                    <Price priceDec={48} price={200} size="2xl" />
                  </TableData>
                </tr>
              </tbody>
            </table>
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
                      <Input
                        id="name"
                        type="text"
                        text="Име"
                        holder="Иван Иванов"
                      />
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
                        <label
                          htmlFor="moreInfo"
                          className="font-medium text-dark-400"
                        >
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
          </div>
        </div>
      </main>
    </>
  );
}
