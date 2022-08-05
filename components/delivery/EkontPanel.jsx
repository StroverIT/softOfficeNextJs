import React, { useContext, useEffect } from "react";
// Components
import Input from "../form/DeliveryInput";
import TelehponeInput from "../form/TelephoneInput";
import ListBoxSearch from "../base/ListBoxSearch";
// Contenxt
import { InputContext } from "./Context";
// Constats
import { EKONT } from "../cart/cartCostants";
// Inner utils
import { changeHandler } from "./innerUtils";

export default function MagazinePanel({
  userData,

  officeData,
  selected,
  setSelected,
}) {
  const { inputs, setInputs } = useContext(InputContext);

  useEffect(() => {
    setInputs((prevState) => ({ ...prevState, typeOfDelivery: EKONT }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    setInputs((prevState) => ({
      ...prevState,
      address: {
        ...prevState.address,
        office:
          selected.name.toLowerCase() == "избери офис" ? null : selected.name,
      },
    }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected]);
  return (
    <section className="flex flex-col my-10 md:mx-10">
      <section className="items-center justify-center lg:space-x-4 lg:flex">
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
          getOuterVal={(e) => changeHandler(e, setInputs)}
          isReq={false}
          onChange={(e) => changeHandler(e, setInputs)}
          phoneNumber={userData.phoneNumber}
        />
      </section>
      <ListBoxSearch
        data={officeData}
        selected={selected}
        setSelected={setSelected}
        inputPlaceholder={"Oфис..."}
      />
    </section>
  );
}
