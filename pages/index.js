// NextJS
import Head from "next/head";
import Image from "next/image";

// Components
import NavLinks from "../components/layouts/navComponents/navLinks";
import BtnOutlined from "../components/buttons/Outlined";
import Icons from "../components/Icons/Icons";

// Import Swiper React components
import SwiperPag from "../components/swiperJs/SwiperPag";
import SwiperFreeMode from "../components/swiperJs/SwiperFreeMode";
import { getAllLatestTen } from "../services/productService";

// Images
const swiperPag = [
  {
    src: "/images/testCarousel.jpg",
    key: "test carousel for my monday 1",
    pageUrl: "/products/product",
  },
  {
    src: "/images/testImage2.png",
    key: "test carousel for my monday version 2",
    pageUrl: "/products/product",
  },
  {
    src: "/images/testCarousel.jpg",
    key: "test carousel for my monday version 3",
    pageUrl: "/products/product",
  },
  {
    src: "/images/testImage2.png",
    key: "test carousel for my monday version 4",
    pageUrl: "/products/product",
  },
  {
    src: "/images/testCarousel.jpg",
    key: "test carousel for my monday version 5",
    pageUrl: "/products/product",
  },
  {
    src: "/images/testImage2.png",
    key: "test carousel for my monday version 6",
    pageUrl: "/products/product",
  },
];
const swiperFreeImages = [
  {
    src: "/images/testCarousel.jpg",
    title: "Боя за коса",
    price: 123,
    isPromo: false,
    pageUrl: "/products/product1",
  },
  {
    src: "/images/testCarousel.jpg",
    title: "ШКАФ ЗА БАНЯ С ОГЛЕДАЛО SYNCHRO Т2108-80К",
    price: 123,
    isPromo: false,
    pageUrl: "/products/product2",
  },
  {
    src: "/images/testCarousel.jpg",
    title: "СМЕСИТЕЛ ЗА КУХНЯ FORMA VITA КРИСТАЛ",
    price: 23.94,
    isPromo: true,
    pageUrl: "/products/product3",
  },
  {
    src: "/images/testCarousel.jpg",
    title: "СМЕСИТЕЛ ЗА КУХНЯ FORMA VITA Диамант",
    price: 1000.94,
    isPromo: false,
    pageUrl: "/products/product4",
  },
  {
    src: "/images/testCarousel.jpg",
    title: "Шкаф за обувки",
    price: 10,
    isPromo: false,
    pageUrl: "/products/product5",
  },
  {
    src: "/images/testCarousel.jpg",
    title: "Шкаф за дрехи",
    price: 15,
    isPromo: false,
    pageUrl: "/products/product6",
  },
];

export default function Home({ topMonthOfferts }) {
  return (
    <>
      <Head>
        <title>IvdaGeo</title>
        <meta name="description" content="Онлайн магазин IvdaGeo" />
      </Head>

      <main className="mb-auto bg-color">
        <section className="">
          <div className="container pb-2 mt-10 mb-10 bg-white shadow-lg">
            <section className="lg:grid lg:space-x-2 lg:grid-cols-[25%75%] w-full relative lg:py-2">
              <section className="z-10">
                <h1 className="hidden pl-3 text-lg font-medium xl:block">
                  Категории продукти
                </h1>
                <div className="mt-2">
                  <NavLinks isHome={true} />
                </div>
              </section>
              <section className="relative flex items-center justify-center">
                <SwiperPag images={swiperPag} navSize="3xl" />
              </section>
            </section>
          </div>
        </section>
        <section className="pt-3 pb-2 bg-color">
          <div className="container relative z-20 h-full bg-white shadow-lg">
            <section className="py-5 border custom-border-container border-gray-bord border-l-primary">
              <section className="container grid-cols-2 lg:grid">
                <div className="">
                  <h2 className="mb-1 text-lg font-semibold">
                    ИвдаГео бюлетин
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
                          custom="lg:hover:bg-primary-lighter lg:hover:text-white"
                        />
                      </div>
                    </div>
                  </form>
                </div>
              </section>
            </section>
          </div>
        </section>
        <section className="py-5 ">
          <div className="container">
            <h1 className="mb-3 text-xl font-semibold">
              Месечни топ предложения
            </h1>
            <SwiperFreeMode data={topMonthOfferts} navSize="3xl" />
          </div>
        </section>
        <section className=" bg-color">
          <div className="container">
            <section className="items-center justify-center grid-cols-2 my-5 lg:grid">
              <div className="mt-5 text-center sm:mb-5 lg:text-left lg:my-0 lg:w-5/6">
                <h2 className="py-2 text-2xl font-semibold ">
                  За нас и нашият магазин
                </h2>
                <span className="font-semibold text-center text-gray-darker">
                  Строителен супермаркет Ивда Гео с повече от 20 години опит в
                  търговията със строителни материали, инструменти, крепежни
                  елементи и други. В нашата железария ще намерите винаги богат
                  асортимент от продукти на отлични цени и качествено
                  обслужване. През годините се доказахме като надежден и лоялен
                  партньор в бранша. Ние следим всички нови тенденции и можем да
                  ви предложим решение за всеки индивидуален проект.
                </span>
              </div>

              <div className="relative flex items-center justify-center w-full h-52 lg:h-96">
                {/* Image  of the shop*/}

                <Image
                  src="/images/testCarousel.jpg"
                  alt="atasda"
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
      </main>
    </>
  );
}

export async function getServerSideProps(context) {
  const topMonthOfferts = await getAllLatestTen();
  console.log(topMonthOfferts);

  return {
    props: { topMonthOfferts: JSON.parse(JSON.stringify(topMonthOfferts)) },
  };
}
