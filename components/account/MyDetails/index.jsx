import React, { useState } from "react";

// My accouts components
import SectionContainer from "./SectionContainer";
import InnerSection from "./InnerSection";
import SectionInputs from "./FormSection";

const urlFetch = {
  personal: "changeNameOrTel",
  email: "changeEmail",
  pass: "changePassword",
};
const inputDataPersonal = [
  {
    placeholder: "Телефонен номер",
    id: "phoneNumber",
    type: "text",
    isReq: true,
    iconType: "phoneNumber",
<<<<<<< HEAD
    type: "phoneNumber",
=======
>>>>>>> d26f7cda55573513073816b1ede2bc730122a61e
  },
];
const inputDataEmail = [
  {
    placeholder: "И-мейл адрес",
    id: "email",
    type: "email",
    isReq: true,
    iconType: "email",
  },
  {
    placeholder: "Парола",
    id: "password",
    type: "password",
    isReq: true,
    iconType: "password",
  },
];
const inputDataPass = [
  {
    placeholder: "Сегашна парола",
    id: "currentPassword",
    type: "text",
    isReq: true,
    iconType: "password",
  },
  {
    placeholder: "Нова парола",
    id: "newPassword",
    type: "password",
    isReq: true,
    iconType: "password",
  },
  {
    placeholder: "Потвърди новата парола",
    id: "newPasswordConf",
    type: "password",
    isReq: true,
    iconType: "password",
  },
];
function Message({ text, err }) {
  return (
    <p
      className={`my-2 text-sm text-center ${
        err ? "text-secondary" : "text-green"
      }`}
    >
      {text}
    </p>
  );
}

export default function MyDetails({ userData }) {
  if (userData) {
    inputDataEmail[0].defValue = userData.email;

    inputDataPersonal[0].defValue = userData.phoneNumber;
  }

  const [nameOrTel, setNameOrTel] = useState([null, false]);
  const [email, setEmail] = useState([null, false]);
  const [passwordMes, setPasswordMes] = useState([null, false]);

  async function submitHandler(e, url) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const data = {};
    // Body data
    for (const pair of formData.entries()) {
<<<<<<< HEAD
      let input = pair[1];
      if (pair[0] == "phoneNumber") {
        input = pair[1].split(" ").join("");
      }
      data[pair[0]] = input;
=======
      data[pair[0]] = pair[1];
>>>>>>> d26f7cda55573513073816b1ede2bc730122a61e
    }

    const res = await fetch(`/api/account/${url}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const resData = await res.json();

    switch (url) {
      case urlFetch.personal:
        setNameOrTel([resData.message, resData.isErr]);
        break;
      case urlFetch.email:
        setEmail([resData.message, resData.isErr]);
        break;
      case urlFetch.pass:
        setPasswordMes([resData.message, resData.isErr]);
        break;
    }
  }
  return (
    <>
      <section>
<<<<<<< HEAD
        <section className="my-8">
          <h2 className="text-3xl font-semibold text-center">
            Здравей,{" "}
            <span className="text-primary-100">{userData.fullName} </span>!
          </h2>
          <h2 className="text-2xl font-semibold text-center text-gray-200 ">
            Тука може да промените вашите данни
          </h2>
        </section>
=======
        <h2 className="mt-5 mb-5 text-3xl font-semibold text-center">
          Детайли на акаунта
        </h2>
>>>>>>> d26f7cda55573513073816b1ede2bc730122a61e

        <section className="">
          <h4 className="py-1 text-xl font-semibold border-b border-gray">
            Лична информация
          </h4>

          <SectionContainer>
            <InnerSection>
              <p className="text-gray-200 ">
                Тука може да си смените името или телефоният номер. Като
                първоначално са показани попълнените ви данни
              </p>
            </InnerSection>
            <InnerSection>
              {/* Message */}
              {nameOrTel[0] && (
                <Message text={nameOrTel[0]} err={nameOrTel[1]} />
              )}

              <form onSubmit={(e) => submitHandler(e, urlFetch.personal)}>
                <SectionInputs inputs={inputDataPersonal} />
              </form>
            </InnerSection>
          </SectionContainer>
        </section>
        <section className="">
          <h4 className="py-1 text-xl font-semibold border-b border-gray">
            И-мейл адрес
          </h4>
          <SectionContainer>
            <InnerSection>
              <p className="text-gray-200 ">
                Тука може да си смените и-мейл адреса, като трябва да потвърдите
                с текущата си парола
              </p>
              <p className="pt-5 text-sm text-secondary">
                След като си промените и-мейла, трябва да излезнете и пак да се
                логнете, за да използвате акаунта си!
              </p>
            </InnerSection>
            <InnerSection>
<<<<<<< HEAD
              <div className="pb-2 text-gray-200">
                Сегашен и-мейл: {userData.email}
              </div>
              {/* Message */}
              {email[0] && <Message text={email[0]} err={email[1]} />}
=======
              {/* Message */}
              {email[0] && <Message text={email[0]} err={email[1]} />}

>>>>>>> d26f7cda55573513073816b1ede2bc730122a61e
              <form onSubmit={(e) => submitHandler(e, urlFetch.email)}>
                <SectionInputs inputs={inputDataEmail} />
              </form>
            </InnerSection>
          </SectionContainer>
        </section>
        <section className="">
          <h4 className="py-1 text-xl font-semibold border-b border-gray">
            Парола
          </h4>

          <SectionContainer>
            <InnerSection>
              <p className="text-gray-200 ">
                Тука можете да си смените паролата на акаунта
              </p>
            </InnerSection>
            <InnerSection>
              {/* Message */}
              {passwordMes[0] && (
                <Message text={passwordMes[0]} err={passwordMes[1]} />
              )}

              <form onSubmit={(e) => submitHandler(e, urlFetch.pass)}>
                <SectionInputs inputs={inputDataPass} />
              </form>
            </InnerSection>
          </SectionContainer>
        </section>
      </section>
    </>
  );
}
