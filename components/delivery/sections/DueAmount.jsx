import React from "react";
import { FaRegMoneyBillAlt } from "react-icons/fa";

import BtnOutlined from "../../buttons/Outlined";

export default function DueAmount({ priceState }) {
  return (
    <section className=" font-semibold y sticky top-20 h-72 flex flex-col">
      <section className="flex flex-col justify-between border border-gray shadow-lg">
        <section className="flex items-center py-4 pl-3 bg-gray-300 border-b border-gray-150">
          <div>
            <FaRegMoneyBillAlt />
          </div>
          <h3 className="pl-2">Дължима сума</h3>
        </section>
        <section className="px-4 py-6">
          <section className="flex justify-between pb-1 text-sm">
            <div className="font-light">Междинна сума</div>
            <div>
              {priceState.subTotal.toFixed(2)}{" "}
              <span className="font-light">лв.</span>
            </div>
          </section>
          <section className="flex justify-between pb-1 text-sm">
            <div className="font-light">ДДС</div>
            <div>
              {priceState.dds.toFixed(2)}{" "}
              <span className="font-light">лв.</span>
            </div>
          </section>
          <section className="flex justify-between text-sm">
            <div className="font-light">Доставка</div>
            <div>
              {priceState.delivery == 0 ? (
                "Безплатна"
              ) : (
                <>
                  <span>{priceState.delivery.toFixed(2)}</span>
                  <span className="font-light ml-1">лв.</span>
                </>
              )}
            </div>
          </section>
        </section>
        <section className="flex items-center justify-between px-3 py-4 bg-gray-300 border-b border-gray-150 ">
          <div>ОБЩО: </div>
          <div>{priceState.totalPrice.toFixed(2)} лв.</div>
        </section>
      </section>
      <section className="mt-2 shadow-lg ">
        <BtnOutlined text="Завърши поръчката" custom="text-sm px-0 " />
      </section>
    </section>
  );
}
