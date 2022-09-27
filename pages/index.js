// NextJS
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
// Components

import BtnOutlined from "../components/buttons/Outlined";
import Icons from "../components/Icons/Icons";

// Import Swiper React components
import SwiperPag from "../components/swiperJs/SwiperPag";
import SwiperFreeMode from "../components/swiperJs/SwiperFreeMode";

// Images
const swiperPag = [
  {
    src: "/carousel/hero_slides_1.png",
    key: "Xerox Performer",
    pageUrl: "/products/hartiq/61eb119d7815ce846f1745b3",
  },
  {
    src: "/carousel/hero_slides_2.png",

    key: "Symbio Copy",
    pageUrl: "/products/hartiq/62262f3ae02d2a7dd0edc147",
  },
  {
    src: "/carousel/hero_slides_3.png",

    key: "Тонер Касета",
    pageUrl: "/products/skeneri/61f4128f031938ea821770f3",
  },
  {
    src: "/carousel/hero_slides_4.png",

    key: "Xerox Business A4",
    pageUrl:
      "/products/hartiq/61eb119d7815ce846f1745bd#61eb119d7815ce846f1745be",
  },
  {
    src: "/carousel/hero_slides_5.png",

    key: "Navigator A4",
    pageUrl: "/products/hartiq/61eb119d7815ce846f1745d2",
  },
  {
    src: "/carousel/ferero.png",

    key: "test carousel for my monday version 6",
    pageUrl: "/products/product",
  },
  {
    src: "/carousel/freedeliveryLego.png",

    key: "test carousel for my monday version 7",
    pageUrl: "/products/product",
  },
];

import { FaShieldAlt } from "react-icons/fa";
import { TiStopwatch } from "react-icons/ti";

