// React
import React, { useEffect, useState } from "react";
// Icons and images

// Next
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
// Components
import Input from "../../components/form/Input";
import Checkbox from "../../components/base/Checkbox";

import { signIn, getSession } from "next-auth/react";

const Login = ({ query }) => {
  const router = useRouter();
  const [errMess, setErrMess] = useState(null);
  const [isLoading, setLoader] = useState(false);
  async function submitHandler(e) {
    e.preventDefault();
    setLoader(true);

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email");
    const password = formData.get("password");
    const status = await signIn("credentials", {
      redirect: false,
      email: email,
      password: password,
    });
    if (status.error) {
      setErrMess(status.error);
      setLoader(false);
    }
    if (status.url) {
      if (query) {
        router.push("/delivery");
        return;
      }
      router.push("/account");
    }
  }

  return (
    <>
      <Head>
        <title>IvdaGeo login page</title>
        <meta name="description" content="Онлайн магазин IvdaGeo" />
      </Head>

      <main className="container">
        <div className=" justify-center my-24 xl:grid xl:grid-cols-[70%30%] w-full">
          <div className="relative hidden w-full h-[500px] ml-2 xl:block">
            <Image
              src="/images/magazin1.jpg"
              layout="fill"
              alt="test"
              objectFit="fill"
            />
          </div>
          <div className="w-full bg-white rounded shadow-xl xl:p-2">
            <div className="my-5 ml-8">
              <h3 className="text-2xl">Влезте във вашият акаунт</h3>
              <p className="mt-1">
                Все още нямате профил?
                <Link href="/account/register">
                  <span className="ml-1 cursor-pointer text-primary-lighter hover:font-bold">
                    Регистрация
                  </span>
                </Link>
              </p>
            </div>

            <form
              className="px-8 pt-6 mb-4 "
              onSubmit={(e) => submitHandler(e)}
            >
              {errMess && (
                <div className="mb-5 font-medium text-center text-secondary">
                  {errMess}
                </div>
              )}

              <Input
                placeholder="И-мейл"
                type="email"
                id="email"
                isReq={true}
                iconType="email"
              />
              <Input
                placeholder="Парола"
                type="password"
                id="password"
                isReq={true}
                iconType="password"
              />
              {/* <div className="flex justify-between my-8 select-none">
                <div>
                  <Checkbox text="Запомни ме" id="rememberMe" />
                </div>
              </div> */}
              <div className="flex items-center justify-center ">
                <button
                  className="flex items-center justify-center w-full px-4 py-2 font-bold text-white rounded shadow-md bg-primary hover:bg-primary focus:outline-none focus:shadow-outline"
                  type="submit"
                >
                  {isLoading ? <div className="loader"></div> : "Вход"}
                </button>
              </div>
            </form>
            <div className="flex flex-col items-center justify-center pb-3">
              <div className={` `}>
                <Link href="/account/resetPassword">
                  <a
                    className="inline-block text-sm align-baseline hover:font-bold text-primary-lighter"
                    href="#"
                  >
                    Забравена парола
                  </a>
                </Link>
              </div>
              <div>
                <Link href="/account/resendVerification">
                  <a
                    className="inline-block text-sm align-baseline hover:font-bold text-primary-lighter"
                    href="#"
                  >
                    Потвърждаване на акаунт
                  </a>
                </Link>
              </div>
            </div>
          </div>

          {/* Image is the something of IvdaGeo */}
        </div>
      </main>
    </>
  );
};

export default Login;

export async function getServerSideProps(context) {
  const { query } = context;
  const session = await getSession({ req: context.req });

  if (session) {
    return {
      redirect: {
        destination: "/account",
        permanent: false,
      },
    };
  }
  return {
    props: { session, query },
  };
}
