/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from "react";

// Icons
import { ImExit } from "react-icons/im";
// NextJs
import Head from "next/head";
import { useRouter } from "next/router";
// Mongodb

// Account components
import MyDetails from "../../components/account/MyDetails/index";
import MyOrders from "../../components/account/MyOrders/index";
import MyFavourites from "../../components/account/MyFavourites";

// Auth
import { getSession, signOut } from "next-auth/react";
import { HiX } from "react-icons/hi";

export default function Index({ userData, deliveriesData, favData }) {
  const router = useRouter();
  const [categoryData, setCategoryData] = useState(null);
  const myDetails = useRef(null);
  const myOrders = useRef(null);
  const myFavourites = useRef(null);
  const [isShowed, setIsShowed] = useState(null);

  const changeCategory = (category) => {
    // Trigger fragment change to fetch the new data
    router.push(`/account/#${category}`, undefined, { shallow: true });
  };
  useEffect(() => {
    const categoryComp = {
      "#account-details": [
        <MyDetails userData={userData} key="MyDetails" />,
        myDetails,
      ],
      "#my-orders": [
        <MyOrders key="MyOrders" deliveriesData={deliveriesData} />,
        myOrders,
      ],
      "#my-favourites": [
        <MyFavourites key="MyFavourites" favData={favData.data} />,
        myFavourites,
      ],
    };
    const someData =
      categoryComp[window.location.hash] ?? categoryComp["#account-details"]; // Retrieve data based on URL fragment
    setCategoryData(someData[0]);
    for (let category in categoryComp) {
      categoryComp[category][1].current.classList.remove("acc-active");
      categoryComp[category][1].current.classList.add(
        "hover:bg-primary-0",
        "hover:text-primary"
      );
    }
    someData[1].current.classList.add("acc-active");
    someData[1].current.classList.remove(
      "hover:bg-primary-0",
      "hover:text-primary"
    );
  }, [router, userData]);
  useEffect(() => {
    const isFound = localStorage.getItem("messagePopup");

    if (!isFound) {
      setIsShowed(true);
      localStorage.setItem("messagePopup", "true");
    }
  }, []);
  function signOutFn() {
    const isFound = localStorage.getItem("messagePopup");

    if (isFound) {
      localStorage.removeItem("messagePopup", "false");
    }
    signOut();
  }
  return (
    <>
      <Head>
        <title>SoftOffice my account</title>
        <meta name="description" content="Онлайн магазин SoftOffice" />
      </Head>
      <main className="mb-auto">
        <div className="">
          <div className="container items-start justify-center">
            <h3 className="text-3xl pt-7">Моят акаунт</h3>
            <div className="lg:grid grid-cols-[20%80%] gap-10 my-10  relative ">
              <aside className="mb-4  md:mb-0 bg-[#f5f5f5]  my-2 h-full">
                <ul className="sticky flex-wrap justify-center py-5 text-sm text-left top-28 sm:space-x-4 sm:flex lg:flex-col lg:space-x-0 lg:space-y-2">
                  <li className="my-1 cursor-pointer " ref={myDetails}>
                    {/*"Icon"*/}
                    <button
                      onClick={() => changeCategory("account-details")}
                      type="button"
                      className="flex w-full h-full px-2 py-2 font-semibold"
                    >
                      Моите детайли
                    </button>
                  </li>
                  <li className="my-1 cursor-pointer" ref={myOrders}>
                    {/*"Icon"*/}
                    <button
                      onClick={() => changeCategory("my-orders")}
                      type="button"
                      className="flex w-full h-full px-2 py-2 font-semibold"
                    >
                      Направени поръчки
                    </button>
                  </li>
                  <li className="my-1 cursor-pointer " ref={myFavourites}>
                    <button
                      onClick={() => changeCategory("my-favourites")}
                      type="button"
                      className="flex w-full h-full px-2 py-2 font-semibold"
                    >
                      Любими продукти
                    </button>
                  </li>
                  {userData?.role == "admin" && (
                    <li className="pt-2 pb-5 my-1 sm:pt-0 sm:pb-1 lg:pt-10 ">
                      <button
                        onClick={() => router.push("/adminPanel")}
                        className="px-2 py-2 text-sm font-semibold text-white border rounded-lg bg-primary-100 hover:bg-transparent border-primary-100 hover:text-primary-100"
                      >
                        Админ панел
                      </button>
                    </li>
                  )}
                  {userData?.role == "boss" && (
                    <li className="pt-2 pb-5 my-1 sm:pt-0 sm:pb-1 lg:pt-10 ">
                      <button
                        onClick={() => router.push("/workersDeliveries")}
                        className="px-2 py-2 text-sm font-semibold text-white border rounded-lg bg-primary-100 hover:bg-transparent border-primary-100 hover:text-primary-100"
                      >
                        Доставки на работниците
                      </button>
                    </li>
                  )}
                  <li
                    className={`pt-10 pb-5 my-1 sm:pt-0 sm:pb-0 ${
                      userData?.role != "admin" ? "lg:pt-10" : "lg:pt-2"
                    } `}
                  >
                    <button
                      type="button"
                      className="flex items-center justify-center h-full px-5 py-2 text-sm font-semibold text-white border cursor-pointer bg-secondary hover:bg-transparent hover:text-secondary border-secondary"
                      onClick={() => signOutFn()}
                    >
                      <div className="mr-1">
                        <ImExit />
                      </div>
                      Изход
                    </button>
                  </li>
                </ul>
              </aside>
              <div className="absolute bg-[#f5f5f5] w-full h-full lg:-left-10 -z-20 "></div>

              <section className="min-h-full bg-white border border-gray">
                <div className="container">{categoryData}</div>
              </section>
            </div>
          </div>
        </div>
        {isShowed && (
          <div className="fixed top-0 left-0 z-20 w-screen h-screen">
            <div
              className="relative z-10 w-full h-screen cursor-pointer blury-noProps"
              onClick={() => setIsShowed(false)}
            ></div>

            <div className="absolute z-20 w-full overflow-auto -translate-x-1/2 -translate-y-1/2 bg-gray-100 h-2/3 md:h-2/3 md:w-11/12 lg:w-6/12 top-1/2 left-1/2 ">
              <div className="relative ">
                <div
                  className="sticky top-0 z-50 flex justify-end mr-2 text-3xl cursor-pointer right-1"
                  onClick={() => setIsShowed(false)}
                >
                  <HiX />
                </div>
                <div className="flex items-center justify-center w-full h-full">
                  <div className="max-w-4xl p-5 overflow-auto text-lg">
                    <div className="mb-1 text-xl text-primary">
                      Уважаеми клиенти!
                    </div>
                    <div className="mb-1">
                       ПРОМЕНИ В СВЕТОВЕН МАЩАБ НАЛАГАТ
                      ПОСТОЯННА АКТУАЛИЗАЦИЯ НА ЦЕНИТЕ НА НАШИТЕ ПРОДУКТИ,ПОРАДИ
                      КОЕТО ЦЕНИТЕ В НАСТОЯЩИЯ НИ КАТАЛОГ ВЕЧЕ НЕ СА ВАЛИДНИ.
                      Информация за актуални цени , промоции и условия за доставка
                      можете да намерите в нашия сайт или се свържете с нас на
                      телефон:+359 87 99 888 25/+359 88 888 46 87.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </>
  );
}
export async function getServerSideProps(context) {
  const method = "POST";
  const headers = { "Content-Type": "application/json" };
  // Session
  const session = await getSession({ req: context.req });
  if (!session) {
    return {
      redirect: {
        destination: "/account/login",
        permanent: false,
      },
    };
  }
  // Mongodb
  const res = await fetch(`${process.env.NEXTAUTH_URL}/api/getUser`, {
    method,
    headers,
    body: JSON.stringify({
      email: session.user.email,
    }),
  });
  const data = await res.json();
  const deliveriesRes = await fetch(
    `${process.env.NEXTAUTH_URL}/api/account/deliveries/getAll`,
    {
      method,
      headers,
      body: JSON.stringify({ ownerId: data._id }),
    }
  );

  let deliveriesData = await deliveriesRes.json();

  const favouritesRes = await fetch(
    `${process.env.NEXTAUTH_URL}/api/account/favourites/getAll`,
    {
      method,
      headers,
      body: JSON.stringify({ ownerId: data._id }),
    }
  );
  const favData = await favouritesRes.json();

  return {
    props: {
      userData: JSON.parse(JSON.stringify(data)),
      deliveriesData,
      favData,
    },
  };
}
