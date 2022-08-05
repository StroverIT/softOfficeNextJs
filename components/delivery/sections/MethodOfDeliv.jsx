import React, { useState } from "react";

import RadioButton from "../../cart/RadioButton";
import MagazinePanel from "../../delivery/MagazinePanel";
import DeliveryPanel from "../../delivery/DeliveryPanel";
import EkontPanel from "../../delivery/EkontPanel";
import { AiOutlineCar } from "react-icons/ai";

// Headles ui
import { Tab } from "@headlessui/react";
// Constatnts
import { DELIVERY, MAGAZINE, EKONT } from "../../cart/cartCostants";
// Utils
import getOffices from "../../../utils/getOffices";

export default function MethodOfDeliv({
  selected,
  orderState,
  changeOrderHandler,
  priceState,
  userData,
  officeSelected,
  setOfficeSelected,
}) {
  const [isOfficeLoading, setIsOfficeLoading] = useState(false);
  const [officeData, setOfficeData] = useState(null);

  const getOfficeData = async () => {
    setIsOfficeLoading(true);
    const data = await getOffices(selected.cityId);
    setIsOfficeLoading(false);
    setOfficeData(data);
  };
  return (
    <section>
      <div className="flex items-center py-4 pl-3 text-lg bg-gray-300 border-y border-gray-150 font-semibold">
        <div>
          <AiOutlineCar />
        </div>
        <h3 className="pl-1">Метод на доставка</h3>
      </div>
      <section className="xl:grid grid-cols-[23%72%]">
        <Tab.Group>
          <Tab.List className="py-4  pl-3 space-y-1 border-b smToXl:space-x-2 border-gray xl:border-r xl:border-b-0 sm:justify-around flex flex-wrap xl:block">
            {selected.cityName == "София" && (
              <Tab>
                <RadioButton
                  radioState={orderState}
                  changeHandler={changeOrderHandler}
                  name={MAGAZINE}
                  id="fromMagazine"
                  text="Вземи от магазин"
                  icon="shop"
                />
              </Tab>
            )}
            {priceState.totalPrice >= 300 && selected.cityName == "София" && (
              <Tab>
                <RadioButton
                  radioState={orderState}
                  changeHandler={changeOrderHandler}
                  name={DELIVERY}
                  id="delivery"
                  text="Доставка до вкъщи"
                  icon="address"
                />
              </Tab>
            )}
            {(priceState.totalPrice < 300 || selected.cityName != "София") && (
              <Tab>
                <RadioButton
                  radioState={orderState}
                  changeHandler={changeOrderHandler}
                  name={EKONT}
                  id={EKONT}
                  text="Офис Еконт: 2.99 лв."
                  icon="shop"
                  onClick={getOfficeData}
                />
              </Tab>
            )}
          </Tab.List>
          <Tab.Panels>
            <div className="mt-6 ml-10">
              <h3 className="text-sm uppercase font-roboto">
                Ще доставим пратката ти до:
              </h3>
            </div>
            <section className="px-4">
              {selected.cityName == "София" && (
                <Tab.Panel>
                  <MagazinePanel userData={userData} />
                </Tab.Panel>
              )}
              {priceState.totalPrice >= 300 && selected.cityName == "София" && (
                <Tab.Panel>
                  <DeliveryPanel userData={userData} />
                </Tab.Panel>
              )}
              {(priceState.totalPrice < 300 ||
                selected.cityName != "София") && (
                <Tab.Panel>
                  {!isOfficeLoading && (
                    <EkontPanel
                      userData={userData}
                      officeData={officeData}
                      isOfficeLoading={isOfficeLoading}
                      selected={officeSelected}
                      setSelected={setOfficeSelected}
                    />
                  )}
                  {isOfficeLoading && (
                    <div className="flex justify-center items-center py-5">
                      <div className="loader"></div>
                    </div>
                  )}
                </Tab.Panel>
              )}
            </section>
          </Tab.Panels>
        </Tab.Group>
      </section>
    </section>
  );
}