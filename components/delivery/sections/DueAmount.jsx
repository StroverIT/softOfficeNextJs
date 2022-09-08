import React from "react";
import { FaRegMoneyBillAlt } from "react-icons/fa";

import BtnOutlined from "../../buttons/Outlined";

export default function DueAmount({ priceState, createDelivery, savedMoney }) {
  return (
    <section className="sticky flex flex-col font-semibold y top-20 h-72">
      <section className="flex flex-col justify-between border shadow-lg border-gray">
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
                  <span className="ml-1 font-light">лв.</span>
                </>
              )}
            </div>
          </section>
          {savedMoney && savedMoney > 0 && (
            <section className="flex justify-between pb-1 text-sm">
              <div className="font-light">Спестени пари</div>
              <div>
                {savedMoney.toFixed(2)} <span className="font-light">лв.</span>
              </div>
            </section>
          )}
        </section>
        <section className="flex items-center justify-between px-3 py-4 bg-gray-300 border-b border-gray-150 ">
          <div>ОБЩО: </div>
          <div>{priceState.totalPrice.toFixed(2)} лв.</div>
        </section>
      </section>
      <section className="mt-2 shadow-lg ">
        <BtnOutlined
          text="Завърши поръчката"
          custom="text-sm px-0 "
          onClick={createDelivery}
        />
      </section>
    </section>
  );
}
