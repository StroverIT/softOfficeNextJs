<<<<<<< HEAD
import React, { useState } from "react";
=======
import React from "react";
>>>>>>> d26f7cda55573513073816b1ede2bc730122a61e

// Icons
import { AiFillEdit } from "react-icons/ai";

// NextJs
import Head from "next/head";

// Components
import Input from "../components/form/Input";
import OutlinedBtn from "../components/buttons/Outlined";
<<<<<<< HEAD
// Notifications
import { toastSuccess, toastError } from "../components/notificataions/Toast";

export default function ContactUs() {
  const [inputs, setInputs] = useState({
    fullName: "",
    email: "",
    title: "",
    message: "",
  });
  const [isLoading, setLoading] = useState(false);

  const changeHandler = (e) => {
    const name = e.target.name;
    const val = e.target.value;
    setInputs((prevState) => ({
      ...prevState,
      [name]: val,
    }));
  };
  const submitForm = async (e) => {
    e.preventDefault();
    setLoading(true);
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...inputs }),
    };
    const res = await fetch(`/api/sendEmailMessage`, options);
    const data = await res.json();
    if (data.message) {
      toastSuccess(data.message);
    }
    if (data.error) {
      toastError(data.error);
    }
    setLoading(false);
  };
=======

export default function ContactUs() {
>>>>>>> d26f7cda55573513073816b1ede2bc730122a61e
  return (
    <>
      <Head></Head>

      <main className="my-10 lg:my-32">
        <div className="container justify-between grid-cols-2 lg:grid">
          <div>
            <h3 className="text-2xl font-medium uppercase">Контакти</h3>
            <ul className="mt-2 text-gray-250">
<<<<<<< HEAD
              {/* <li className="py-1">
=======
              <li className="py-1">
>>>>>>> d26f7cda55573513073816b1ede2bc730122a61e
                <span className="pr-2 font-semibold text-dark">
                  Заповядайте в нашия магазин:
                </span>
                <br />
<<<<<<< HEAD
                Дружба 2
              </li> */}
              {/* <li className="py-1">
=======
                гр.София ПК-1582 Дружба 2 РУМ Дружба 2 срещу блок 204
              </li>
              <li className="py-1">
>>>>>>> d26f7cda55573513073816b1ede2bc730122a61e
                <span className="pr-2 font-semibold text-dark">
                  Тел. / факс:
                </span>
                02/973 15 85
<<<<<<< HEAD
              </li> */}
              <li className="">
                <span className="pr-1 font-semibold text-dark">Телефон 1:</span>{" "}
                +359 87 667 2848
              </li>
              <li className="">
                <span className="pr-1 font-semibold text-dark">Телефон 2:</span>{" "}
                +359 87 998 8825
              </li>

              <li>
                <span className="pr-1 font-semibold text-dark">И-мейл 1:</span>
                softofficebulgaria@gmail.com
              </li>
              <li>
                <span className="pr-1 font-semibold text-dark">И-мейл 2:</span>
                office@softofficebg.com
              </li>
              <li>
                <span className="pr-1 font-semibold text-dark">Офис:</span>
                Офис: гр. София, Ул. Обиколна Бл. 275
=======
              </li>
              <li className="py-1">
                <span className="pr-1 font-semibold text-dark">GSM:</span> 0888
                900746, 0879 406620
              </li>
              <li>
                <span className="pr-1 font-semibold text-dark">Е-mail:</span>
                softofficepayment@gmail.com
>>>>>>> d26f7cda55573513073816b1ede2bc730122a61e
              </li>
            </ul>
          </div>
          <div className="my-10 lg:flex lg:justify-end lg:my-0">
<<<<<<< HEAD
            <form className=" lg:w-10/12" onSubmit={submitForm}>
              <Input
                type="text"
                placeholder="Име"
                id="fullName"
                isReq={true}
                iconType="fullName"
                onChange={changeHandler}
                val={inputs.fullName}
=======
            <form action="" className=" lg:w-10/12">
              <Input
                type="text"
                placeholder="Име"
                id="name"
                isReq={true}
                iconType="fullName"
>>>>>>> d26f7cda55573513073816b1ede2bc730122a61e
              />
              <Input
                type="email"
                placeholder="И-мейл"
                id="email"
<<<<<<< HEAD
                val={inputs.email}
                isReq={true}
                iconType="email"
                onChange={changeHandler}
=======
                isReq={true}
                iconType="email"
>>>>>>> d26f7cda55573513073816b1ede2bc730122a61e
              />
              <Input
                type="text"
                placeholder="Заглавие"
                id="title"
<<<<<<< HEAD
                val={inputs.title}
                isReq={true}
                iconType="title"
                onChange={changeHandler}
=======
                isReq={true}
                iconType="title"
>>>>>>> d26f7cda55573513073816b1ede2bc730122a61e
              />
              <div className="relative">
                <textarea
                  name="description"
                  id="description"
                  placeholder="Съобщение"
                  className="w-full pt-2 pb-10 pl-6 border placeholder:text-gray-darker"
<<<<<<< HEAD
                  onChange={changeHandler}
                  value={inputs.description}
=======
>>>>>>> d26f7cda55573513073816b1ede2bc730122a61e
                ></textarea>
                <div className="absolute top-[13px] left-1">
                  <AiFillEdit />
                </div>
              </div>
              <div className="mt-1">
<<<<<<< HEAD
                <OutlinedBtn
                  type="submit"
                  text="Изпрати"
                  isLoading={isLoading}
                />
=======
                <OutlinedBtn type="submit" text="Изпрати" />
>>>>>>> d26f7cda55573513073816b1ede2bc730122a61e
              </div>
            </form>
          </div>
        </div>
      </main>
    </>
  );
}
