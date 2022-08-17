import Image from "next/image";
import React, { useState } from "react";

// Components
import { changeStatus } from "../../../services/deliveryServiceFetch";

import { Status } from "../../account/MyOrders/Status";

export default function Product({ delivery }) {
  const [status, setStatus] = useState(delivery.status);

  const changeStatusHand = async (status, deliveryId) => {
    const data = await changeStatus(status, deliveryId);
    setStatus(data.newStatus);
  };

  const address = delivery.addressInfo;
  const cart = delivery.cart;

  return (
    <section
      key={delivery._id}
      className="relative pt-4 pl-2 mb-10 border-l-4 border-primary"
    >
      <div className="flex flex-col flex-wrap gap-y-5">
        {delivery.addressInfo && (
          <div>
            <h3 className="font-semibold uppercase">За адреса:</h3>
            <ul className="flex flex-col flex-wrap gap-x-2 gap-y-1">
              <li>Град: {address.city}</li>
              <li>Адрес за доставка: {address.address}</li>
              <li>Име: {address.name}</li>
              <li>Телефон: {address.telephone}</li>
              {address.comment && <li>Коментар: {address.comment}</li>}
            </ul>
          </div>
        )}
        <div className="relative pl-1 border-l-2 border-green">
          <h3 className="font-semibold uppercase">Продукти:</h3>
          {cart &&
            cart.map((product) => {
              return (
                <ul key={product.item._id} className="relative mb-1">
                  <li>Име на продукта: {product.item.articleName}</li>
                  <li>Бройки: {product.qty}</li>
                  <li>Ед. цена: {product.item.price}</li>
                  <li>
                    Обща. цена за продуктите:{" "}
                    {(product.qty * product.item.price).toFixed(2)}
                  </li>

                  <div className="absolute top-0 right-0 ">
                    <div className="relative w-20 h-20">
                      <Image
                        src={`/uploads/${product.item.imageUrl}`}
                        layout="fill"
                        alt={product.item.imageUrl}
                      />
                    </div>
                  </div>
                </ul>
              );
            })}
        </div>
      </div>
      <div className="absolute top-0 right-0 flex text-green">
        Обща Сума: {delivery.totalPrice} лв.
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
          <button className="px-10 py-1 text-white border bg-secondary hover:bg-transparent hover:text-secondary border-secondary">
            ИЗТРИЙ
          </button>
        </div>
      </section>
    </section>
  );
}
