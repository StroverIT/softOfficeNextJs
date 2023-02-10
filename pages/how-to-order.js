import Head from "next/head";
import React from "react";

import Link from "next/link";
import { BsBoxArrowInLeft } from "react-icons/bs";
import Image from "next/image";
export default function PrivacyPolicy() {
  return (
    <>
      <Head>
        <title>Как да поръчам</title>

        <meta name="robots" content="noindex, nofollow" />
        <meta
          name="description"
          content="Как да поръчам. Запознайте се как да върнете ваша поръчка. За контакти - office@softofficebg.com"
        />
      </Head>
      <section className="px-10 text-black mt-10">
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
            За купуване на продукт може да ни пишете на и-мейл
            <span className="font-semibold pl-1">
              office@softofficebg.com
            </span>{" "}
            , на един от двата ни телефона
          </p>
          <ul className="mt-1">
            <li>
              <span className="font-semibold">Телефон 1:</span> +359 87 998 8825
            </li>
            <li>
              <span className="font-semibold">Телефон 2:</span> +359 87 667 2848
            </li>
          </ul>
          <p>или да поръчате от сайта, като стъпките са следните:</p>
          <section className="mt-2">
            <section>
              <h2 className="font-semibold text-lg">
                1. Натиснете каталог (хамбургера)
              </h2>
              <p>
                Намира се най-горе в дясно, точно до логото
                &quot;SoftOffice.bg&quot;
              </p>
              <div className="relative w-screen h-20">
                <Image
                  src="/how-to-order/nav.png"
                  layout="fill"
                  alt="how-to-order"
                  className="object-contain"
                />
              </div>
            </section>
            <section className="mt-2">
              <h2 className="font-semibold text-lg">
                2. Сложете мишката/натиснете върху една от секциите
              </h2>
              <p>Възможните варианта са</p>
              <ul className="flex gap-x-3 flex-wrap">
                <li>Офис материали</li>
                <li>Техника и консумативи</li>
                <li>Средства за презентация</li>
                <li>Храни и напитки</li>
                <li>Хигиенни средства</li>
                <li>Обзавеждане за офис</li>
                <li>Училищно оборудване</li>
                <li>Услуги</li>
              </ul>
              <div className="relative w-screen h-96">
                <Image
                  src="/how-to-order/second-step.png"
                  layout="fill"
                  alt="how-to-order"
                  className="object-contain"
                />
              </div>
            </section>
            <section className="mt-2">
              <h2 className="font-semibold text-lg">
                3. Кликнете една от подсекциите{" "}
              </h2>
              <p>
                Подсекция се има предвид текста със стрелката отдясно. Ако няма
                стрелка вече се води продукт с неговите разновидности
              </p>
              <div className="relative w-screen h-96">
                <Image
                  src="/how-to-order/third-step.png"
                  layout="fill"
                  alt="how-to-order"
                  className="object-contain"
                />
              </div>
            </section>
            <section className="mt-2">
              <h2 className="font-semibold text-lg">
                4. Изберете вашият продукт
              </h2>

              <div className="relative w-screen h-96">
                <Image
                  src="/how-to-order/four-step.png"
                  layout="fill"
                  alt="how-to-order"
                  className="object-contain"
                />
              </div>
            </section>
            <section className="mt-2">
              <h2 className="font-semibold text-lg">
                5. За да купите натиснете бупона &quot;Купи&quot;{" "}
              </h2>
              <p></p>
              <div className="relative w-screen h-96">
                <Image
                  src="/how-to-order/five-step.png"
                  layout="fill"
                  alt="how-to-order"
                  className="object-contain"
                />
              </div>
            </section>

            <section className="mt-2">
              <h2 className="font-semibold text-lg">
                5.1. За да видите повече за продукта натиснете бутона &quot;Виж
                повече&quot;{" "}
              </h2>
              <p></p>
              <div className="relative w-screen h-96">
                <Image
                  src="/how-to-order/five-step.png"
                  layout="fill"
                  alt="how-to-order"
                  className="object-contain"
                />
              </div>
            </section>
            <section className="mt-2">
              <h2 className="font-semibold text-lg">
                5.2 При повече от една разновидност е възможен бутона
                &quot;Избери повече&quot;. Като го натиснете ще Ви излезне меню
                с всички разновидности{" "}
              </h2>
              <p></p>
              <div className="relative w-screen h-96">
                <Image
                  src="/how-to-order/six-step.png"
                  layout="fill"
                  alt="how-to-order"
                  className="object-contain"
                />
              </div>
            </section>
            <section className="mt-2">
              <h2 className="font-semibold text-lg">
                6. Вече сте "купили" или по-точно сложили продуктите в количката
                си, вече е време да видите продуктите, като натиснете върху
                бутона "Количка"
              </h2>
              <p></p>
              <div className="relative w-screen h-20">
                <Image
                  src="/how-to-order/seven-step.png"
                  layout="fill"
                  alt="how-to-order"
                  className="object-contain"
                />
              </div>
            </section>
            <section className="mt-2">
              <h2 className="font-semibold text-lg">7. Вече сте в количката</h2>
              <p>
                От тук може да контролирате количеството или да премахнете
                вашият продукт
              </p>
              <div className="relative w-screen h-96">
                <Image
                  src="/how-to-order/eight-step.png"
                  layout="fill"
                  alt="how-to-order"
                  className="object-contain"
                />
              </div>
            </section>
            <section className="mt-2">
              <h2 className="font-semibold text-lg">8. Към завършване</h2>
              <p>
                За да завършите вашата поръчка и да отидете към попълване на
                адреса, натиснете бутона "КЪМ ЗАВЪРШВАНЕ". Възможно е да
                изчакате 2-10 секунди.
              </p>
              <div className="relative w-screen h-96">
                <Image
                  src="/how-to-order/nine-step.png"
                  layout="fill"
                  alt="how-to-order"
                  className="object-contain"
                />
              </div>
            </section>
            <section className="mt-2">
              <h2 className="font-semibold text-lg">
                9. Приключване на поръчката
              </h2>
              <p>
                За да завършите напълно вашата поръчка, попълнете всичките
                полета и натиснете бутона "ЗАВЪРШИ ПОРЪЧКАТА"
              </p>
              <div className="relative w-screen h-96">
                <Image
                  src="/how-to-order/ten-step.png"
                  layout="fill"
                  alt="how-to-order"
                  className="object-contain"
                />
              </div>
            </section>
          </section>
        </section>
      </section>
    </>
  );
}
