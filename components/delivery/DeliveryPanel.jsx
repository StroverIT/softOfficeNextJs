import React, { useState, useEffect, useContext } from "react";

// Componets
import Input from "../form/DeliveryInput";
import TelehponeInput from "../form/TelephoneInput";
import ListBox from "../base/ListBox";
import ListBoxSearch from "../base/ListBoxSearch";
// Context
import { InputContext } from "./Context";
// InnerUtils
import { changeHandler } from "./innerUtils";
import { DELIVERY } from "../cart/cartCostants";

export default function DeliveryPanel({
  userData,
  setQuarterSelected,
  quarterSelected,
  quarters,
}) {
  const { inputs, setInputs } = useContext(InputContext);

  const [addresses, setAddresses] = useState(userData.addresses);
  const [selected, setSelected] = useState(userData.addresses[0]);

  const [isNewAddress, setNewAddress] = useState(false);
  useEffect(() => {
    setInputs((prevState) => ({
      ...prevState,
      typeOfDelivery: DELIVERY,
      address: {
        ...prevState.address,
        phoneNumber: userData.phoneNumber || null,
        fullName: userData.fullName,
      },
    }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    if (selected?.name?.includes("Нов адрес")) {
      setNewAddress(true);
    }
  }, [selected]);

  return (
    <section>
      <section className="mx-10 mt-4">
        <ListBox
          selected={selected}
          setSelected={setSelected}
          data={addresses}
        />
      </section>
      {isNewAddress && (
        <section className="flex flex-col mt-6 mb-10 md:mx-10">
          <section className="items-center justify-center lg:space-x-2 lg:flex">
            <Input
              placeholder="Име и фамилия"
              id="fullName"
              type="text"
              isReq={false}
              onChange={(e) => changeHandler(e, setInputs)}
              defValue={userData?.fullName}
            />
            <TelehponeInput
              placeholder="Телефон"
              id="phoneNumber"
              type="text"
              isReq={false}
              getOuterVal={changeHandler}
              phoneNumber={userData.phoneNumber}
            />
          </section>
          <section className="w-full flex flex-col space-y-5 mt-3">
            <ListBoxSearch
              selected={quarterSelected}
              setSelected={setQuarterSelected}
              data={quarters}
              inputPlaceholder="Квартал..."
            />
            <Input
              placeholder="Адрес"
              id="address"
              type="text"
              isReq={false}
              onChange={(e) => changeHandler(e, setInputs)}
            />
          </section>
        </section>
      )}
    </section>
  );
}
