import React from "react";
import Input from "../form/DeliveryInput";
import TelehponeInput from "../form/TelephoneInput";

export default function MagazinePanel({ userData }) {
  return (
    <section>
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
        <Input
          placeholder="Адрес"
          id="address"
          type="text"
          isReq={true}
          defValue="гр.София ПК-1582
        Дружба 2
        РУМ Дружба 2 срещу блок 205"
          readOnly={true}
        />
      </section>
    </section>
  );
}
