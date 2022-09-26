import React, { useContext, useEffect } from "react";
import Input from "../form/DeliveryInput";
import TelehponeInput from "../form/TelephoneInput";
// Context
import { InputContext } from "./Context";
import { MAGAZINE } from "../cart/cartCostants";
import changeHandler from "./innerUtils";

export default function MagazinePanel({ userData }) {
  const { inputs, setInputs } = useContext(InputContext);

  useEffect(() => {
    setInputs((prevState) => ({
      ...prevState,
      typeOfDelivery: MAGAZINE,
      address: {
        ...prevState.address,
        phoneNumber: userData.phoneNumber || null,
        fullName: userData.fullName,
      },
    }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const changeHandler = (e) => {
    const name = e.target.name;
    const val = e.target.value;

    setInputs((prevState) => ({
      ...prevState,
      address: { ...prevState.address, [name]: val },
    }));
  };

  return (
    <section>
      <section className="flex flex-col my-10 md:mx-10">
        <section className="items-center justify-center lg:space-x-4 lg:flex">
          <Input
            placeholder="Име и фамилия"
            id="fullName"
            type="text"
            isReq={false}
            defValue={userData?.fullName}
            onChange={changeHandler}
          />
          <TelehponeInput
            placeholder="Телефон"
            id="phoneNumber"
            type="text"
            getOuterVal={changeHandler}
            isReq={false}
            phoneNumber={userData.phoneNumber}
            onChange={changeHandler}
          />
        </section>
        <Input
          placeholder="Адрес"
          id="address"
          type="text"
          isReq={true}
          defValue="гр. София, Ул. Обиколна Бл. 275"
          readOnly={true}
        />
      </section>
    </section>
  );
}
