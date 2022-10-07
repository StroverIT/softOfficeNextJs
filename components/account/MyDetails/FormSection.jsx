import React from "react";
import Input from "../../form/AccInput";
<<<<<<< HEAD
import TelephoneInput from "../../form/TelephoneInput";
=======
>>>>>>> d26f7cda55573513073816b1ede2bc730122a61e

export default function SectionForm({ inputs }) {
  return (
    <>
      {inputs.map((input) => {
<<<<<<< HEAD
        return input.type != "phoneNumber" ? (
=======
        return (
>>>>>>> d26f7cda55573513073816b1ede2bc730122a61e
          <Input
            placeholder={input.placeholder}
            id={input.id}
            type={input.type}
            isReq={input.isReq}
            iconType={input.iconType}
            key={input.id}
            defValue={input.defValue}
          />
<<<<<<< HEAD
        ) : (
          <TelephoneInput
            placeholder={input.placeholder}
            id={input.id}
            type={input.type}
            isReq={input.isReq}
            iconType={input.iconType}
            key={input.id}
            defValue={input.defValue}
          />
=======
>>>>>>> d26f7cda55573513073816b1ede2bc730122a61e
        );
      })}
      <button
        type="submit"
<<<<<<< HEAD
        className="px-5 py-2 text-white bg-primary-100 hover:bg-primary-trans"
=======
        className="px-5 py-2 text-white bg-primary-lighter hover:bg-primary-trans"
>>>>>>> d26f7cda55573513073816b1ede2bc730122a61e
      >
        Запази
      </button>
    </>
  );
}
