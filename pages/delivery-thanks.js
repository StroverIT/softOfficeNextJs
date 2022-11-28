import Head from "next/head";
import React from "react";
import { getSession } from "next-auth/react";
import Check from "../components/animatedComp/Check";
import Link from "next/link";
export default function DeliveryThanks({ userData }) {
  return (
    <>
      <Head>
        <title>Благодарим Ви за вашата поръчка</title>
      </Head>
      <section className="">
        <section className="container">
          <section className="flex flex-col items-center justify-center">
            <div className="w-16 h-16 ">
              <Check />
            </div>
            <section className="font-semibold text-center font-roboto">
              <h1 className="flex mt-2 text-4xl text-primary-50 ">
                Благодарим Ви,
                <Link href="/account">
                  <span className="pl-1 underline cursor-pointer">
                    {userData.fullName}
                  </span>
                </Link>
              </h1>
              <h4 className="text-3xl text-gray-500">За вашата поръчка</h4>
            </section>
            <Link href="/account#my-orders">
              <div className="px-10 py-2 mt-10 text-lg font-medium text-white transition-all border rounded-md cursor-pointer border-primary-500 bg-primary-500 hover:text-primary-500 hover:bg-transparent">
                Вижте поръчката
              </div>
            </Link>
          </section>
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
