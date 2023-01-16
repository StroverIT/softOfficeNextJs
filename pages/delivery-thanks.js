import Head from "next/head";
import React, { useEffect, useState } from "react";
import { getSession } from "next-auth/react";
import Check from "../components/animatedComp/Check";
import Link from "next/link";
import style from "../styles/fireWorks.module.css";

export default function DeliveryThanks({ userData }) {
  const [fireWorks, setFireWorks] = useState({
    second: false,
    third: false,
  });
  useEffect(() => {
    setTimeout(() => {
      setFireWorks((prevState) => ({ ...prevState, second: true }));
    }, 1000);
    setTimeout(() => {
      setFireWorks((prevState) => ({ ...prevState, third: true }));
    }, 2500);
  }, []);
  return (
    <>
      <Head>
        <title>Благодарим Ви за вашата поръчка</title>
      </Head>
      <section className={`relative  ${style.bg_gradient}`}>
        <section className="relative z-20 flex items-center justify-center min-h-[90vh]">
          <section className="flex flex-col items-center justify-center py-10 shadow-2xl md:bg-white-50 md:px-10 rounded-xl">
            <div className="w-16 h-16 ">
              <Check />
            </div>
            <section className="mt-5 font-semibold text-center font-roboto flex-center">
              <h1 className="text-4xl text-green-50">
                Успешно направена поръчка
              </h1>
              <h2 className="mt-2 text-2xl text-primary-50">
                Благодарим Ви {userData.fullName}!
              </h2>
            </section>
            <Link href="/account#my-orders">
              <div className="px-10 py-2 mt-10 text-lg font-medium text-white transition-all border rounded-md cursor-pointer border-primary-500 bg-primary-500 hover:text-primary-500 hover:bg-transparent">
                Вижте поръчката
              </div>
            </Link>
          </section>
        </section>
        <section className="">
          <section className="absolute bottom-20 md:bottom-0 left-1/4 ">
            <div className={`${style.firework}`}></div>
            <div className={`${style.firework}`}></div>
            <div className={`${style.firework}`}></div>
          </section>
          {fireWorks.second && (
            <section className="absolute bottom-20 md:bottom-0 left-1/2">
              <div className={`${style.firework}`}></div>
              <div className={`${style.firework}`}></div>
              <div className={`${style.firework}`}></div>
            </section>
          )}
          {fireWorks.third && (
            <section className="absolute bottom-20 md:bottom-0 left-3/4">
              <div className={`${style.firework}`}></div>
              <div className={`${style.firework}`}></div>
              <div className={`${style.firework}`}></div>
            </section>
          )}
        </section>
      </section>
    </>
  );
}

export async function getServerSideProps(context) {
  // Session
  const session = await getSession({ req: context.req });
  let data = {};
  // Mongodb
  if (session) {
    const res = await fetch(`${process.env.NEXTAUTH_URL}/api/getUser`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: session.user.email,
      }),
    });
    data = await res.json();
  }

  return {
    props: {
      userData: JSON.parse(JSON.stringify(data)),
    },
  };
}