export default function Home({ promotions }) {
  return (
    <>
      <Head>
        <title>SoftOffice</title>
        <meta name="description" content="Онлайн магазин SoftOffice" />
      </Head>

      <main className="pb-10 mb-auto bg-color">
        <section>
          <div className="shadow-md ">
            <section className="relative w-full ">
              <section className="relative flex items-center justify-center">
                <SwiperPag images={swiperPag} navSize="3xl" />
              </section>
            </section>
          </div>
        </section>
        <section className="container items-center justify-center my-10 text-5xl sm:flex sm:gap-x-5">
          <div className="flex flex-col items-center justify-center mb-5 sm:mb-0">
            <FaShieldAlt />
            <div className="text-sm font-semibold uppercase">ценова защита</div>
          </div>
          <div className="hidden gray-line sm:block"></div>
          <div className="flex flex-col items-center justify-center">
            <TiStopwatch />
            <div className="text-sm font-semibold uppercase">
              експресна доставка
            </div>
          </div>
        </section>
        {/* Images for edi kakvo si */}

        <section className="container flex flex-wrap items-center justify-center gap-6 py-10 cursor-pointer mb-14">
          <Link href="/products/stolove">
            <div className="relative w-full sm:h-96 md:w-[600px] md:h-[300px] h-[200px] shadow-lg border-gray-300 border">
              <Image
                src="/homeImages/chairForOffices.jpg"
                alt="ivan"
                layout="fill"
              />
              <div className="absolute px-5 py-1 text-white bottom-2 right-2 bg-primary-100">
                Виж повече
              </div>
            </div>
          </Link>
          <Link href="/products/skeneri">
            <div className="relative w-full sm:h-96 md:w-[600px] md:h-[300px] h-[200px] cursor-pointer shadow-lg border-gray-300 border">
              <Image
                src="/homeImages/lazerenPrinter.jpg"
                alt="ivan"
                layout="fill"
              />
              <div className="absolute px-5 py-1 text-white bottom-2 right-2 bg-primary-100">
                Виж повече
              </div>
            </div>
          </Link>
          <Link href="/products/sofas">
            <div className="relative w-full sm:h-96 md:w-[600px] md:h-[300px] h-[200px] cursor-pointer shadow-lg border-gray-300 border">
              <Image src="/homeImages/office.jpg" alt="ivan" layout="fill" />
              <div className="h-full backdrop-blur-[2px]"></div>
              <div className="absolute w-3/4 text-white -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
                <div className="w-full py-6 font-sans text-2xl font-semibold text-center border border-gray-150 bg-dark-transparent">
                  Обзаведи твоят офис
                </div>
              </div>
            </div>
          </Link>
        </section>

        {/* Promotion header */}
        <section className="relative z-10 text-center index-title">
          <h3 className="inline px-4 text-3xl font-medium bg-color">
            Промоции
          </h3>
          <div className="text-xs uppercase cursor-pointer text-primary-100">
            <Link href="/promotions">виж всички</Link>
          </div>
        </section>

        <section className="container mt-10 mb-10">
          <SwiperFreeMode data={promotions} navSize="3xl" />
        </section>
        <section className=" bg-color my-16">
          <div className="container">
            <section className="relative z-10 text-center index-title">
              <h3 className="inline px-4 mt-1 text-3xl font-medium bg-color">
                Онлайн магазин SoftOffice
              </h3>
            </section>
            <section className="items-center justify-center  my-5 lg:grid grid-cols-8">
              <div className="mt-5 text-center sm:mb-5 lg:text-left lg:my-0 lg:w-5/6 py-10 col-span-4 col-start-2">
                <span className="font-semibold text-gray-darker text-xl">
                  Ние от Softoffice сме убедени, че Вие трябва да се чувствате
                  свободни при избора си, затова наш приоритет е предлагане на
                  услуги и комплексни решения от ново поколение, които да дават
                  възможност Вие да покриете изискванията си максимално и да сте
                  100% удовлетворени от партньорството с нас.
                </span>
              </div>

              <div className="relative flex items-center justify-center w-full h-28 lg:h-28 ">
                {/* Image  of the shop*/}

                <Image
                  src="/aboutSoftOffice.png"
                  alt="aboutSoftOffice"
                  layout="fill"
                  objectFit="contain"
                />
              </div>
            </section>
          </div>
        </section>
        {/* <section className="py-5 bg-color">
          <h1 className="text-center">Тука ще има нашите партньори</h1>
        </section> */}
        <section className="pb-2 bg-color">
          <div className="container relative z-20 h-full bg-white shadow-lg">
            <section className="py-5 border custom-border-container border-gray-bord border-l-primary">
              <section className="container grid-cols-2 lg:grid">
                <div className="">
                  <h2 className="mb-1 text-lg font-semibold">
                    SoftOffice бюлетин
                  </h2>
                  <p className="mb-3 text-sm text-dark-400 lg:max-w-lg">
                    Абонирайте се за нашият онлайн бюлетин, за да получавате
                    оферти от нашият онлайн магазин всеки месец!
                  </p>
                </div>
                <div className="relative flex items-center justify-center">
                  <form action="" className="lg:w-10/12">
                    <div className="flex flex-col items-center justify-center md:flex-row">
                      <div className="w-full mt-3 mb-2 lg:-mr-6">
                        <div className="relative mb-2 md:mb-0">
                          <div className="absolute left-0 lg:left-2 z-10 top-2.5 text-lg">
                            <Icons iconType="email" />
                          </div>
                          <input
                            className="w-full px-8 py-2 leading-tight placeholder-transparent border-b appearance-none lg:border peer focus:outline-none focus:shadow-outline border-gray text-dark"
                            id="email"
                            type="email"
                            placeholder="И-мейл за абонамент"
                            required={true}
                            name="email"
                          />
                          <label
                            className="absolute -top-3.5 lg:-top-5 left-0 block mb-2 text-sm  text-gray-darker peer-placeholder-shown:text-base peer-placeholder-shown:px-8  peer-placeholder-shown:top-1.5  transition-all duration-300"
                            htmlFor="email"
                          >
                            И-мейл за абонамент
                          </label>
                        </div>
                      </div>
                      <div className="text-sm md:mt-1 custom-border-input">
                        <BtnOutlined
                          text="изпрати"
                          type="submit"
                          custom="lg:hover:bg-primary-100 lg:hover:text-white"
                        />
                      </div>
                    </div>
                  </form>
                </div>
              </section>
            </section>
          </div>
        </section>
      </main>
    </>
  );
}

export async function getServerSideProps(context) {
  const promotionsRes = await fetch(
    `${process.env.NEXTAUTH_URL}/api/promotions/getAll`
  );
  const data = await promotionsRes.json();

  return {
    props: { promotions: data }, // will be passed to the page component as props
  };
}
