import React from "react";

// NextJs
import Head from "next/head";
import Link from "next/link";

export default function ResetPassword() {
  return (
    <>
      <Head>
        <title>IvdaGeo reset password</title>
        <meta name="description" content="Онлайн магазин IvdaGeo" />
      </Head>
      <main>
        <div className="container flex justify-center my-10">
          <div className="container flex flex-col items-center justify-center w-full px-5 py-10 text-center bg-white rounded shadow-xl lg:w-2/3">
            <h3 className="text-2xl text-green">Успешна регистрация!</h3>
            <div className="mt-5 font-light">
              <p>
                За да имате възможността да влезете в акаунта, трябва да го
                потвърдите.
              </p>
              <p className="mt-1 font-medium md:mt-0">
                Изпратени са ви инструкции на вашият имейл адрес.
              </p>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
