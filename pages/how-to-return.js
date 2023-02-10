import Head from "next/head";
import React from "react";

import Link from "next/link";
import { BsBoxArrowInLeft } from "react-icons/bs";

export default function PrivacyPolicy() {
  return (
    <>
      <Head>
        <title>Връщане на поръчка</title>

        <meta name="robots" content="noindex, nofollow" />
        <meta
          name="description"
          content="Връщане на поръчка. Запознайте се как да върнете ваша поръчка. За контакти - office@softofficebg.com"
        />
      </Head>
      <section className="container text-black mt-10">
        <div>
          <div className="text-sm mb-10 flex items-center">
            <div className="mr-1 text-lg">
              <BsBoxArrowInLeft />
            </div>
            <Link href="/">Към началната страница</Link>
          </div>
        </div>
        <section className="mt-10 mb-20">
          <p>
            За връщане на поръчка може да ни пишете на и-мейл
            <span className="font-semibold pl-1">
              office@softofficebg.com
            </span>{" "}
            или на един от двата ни телефона
          </p>
          <ul className="mt-1">
            <li>
              <span className="font-semibold">Телефон 1:</span> +359 87 998 8825
            </li>
            <li>
              <span className="font-semibold">Телефон 2:</span> +359 87 667 2848
            </li>
          </ul>
        </section>
      </section>
    </>
  );
}
