import React, { useContext, useState, useEffect } from "react";

// Components
import RadioButton from "../../cart/RadioButton";
import Checkbox from "../../base/CheckBoxBase";
import ListBox from "../../base/ListBox";
import Input from "../../form/DeliveryInput";
import ListBoxSearch from "../../base/ListBoxSearch";
// Panels
import MagazinePanel from "../../delivery/MagazinePanel";
import DeliveryPanel from "../../delivery/DeliveryPanel";
import EkontPanel from "../../delivery/EkontPanel";

// Headles ui
import { Tab } from "@headlessui/react";
// Constatnts
import { DELIVERY, MAGAZINE, EKONT } from "../../cart/cartCostants";
// Utils
import getOffices from "../../../utils/getOffices";
import quartersFetch from "../../../utils/getQuarters";

// Context
import { InputContext } from "../Context";
// Icons
import { AiOutlineCar } from "react-icons/ai";

export default function MethodOfDeliv({
  selected,

  changeOrderHandler,
  priceState,
  userData,

  cities,
}) {
  const { invoice, setInvoice, orderState } = useContext(InputContext);

  const [isQuartersLoading, setQuartesLoading] = useState(false);

  const [quartersData, setQuartersData] = useState(null);

  const [invoiceSelect, setInvoiceSelect] = useState({
    name: "Юридическо лице",
  });
  const [citySelected, setCitySelected] = useState(selected);

  const getQuarters = async () => {
    setQuartesLoading(true);
    const data = await quartersFetch(selected.cityId);

    setQuartesLoading(false);
    setQuartersData(data);
  };
  const invoiceCheckHandler = (e, event) => {
    const input = e.current;
    const isChecked = input.checked;
    setInvoice((prevState) => ({ ...prevState, isInvoice: isChecked }));
  };
  const invoiceInputHandler = (e) => {
    const name = e.target.name;
    let value = e.target.value;

    if (name == "address") {
      value = `${citySelected.name} ${value}`;
    }
    setInvoice((prevState) => ({
      ...prevState,
      data: { ...prevState.data, [name]: value },
    }));
  };
  useEffect(() => {
    setInvoice((prevState) => ({ ...prevState, data: {} }));
  }, [setInvoice]);
  useEffect(() => {
    getQuarters();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected]);

  return (
    <section>
      <div className="flex items-center py-4 pl-3 text-lg font-semibold bg-gray-300 border-y border-gray-150">
        <div>
          <AiOutlineCar />
        </div>
        <h3 className="pl-1">Метод на доставка</h3>
      </div>
      <section className="xl:grid grid-cols-[23%72%]">
        <Tab.Group>
          <Tab.List className="flex flex-wrap py-4 pl-3 space-y-1 border-b smToXl:space-x-2 border-gray xl:border-r xl:border-b-0 sm:justify-around xl:block">
            <Tab>
              <RadioButton
                radioState={orderState}
                changeHandler={changeOrderHandler}
                name={DELIVERY}
                id="delivery"
                text="Доставка до адрес"
                icon="address"
              />
            </Tab>
            {selected.name == "София" && (
              <Tab>
                <RadioButton
                  radioState={orderState}
                  changeHandler={changeOrderHandler}
                  name={MAGAZINE}
                  id="fromMagazine"
                  text="Вземи от склад"
                  icon="shop"
                />
              </Tab>
            )}
          </Tab.List>
          {orderState ? (
            <Tab.Panels>
              <div className="mt-6 ml-10">
                <h3 className="text-sm uppercase font-roboto">
                  Ще доставим пратката ти до:
                </h3>
              </div>
              <section className="px-4">
                <Tab.Panel>
                  {!isQuartersLoading && (
                    <DeliveryPanel
                      userData={userData}
                      quartersData={quartersData}
                      quarters={quartersData}
                      city={selected}
                    />
                  )}
                  {isQuartersLoading && (
                    <div className="flex items-center justify-center py-5">
                      <div className="loader"></div>
                    </div>
                  )}
                </Tab.Panel>
                {selected.name == "София" && (
                  <Tab.Panel>
                    <MagazinePanel userData={userData} />
                  </Tab.Panel>
                )}
              </section>
              <section className="pb-6 pl-5">
                <Checkbox
                  text="Фактура"
                  id="invoice"
                  checked={invoice.isInvoice}
                  setChecked={invoiceCheckHandler}
                />
                {invoice.isInvoice && (
                  <>
                    <ListBox
                      selected={invoiceSelect}
                      setSelected={setInvoiceSelect}
                      data={[
                        { name: "Юридическо лице" },
                        { name: "Физическо лице" },
                      ]}
                    />
                    {invoiceSelect.name == "Юридическо лице" && (
                      <section className="my-6">
                        <Input
                          placeholder="Фирма"
                          id="firm"
                          type="text"
                          isReq={true}
                          onChange={invoiceInputHandler}
                          defValue={invoice?.firm}
                        />
                        <Input
                          placeholder="МОЛ"
                          id="mol"
                          type="text"
                          isReq={true}
                          onChange={invoiceInputHandler}
                          defValue={invoice?.mol}
                        />
                        <Input
                          placeholder="ЕИК"
                          id="eik"
                          type="text"
                          isReq={true}
                          onChange={invoiceInputHandler}
                          defValue={invoice?.eik}
                        />
                        <Input
                          placeholder="ИН по ДДС"
                          id="ИН по ДДС"
                          type="text"
                          isReq={true}
                          onChange={invoiceInputHandler}
                          defValue={invoice?.eik}
                        />
                        <ListBoxSearch
                          selected={citySelected}
                          setSelected={setCitySelected}
                          data={cities}
                        />
                        <Input
                          placeholder="Адрес"
                          id="address"
                          type="text"
                          isReq={true}
                          onChange={invoiceInputHandler}
                          defValue={invoice?.address}
                        />
                      </section>
                    )}
                    {invoiceSelect.name == "Физическо лице" && (
                      <section className="my-6">
                        <Input
                          placeholder="Име"
                          id="name"
                          type="text"
                          isReq={true}
                          onChange={invoiceInputHandler}
                          defValue={invoice?.name}
                        />
                        <Input
                          placeholder="ЕГН"
                          id="egn"
                          type="text"
                          isReq={true}
                          onChange={invoiceInputHandler}
                          defValue={invoice?.egn}
                        />
                        <ListBoxSearch
                          selected={citySelected}
                          setSelected={setCitySelected}
                          data={cities}
                        />
                        <Input
                          placeholder="Адрес"
                          id="address"
                          type="text"
                          isReq={true}
                          onChange={invoiceInputHandler}
                          defValue={invoice?.address}
                        />
                      </section>
                    )}
                  </>
                )}
              </section>
            </Tab.Panels>
          ) : (
            <div className="py-10 text-center">
              Моля изберете метод на доставка
            </div>
          )}
        </Tab.Group>
      </section>
    </section>
  );
}
