import React from "react";

// Icons
import { AiFillEdit } from "react-icons/ai";

// NextJs
import Head from "next/head";

// Components
import Input from "../components/form/Input";
import OutlinedBtn from "../components/buttons/Outlined";

export default function ContactUs() {
  return (
    <>
      <Head></Head>

      <main className="my-10 lg:my-32">
        <div className="container justify-between grid-cols-2 lg:grid">
          <div>
            <h3 className="text-2xl font-medium uppercase">Контакти</h3>
            <ul className="mt-2 text-gray-250">
              <li className="py-1">
                <span className="pr-2 font-semibold text-dark">
                  Заповядайте в нашия магазин:
                </span>
                <br />
                гр.София ПК-1582 Дружба 2 РУМ Дружба 2 срещу блок 204
              </li>
              <li className="py-1">
                <span className="pr-2 font-semibold text-dark">
                  Тел. / факс:
                </span>
                02/973 15 85
              </li>
              <li className="py-1">
                <span className="pr-1 font-semibold text-dark">GSM:</span> 0888
                900746, 0879 406620
              </li>
              <li>
                <span className="pr-1 font-semibold text-dark">Е-mail:</span>
                softofficepayment@gmail.com
              </li>
            </ul>
          </div>
          <div className="my-10 lg:flex lg:justify-end lg:my-0">
            <form action="" className=" lg:w-10/12">
              <Input
                type="text"
                placeholder="Име"
                id="name"
                isReq={true}
                iconType="fullName"
              />
              <Input
                type="email"
                placeholder="И-мейл"
                id="email"
                isReq={true}
                iconType="email"
              />
              <Input
                type="text"
                placeholder="Заглавие"
                id="title"
                isReq={true}
                iconType="title"
              />
              <div className="relative">
                <textarea
                  name="description"
                  id="description"
                  placeholder="Съобщение"
                  className="w-full pt-2 pb-10 pl-6 border placeholder:text-gray-darker"
                ></textarea>
                <div className="absolute top-[13px] left-1">
                  <AiFillEdit />
                </div>
              </div>
              <div className="mt-1">
                <OutlinedBtn type="submit" text="Изпрати" />
              </div>
            </form>
          </div>
        </div>
      </main>
    </>
  );
}
