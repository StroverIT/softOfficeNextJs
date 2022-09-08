import React, { useState, useEffect } from "react";
import { Status } from "./Status";
import { AiOutlineSearch } from "react-icons/ai";
import { HiX } from "react-icons/hi";
import Image from "next/image";

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
  const productName = `${data.section.name} ${data.article.name}`;
  let price = data.item.cena;
  if (data.item.isOnPromotions) {
    price = data.item.promotionalPrice;
  }

  return (
    <>
      <ListProduct text={["Име на продукта", productName]} />

      <ListProduct text={["Ед. цена", price.toFixed(2)]} />
      <div className="absolute right-0 hidden -translate-y-1/2 sm:block top-1/2">
        <div className="relative w-20 h-20">
          <Image
            layout="fill"
            alt={data.article.imgUrl}
            src={`/uploads/${data.article.imgUrl}`}
          />
        </div>
      </div>
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
        <td className="hidden sm:table-cell">{total.toFixed(2)} лв.</td>
        <Status type={status} />
        {isOld && (
          <td className="flex justify-center h-full items-cemter">
            <button className="flex items-center justify-center h-full p-4 text-2xl font-semibold rounded-full cursor-pointer text-primary-100 ">
              <AiOutlineSearch />
            </button>
          </td>
        )}
        {!isOld && (
          <td>
            <button
              className="p-2 text-sm font-semibold tracking-wide text-center text-white rounded-md cursor-pointer bg-primary-100"
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
            ></div>
            <section className="absolute z-20 w-full overflow-auto -translate-x-1/2 -translate-y-1/2 bg-gray-100 h-2/3 md:h-2/3 md:w-11/12 top-1/2 left-1/2 ">
              <div className="container relative h-full py-5">
                <div
                  className="sticky z-50 flex justify-end mr-2 text-3xl cursor-pointer right-1 top-2"
                  onClick={() => setMenu(false)}
                >
                  <HiX />
                </div>
                <div className="flex flex-col flex-wrap mx-1 pt-7 ">
                  <section className="w-full my-2 text-left md:ml-2">
                    <h3 className="text-lg font-semibold text-center uppercase text-green lg:text-left">
                      За адреса
                    </h3>
                    <ul>
                      <ListAddress
                        text="Име: "
                        value={fullData.addressInfo.name}
                      />
                      <ListAddress
                        text="Телефон:"
                        value={fullData.addressInfo.telephone}
                      />
                      <ListAddress
                        text="Град:"
                        value={fullData.addressInfo.telephone}
                      />
                      <ListAddress
                        text="Пощенски код:"
                        value={fullData.addressInfo.telephone}
                      />
                      <ListAddress
                        text="Коментар:"
                        value={fullData.addressInfo.telephone}
                      />
                    </ul>
                  </section>

                  <section className="pt-2 font-semibold border-t border-gray-200 md:ml-2">
                    <h3 className="flex items-center justify-center text-lg font-semibold uppercase text-green lg:justify-start">
                      продукти
                    </h3>

                    <section className="relative flex flex-wrap w-full gap-x-10 ">
                      {fullData.cart.map((cart, index) => {
                        return (
                          <ul
                            key={cart.item._id}
                            className="relative w-full pb-5 mt-1 text-left"
                          >
                            <li>
                              <span className="text-secondary">
                                Продукт № {index}
                              </span>{" "}
                              - Бройки: {cart.qty}
                            </li>
                            <CartItem data={cart.item} />
                          </ul>
                        );
                      })}
                    </section>
                  </section>
                </div>
                {/* Absolute category (you know :D) */}
                <div className="absolute flex font-semibold -translate-x-1/2 top-5 left-1/2 ">
                  <Status type={fullData.status} isDiv={true} /> -{" "}
                  <span className="ml-1">{fullData.createdAt}</span>
                </div>
              </div>
            </section>
          </div>
        </td>
      </tr>
    </>
  );
}
