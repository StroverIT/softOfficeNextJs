import React, { useState } from "react";

// NextJs
import Image from "next/image";
import { useRouter } from "next/router";

// Components
import { changeStatus } from "../../../services/deliveryServiceFetch";

import { Status } from "../../account/MyOrders/Status";

export default function Product({ delivery }) {
  const router = useRouter();
  const [status, setStatus] = useState(delivery.status);

  const changeStatusHand = async (status, deliveryId) => {
    const data = await changeStatus(status, deliveryId);
    setStatus(data.newStatus);
  };

  const address = delivery.addressInfo;
  const cart = delivery.cart;
  const deleteHandler = async (deliveryId) => {
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ deliveryId }),
    };
    const res = await fetch("/api/cart/deleteDelivery", options);
    const data = await res.json();
    if (data?.message) {
      router.reload(window.location.pathname);
    }
  };
  return (
    <section
      key={delivery._id}
      className="relative pt-4 pl-2 mb-10 border-l-4 border-primary"
    >
      <div className="flex flex-col flex-wrap pt-4 mt-4 gap-y-5">
        <div>
          <h3 className="font-semibold uppercase">За адреса:</h3>
          <ul className="flex flex-col flex-wrap gap-x-2 gap-y-1">
            {address.city && <li>Град: {address.city}</li>}
            {address.address && <li>Адрес за доставка: {address.address}</li>}
            <li>Име: {address.name}</li>
            <li>Телефон: {address.telephone}</li>
            {delivery.comment && <li>Коментар: {delivery.comment}</li>}
          </ul>
        </div>

        {delivery.typeOfPayment && (
          <div>
            <h3 className="font-semibold uppercase">Начин на плащане:</h3>
            <h5>{delivery.typeOfPayment}</h5>
          </div>
        )}
        <div className="relative ">
          <h3 className="font-semibold uppercase">Продукти:</h3>
          <table className="w-full table-auto ">
            <thead>
              <th>Кат. номер</th>
              <th>Артикул</th>
              <th>Ед. цена</th>
              <th>Бройки</th>
              <th>Общо</th>
              <th>Общо с ДДС</th>
            </thead>
            <tbody>
              {cart &&
                cart.map((product) => {
                  const name = !product.item.item.customName ? `${product.item.section.name} ${product.item.article.name}` : product.item.item.customName;


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
                        {!product.item.item.customName && product.item.item.tipove
                          .split(";")
                          .slice(0, 5)
                          .map(
                            (item) =>
                              `${
                                item.split(": ")[1] ? item.split(": ")[1] : ""
                              } `
                          )}
                      </td>
                      <td>{parseFloat(price).toFixed(2)}</td>

                      <td> {product.qty}</td>

                      <td>{parseFloat(price * product.qty).toFixed(2)}</td>
                      <td>
                        {" "}
                        {parseFloat(price * product.qty * 1.2).toFixed(2)}
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
        </div>
      </div>
      <div className="absolute top-0 left-0 flex flex-wrap justify-between w-full text-primary-100">
        <div className="ml-2">
          Обща Сума: {parseFloat(delivery.totalPrice).toFixed(2)} лв.
        </div>
        <div>
          {delivery.isVerified ? (
            <div className="text-lg text-green">Потвърдена</div>
          ) : (
            <div className="text-lg text-secondary">Трябва да се потвърди</div>
          )}
        </div>
        <div className="ml-2">
          <Status type={status} isDiv={true} />
        </div>
      </div>
      {/* Buttons */}
      <section className="flex flex-wrap justify-between my-5 mt-5 gap-y-5">
        {status == "progress" && (
          <button
            onClick={() => changeStatusHand("sent", delivery._id)}
            className="px-10 text-white border bg-primary hover:bg-transparent hover:text-primary border-primary"
          >
            Започни
          </button>
        )}
        {status == "sent" && (
          <button
            onClick={() => changeStatusHand("progress", delivery._id)}
            className="px-10 border border-secondary text-secondary hover:bg-secondary hover:text-white"
          >
            Откажи започването
          </button>
        )}
        {status != "finished" && status != "returned" && (
          <button
            onClick={() => changeStatusHand("finished", delivery._id)}
            className="px-4 text-white border bg-green hover:bg-transparent hover:text-green border-green"
          >
            Завърши
          </button>
        )}

        <div className="flex flex-wrap gap-x-5 gap-y-5">
          {status != "returned" && status != "finished" && (
            <button
              onClick={() => changeStatusHand("returned", delivery._id)}
              className="px-10 py-1 text-white border bg-secondary hover:bg-transparent hover:text-secondary border-secondary"
            >
              Откажи
            </button>
          )}
          <button
            className="px-10 py-1 text-white border bg-secondary hover:bg-transparent hover:text-secondary border-secondary"
            onClick={() => deleteHandler(delivery._id)}
          >
            ИЗТРИЙ
          </button>
        </div>
      </section>
    </section>
  );
}
