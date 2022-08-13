import { useState } from "react";

// NextJS
import Head from "next/head";

// Components
import NavLinks from "../components/layouts/navComponents/navLinks";
import BtnOutlined from "../components/buttons/Outlined";
import Icons from "../components/Icons/Icons";

// Import Swiper React components
import SwiperPag from "../components/swiperJs/SwiperPag";
import SwiperFreeMode from "../components/swiperJs/SwiperFreeMode";
import { getAllLatestTen } from "../services/productService";

// Fetches
import { addNewUser } from "../services/newsletterServiceFetch";
// Notifications
import { toastSuccess, toastError } from "../components/notificataions/Toast";

// Images
const swiperPag = [
  {
    src: "/images/homeBanner/seriqMaster.jpg",
    key: "Серия мастер",
    pageUrl: "/listSeries/master",
  },
  {
    src: "/images/homeBanner/4Seasons.jpg",
    key: "Серия четири сезона",
    pageUrl: "/listSeries/4-seasons",
  },
];
const forUs = [
  {
    src: "/images/AboutUs/slide-1.jpg",
    key: "Image for ivdageo slide 1",
    pageUrl: "/",
  },
  {
    src: "/images/AboutUs/slide-2.jpg",
    key: "Image for ivdageo slide 2",
    pageUrl: "/",
  },
  {
    src: "/images/AboutUs/slide-3.jpg",
    key: "Image for ivdageo slide 3",
    pageUrl: "/",
  },
  {
    src: "/images/AboutUs/slide-4.jpg",
    key: "Image for ivdageo slide 4",
    pageUrl: "/",
  },
  {
    src: "/images/AboutUs/slide-5.jpg",
    key: "Image for ivdageo slide 5",
    pageUrl: "/",
  },
];
[];
export default function Home({ topMonthOfferts }) {
  const [email, setEmail] = useState("");
  const [isLoading, setLoading] = useState(false);

  const emailHandler = (e) => {
    setEmail(e.target.value);
  };
  const newsLetterSubmitHandler = async (e) => {
    setLoading(true);
    e.preventDefault();
    const res = await addNewUser(email);
    const data = await res.json();
    console.log(data);
    if (data.error) {
      toastError(data.error);
    }
    if (data.message) {
      toastSuccess(data.message);
    }
    setLoading(false);
  };
  return (
    <>
      <Head>
        <meta name="description" content="Онлайн магазин IvdaGeo" />
      </Head>

      <main className="mb-auto pb-20 bg-color">
        <section className="">
          <div className="container  mt-10 mb-10 bg-white shadow-lg">
            <section className="lg:grid lg:space-x-2 lg:grid-cols-[25%75%] w-full relative ">
              <section className="z-10 hidden lg:py-2 lg:block">
                <h1 className="pl-3 ml-1 text-lg font-medium xl:block">
                  Категории продукти
                </h1>
                <div className="mt-2">
                  <NavLinks isHome={true} />
                </div>
              </section>
              <section className="relative flex items-center justify-center h-full">
                <SwiperPag images={swiperPag} navSize="3xl" />
              </section>
            </section>
          </div>
        </section>
        <section className="pt-3 pb-2 bg-color mb-5">
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
                            value={email}
                            onChange={emailHandler}
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
                          isLoading={isLoading}
                          onClick={newsLetterSubmitHandler}
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
        <section className="py-5 mb-5">
          <div className="container">
            <h1 className="mb-3 text-xl font-semibold">
              Месечни топ предложения
            </h1>
            <SwiperFreeMode data={topMonthOfferts} navSize="3xl" />
          </div>
        </section>
        <section className=" bg-color mb-5">
          <div className="container ">
            <section className="items-center justify-center grid-cols-2 my-5 lg:grid">
              <div className="mt-5 mb-5 text-center lg:text-left lg:my-0 lg:w-5/6">
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

              <div className="flex items-center justify-center w-full h-full lg:h-96">
                {/* Image  of the shop*/}
                <SwiperPag
                  images={forUs}
                  navSize="3xl"
                  imgHeight_lg="lg:[500px]"
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
  return {
    props: { topMonthOfferts: JSON.parse(JSON.stringify(topMonthOfferts)) },
  };
}
