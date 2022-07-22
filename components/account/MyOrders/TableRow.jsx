import React, { useState, useEffect } from "react";
import { Status } from "./Status";
import { AiOutlineSearch } from "react-icons/ai";
import { HiX } from "react-icons/hi";

function ListAddress({ text, value }) {
  return (
    <li>
      <span>{text}</span>
      <span className="pl-1">{value}</span>
    </li>
  );
}
function ListProduct({ text }) {
  return (
    <li>
      <span>{text[0]}: </span> <span>{text[1]}</span>
    </li>
  );
}
function CartItem({ data }) {
  return (
    <>
      <ListProduct text={["КатНомер", data.katNomer]} />
      <ListProduct text={["Ед. цена", data.price]} />
      <ListProduct text={["Типове", data.types[0]]} />
    </>
  );
}
export function TableRow({ id, date, total, status, isOld, fullData }) {
  const [menu, setMenu] = useState(false);
  useEffect(() => {
    if (menu) {
      document.body.style.overflowY = "hidden";
    } else {
      document.body.style.removeProperty("overflow-y");
    }
  }, [menu]);
  return (
    <>
      <tr>
        {/* Mongodb */}
        <td className="py-4">{id}</td>
        <td className="hidden sm:table-cell">{date}</td>
        <td className="hidden sm:table-cell">{total} лв.</td>
        <Status type={status} />
        {isOld && (
          <td className="flex justify-center h-full items-cemter">
            <button className="flex items-center justify-center h-full p-4 text-2xl font-semibold rounded-full cursor-pointer text-primary-lighter">
              <AiOutlineSearch />
            </button>
          </td>
        )}
        {!isOld && (
          <td>
            <button
              className="p-2 text-sm font-semibold tracking-wide text-center text-white rounded-md cursor-pointer bg-primary-lighter"
              onClick={() => setMenu(true)}
            >
              ВИЖ
            </button>
          </td>
        )}
        <td>
          <div
            className={`${
              !menu && "hidden"
            } fixed  z-20 left-0 top-0 h-screen w-screen`}
          >
            <div
              className="relative z-10 w-full h-screen cursor-pointer blury-noProps"
              onClick={() => setMenu(false)}
            >
              {/* Mongodb */}
            </div>
            {/* Menu on open */}
            <section className="absolute z-20 w-full -translate-x-1/2 -translate-y-1/2 h-2/3 md:h-1/2 md:w-3/4 top-1/2 bg-gray left-1/2">
              <div className="relative h-full">
                <div className="flex flex-wrap mx-1 pt-7 text-primary-lighter">
                  <section className="w-full text-left">
                    <h3 className="text-lg font-semibold text-center uppercase">
                      За адреса
                    </h3>
                    <ul>
                      <ListAddress text="Име: " value={fullData.name} />
                      <ListAddress text="Телефон:" value={fullData.telephone} />
                      <ListAddress text="Град:" value={fullData.telephone} />
                      <ListAddress
                        text="Пощенски код:"
                        value={fullData.telephone}
                      />
                      <ListAddress
                        text="Коментар:"
                        value={fullData.telephone}
                      />
                    </ul>
                  </section>
                  <section className="font-semibold md:ml-2 ">
                    <h3 className="text-lg font-semibold uppercase">
                      За продуктите
                    </h3>

                    <section className="relative flex flex-wrap gap-x-10">
                      {fullData.cart.map((cart, index) => {
                        return (
                          <ul key={cart.item._id} className="mt-2 text-left">
                            <li>
                              Продукт № {index} - Бройки: {cart.qty}
                            </li>
                            <CartItem data={cart.item} />
                          </ul>
                        );
                      })}
                    </section>
                  </section>
                </div>
                {/* Absolute category (you know :D) */}
                <div className="absolute flex font-semibold top-1 left-1 ">
                  <Status type={fullData.status} /> -{" "}
                  <span className="ml-1">{fullData.createdAt}</span>
                </div>
                <div
                  className="absolute cursor-pointer top-1 right-1"
                  onClick={() => setMenu(false)}
                >
                  <HiX />
                </div>
              </div>
            </section>
          </div>
        </td>
      </tr>
    </>
  );
}
