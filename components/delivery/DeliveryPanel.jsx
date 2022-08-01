import React, { useState, useEffect } from "react";

// Componets
import Input from "../form/DeliveryInput";
import TelehponeInput from "../form/TelephoneInput";
import ListBox from "../base/ListBox";

export default function DeliveryPanel({ userData }) {
  const [addresses, setAddresses] = useState(userData.addresses);
  const [selected, setSelected] = useState(userData.addresses[0]);

  const [isNewAddress, setNewAddress] = useState(false);
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
        </section>
      )}
    </section>
  );
}
