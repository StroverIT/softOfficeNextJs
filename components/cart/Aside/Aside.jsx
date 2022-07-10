import React, { useEffect, useState, useRef } from "react";

// Components
import Price from "../../priceStyling/Pricing";
import BtnOutlined from "../../buttons/Outlined";
import DeliveryInputs from "./DeliveryInputs";

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
            <DeliveryInputs />
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
