import React, { useContext, useEffect, useState } from "react";
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
import RadioButton from "../cart/RadioButton";

// Outer utils
import quartersFetch from "../../utils/getQuarters";
import Loader from "../layouts/Loader";

export default function MagazinePanel({
  userData,

  officeData,
  selected,
  setSelected,
}) {
  const { inputs, setInputs, quarterSelected, setQuarterSelected } =
    useContext(InputContext);

  const [typeEkont, setTypeEkont] = useState("office");
  const [isQuartersLoading, setQuartesLoading] = useState(true);

  const [quarters, setQuarters] = useState(null);

  const getQuarters = async () => {
    const data = await quartersFetch(selected.cityId);
    setQuartesLoading(false);
    setQuarters(data);
  };
  const changeTypeHandler = (e) => {
    const name = e.target.name;
    const cond = name == "address" ? "office" : "address";
    setTypeEkont(name);

    if (name == "office") {
      setQuarterSelected({ name: "Избери квартал" });
    }
    if (name == "address") {
      setSelected({ name: "Избери офис" });
    }

    setInputs((prevState) => ({
      ...prevState,
      address: {
        ...prevState.address,
        [cond]: null,
      },
    }));
  };
  const changeHandler = (e) => {
    const name = e.target.name;
    const val = e.target.value;

    setInputs((prevState) => ({
      ...prevState,
      address: { ...prevState.address, [name]: val },
    }));
  };
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
      <section className="justify-around py-5 sm:flex">
        <RadioButton
          radioState={typeEkont}
          changeHandler={changeTypeHandler}
          name="office"
          id="office"
          text="До офис на еконт"
        />
        <RadioButton
          radioState={typeEkont}
          changeHandler={changeTypeHandler}
          name="address"
          id="address"
          text="До адрес"
          onClick={getQuarters}
        />
      </section>
      {typeEkont == "office" && (
        <ListBoxSearch
          data={officeData}
          selected={selected}
          setSelected={setSelected}
          inputPlaceholder={"Oфис..."}
        />
      )}
      {typeEkont == "address" && (
        <>
          {!isQuartersLoading && (
            <>
              <div className="mb-5">
                <ListBoxSearch
                  selected={quarterSelected}
                  setSelected={setQuarterSelected}
                  data={quarters}
                  inputPlaceholder="Квартал..."
                />
              </div>
              <Input
                placeholder="Адрес"
                id="address"
                type="text"
                isReq={false}
                onChange={changeHandler}
              />
            </>
          )}
          {isQuartersLoading && (
            <div className="flex items-center justify-center py-5">
              <Loader />
            </div>
          )}
        </>
      )}
    </section>
  );
}
