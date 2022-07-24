import React, { useState } from "react";

import { changeStatus } from "../../../services/deliveryServiceFetch";
import { Status } from "../../account/MyOrders/Status";

export default function Section({ delivery }) {
  const [status, setStatus] = useState(delivery.status);

  const changeStatusHand = async (status, deliveryId) => {
    const data = await changeStatus(status, deliveryId);
    setStatus(data.newStatus);
  };

  return (
    <section
      key={delivery._id}
      className="relative pt-4 pl-2 mb-10 border-l-4 border-primary"
    >
      <div className="flex flex-col flex-wrap gap-y-5">
        <div>
          <h3 className="font-semibold uppercase">За адреса:</h3>
          <ul className="flex flex-col flex-wrap gap-x-2 gap-y-1">
            <li>Град: {delivery.city}</li>
            <li>Адрес за доставка: {delivery.address}</li>
            <li>Пощенски код: {delivery.zipCode}</li>
            <li>Име: {delivery.name}</li>
            <li>Телефон: {delivery.telephone}</li>
            {delivery.comment && <li>Коментар: {delivery.comment}</li>}
          </ul>
        </div>
        <div className="relative pl-1 border-l-2 border-green">
          <h3 className="font-semibold uppercase">Продукти:</h3>
          {delivery.cart.map((cartItem, index) => {
            return (
              <ul
                key={cartItem.item._id}
                className="relative py-1 pl-1 my-1 mb-2 ml-1 border border-primary-lighter"
              >
                <li>
                  <span className="text-primary">Име на продукта:</span>{" "}
                  {cartItem.item.articleName}
                </li>
                <li>
                  <span className="text-primary">КатНомер:</span>{" "}
                  {cartItem.item.katNomer}
                </li>

                <li>Тип: {cartItem.item.types}</li>
                <li className="flex flex-wrap mt-2 gap-x-2 gap-y-2">
                  <div>Ед. цена: {cartItem.item.price}</div>
                  <div>
                    Обща цена: {(cartItem.item.price * cartItem.qty).toFixed(2)}
                  </div>
                </li>

                <div className="absolute top-0 right-2 text-orange">
                  Бройки: {cartItem.qty}
                </div>
              </ul>
            );
          })}
        </div>
      </div>
      <div className="absolute top-0 right-0 flex text-green">
        Обща Сума: {delivery.totalPrice} - <Status type={status} />
      </div>
      {/* Buttons */}
      <section className="flex flex-wrap justify-between my-5 flex-gap-1">
        {status == "sent" && (
          <button
            onClick={() => changeStatusHand("progress", delivery._id)}
            className="px-10 text-white border bg-primary hover:bg-transparent hover:text-primary border-primary"
          >
            Започни
          </button>
        )}
        {status == "progress" && (
          <button
            onClick={() => changeStatusHand("sent", delivery._id)}
            className="px-10 border border-secondary text-secondary hover:bg-secondary hover:text-white"
          >
            Откажи започването
          </button>
        )}
        <button
          onClick={() => changeStatusHand("finished")}
          className="px-4 text-white border bg-green hover:bg-transparent hover:text-green border-green"
        >
          Завърши
        </button>
        <button className="px-10 py-1 text-white border bg-secondary hover:bg-transparent hover:text-secondary border-secondary">
          ИЗТРИЙ
        </button>
      </section>
    </section>
  );
}
