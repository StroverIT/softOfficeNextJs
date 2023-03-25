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
import { AiFillFacebook } from "react-icons/ai";

import { toastError } from "../../components/notificataions/Toast";

const Login = ({ query, session }) => {
  const router = useRouter();
  const [errMess, setErrMess] = useState(null);
  const [isLoading, setLoader] = useState(false);
  const [facebookLoading, setFacebookLoadin] = useState(false);

  const facebookHandler = async (e) => {
    setFacebookLoadin(true);

    await signIn("facebook");

    setFacebookLoadin(false);
  };
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
      if (query?.redirect == "delivery") {
        router.push("/delivery");
        return;
      }
      router.push("/account");
    }
  }
  useEffect(() => {
    const error = query?.error;

    if (error?.includes("error")) {
      const message = error.split("error: ");
      toastError(message[1]);
    }
  }, [query, router]);
  return (
    <>
      <Head>
        <title>SoftOffice login page</title>
        <meta name="description" content="Онлайн магазин SoftOffice" />
      </Head>

      <main className="container">
        <div className="justify-center w-full my-24 xl:px-96">
          <div className="w-full pb-10 bg-white rounded shadow-xl xl:pt-2 xl:px-2">
            {/* States :D */}
            <div className="my-5 ml-8">
              <h3 className="text-2xl">Влезте във вашият акаунт</h3>
              <p className="mt-1">
                Все още нямате профил?
                <Link href="/account/register">
                  <span className="ml-1 cursor-pointer text-primary-100 hover:font-bold">
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
                    className="inline-block text-sm align-baseline hover:font-bold text-primary-100"
                    href="#"
                  >
                    Забравена парола
                  </a>
                </Link>
              </div>
              <div>
                <Link href="/account/resendVerification">
                  <a
                    className="inline-block text-sm align-baseline hover:font-bold text-primary-100"
                    href="#"
                  >
                    Потвърждаване на акаунт
                  </a>
                </Link>
              </div>
            </div>
            <section className="mx-12 mt-12 cursor-pointer">
              <div
                className="bg-[#4267b2]  text-white grid grid-cols-[20%65%] p-2 rounded-md"
                onClick={facebookHandler}
              >
                <div className="text-3xl ">
                  <AiFillFacebook />
                </div>
                <div className="flex items-center justify-center">
                  {facebookLoading ? (
                    <div className="loader"></div>
                  ) : (
                    "Вход с Facebook"
                  )}
                </div>
              </div>
            </section>
          </div>

          {/* Image is the something of SoftOffice */}
        </div>
      </main>
    </>
  );
};

export default Login;

export async function getServerSideProps(context) {
  const { query } = context;
  const session = await getSession({ req: context.req });
  const isError = session?.user?.email;
  if (session && !isError?.includes("error")) {
    return {
      redirect: {
        destination: "/account",
        permanent: false,
      },
    };
  }
  if (isError) {
    query.error = isError;
  }
  return {
    props: { session, query },
  };
}
