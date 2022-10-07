import React, { useState, useEffect } from "react";
import { Status } from "./Status";
import { AiOutlineSearch } from "react-icons/ai";
import { HiX } from "react-icons/hi";
<<<<<<< HEAD
import Image from "next/image";
=======
>>>>>>> d26f7cda55573513073816b1ede2bc730122a61e

function ListAddress({ text, value }) {
  return (
    <li>
      <span>{text}</span>
      <span className="pl-1">{value}</span>
    </li>
  );
}
<<<<<<< HEAD

=======
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
>>>>>>> d26f7cda55573513073816b1ede2bc730122a61e
export function TableRow({ id, date, total, status, isOld, fullData }) {
  const [menu, setMenu] = useState(false);
  useEffect(() => {
    if (menu) {
      document.body.style.overflowY = "hidden";
    } else {
      document.body.style.removeProperty("overflow-y");
    }
  }, [menu]);
<<<<<<< HEAD

=======
>>>>>>> d26f7cda55573513073816b1ede2bc730122a61e
  return (
    <>
      <tr>
        {/* Mongodb */}
        <td className="py-4">{id}</td>
        <td className="hidden sm:table-cell">{date}</td>
<<<<<<< HEAD
        <td className="hidden sm:table-cell">
          {parseFloat(total).toFixed(2)} лв.
        </td>
        <Status type={status} />
        {isOld && (
          <td className="flex justify-center h-full items-cemter">
            <button className="flex items-center justify-center h-full p-4 text-2xl font-semibold rounded-full cursor-pointer text-primary-100 ">
=======
        <td className="hidden sm:table-cell">{total} лв.</td>
        <Status type={status} />
        {isOld && (
          <td className="flex justify-center h-full items-cemter">
            <button className="flex items-center justify-center h-full p-4 text-2xl font-semibold rounded-full cursor-pointer text-primary-lighter">
>>>>>>> d26f7cda55573513073816b1ede2bc730122a61e
              <AiOutlineSearch />
            </button>
          </td>
        )}
        {!isOld && (
          <td>
            <button
<<<<<<< HEAD
              className="p-2 text-sm font-semibold tracking-wide text-center text-white rounded-md cursor-pointer bg-primary-100"
=======
              className="p-2 text-sm font-semibold tracking-wide text-center text-white rounded-md cursor-pointer bg-primary-lighter"
>>>>>>> d26f7cda55573513073816b1ede2bc730122a61e
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
<<<<<<< HEAD
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
                      {console.log(fullData)}
                      {fullData?.addressInfo && (
                        <>
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
                            value={fullData.addressInfo.city}
                          />
                          <ListAddress
                            text="Адрес:"
                            value={fullData.addressInfo.address}
                          />
                          <ListAddress
                            text="Цена на доставка:"
                            value={
                              fullData?.deliveryPrice > 0
                                ? `${fullData?.deliveryPrice?.toFixed(2)} лв.`
                                : "Безплатна"
                            }
                          />
                        </>
                      )}
                      <ListAddress text="Коментар:" value={fullData.comment} />
                    </ul>
                  </section>

                  <section className="pt-2 font-semibold border-t border-gray-200 md:ml-2">
                    <h3 className="flex items-center justify-center text-lg font-semibold uppercase text-green lg:justify-start">
                      продукти
                    </h3>

                    <table className="w-full mt-5 table-auto">
                      <thead>
                        <th>Катномер</th>
                        <th>Артикул</th>
                        <th>Ед. цена</th>
                        <th>Бройки</th>
                        <th>Общо</th>
                        <th>Общо с ДДС</th>
                      </thead>
                      <tbody>
                        {fullData.cart.map((product, index) => {
                          const name = `${product.item.section.name} ${product.item.article.name}`;

                          let price = product.item.item.cena;
                          if (product.item.item.isOnPromotions) {
                            price = product.item.item.promotionalPrice;
                          }
                          return (
                            <tr
                              key={product.item._id}
                              className="relative p-5 mb-5 text-center border border-green"
                            >
                              <td>{product.item.item.katNomer}</td>
                              <td className="pl-2 border border-primary-100">
                                {name}{" "}
                                {product.item.item.tipove
                                  .split(";")
                                  .slice(0, 5)
                                  .map(
                                    (item) =>
                                      `${
                                        item.split(": ")[1]
                                          ? item.split(": ")[1]
                                          : ""
                                      } `
                                  )}
                              </td>
                              <td>{parseFloat(price).toFixed(2)}</td>

                              <td> {product.qty}</td>

                              <td>
                                {parseFloat(price * product.qty).toFixed(2)}
                              </td>
                              <td>
                                {" "}
                                {parseFloat(price * product.qty * 1.2).toFixed(
                                  2
                                )}
                              </td>

                              {/* <div className="flex items-center justify-center">
                          <div className="relative w-28 h-28">
                            <Image
                              src={`/uploads/${product.item.article.imgUrl}`}
                              layout="fill"
                              alt={product.item.imageUrl}
                            />
                          </div>
                        </div> */}
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </section>
                </div>
                {/* Absolute category (you know :D) */}
                <div className="absolute flex font-semibold -translate-x-1/2 top-5 left-1/2 ">
                  <Status type={fullData.status} isDiv={true} /> -{" "}
                  <span className="ml-1">{fullData.createdAt}</span>
                </div>
=======
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
                  <Status type={fullData.status} isDiv={true} /> -{" "}
                  <span className="ml-1">{fullData.createdAt}</span>
                </div>
                <div
                  className="absolute cursor-pointer top-1 right-1"
                  onClick={() => setMenu(false)}
                >
                  <HiX />
                </div>
>>>>>>> d26f7cda55573513073816b1ede2bc730122a61e
              </div>
            </section>
          </div>
        </td>
      </tr>
    </>
  );
}
