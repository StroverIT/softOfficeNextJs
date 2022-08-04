import React from "react";
// Components
import Input from "../form/DeliveryInput";
import TelehponeInput from "../form/TelephoneInput";
import ListBoxSearch from "../base/ListBoxSearch";

export default function MagazinePanel({
  userData,

  officeData,
  selected,
  setSelected,
}) {
  return (
    <section className="flex flex-col my-10 md:mx-10">
      <section className="items-center justify-center lg:space-x-4 lg:flex">
        <Input
          placeholder="Име и фамилия"
          id="id and name"
          type="text"
          isReq={false}
          defValue={userData?.fullName}
        />
        <TelehponeInput
          placeholder="Телефон"
          id="id and name"
          type="text"
          isReq={false}
          phoneNumber={userData.phoneNumber}
        />
      </section>
      <ListBoxSearch
        data={officeData}
        selected={selected}
        setSelected={setSelected}
        inputPlaceholder={"Квартал..."}
      />
    </section>
  );
}
