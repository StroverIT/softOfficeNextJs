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

import { AiFillFacebook } from "react-icons/ai";
import FacebookPopup from "../../components/temp/FacebookPopup";
import CreateReview from "../../components/temp/CreateReview";

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
      if (query?.redirect == "delivery") {
        router.push("/delivery");
        return;
      }
      router.push("/account");
    }
  }
  const [facebookLoading, setFacebookLoadin] = useState(false);
  const [createReviewPopup, setCreateReviewPopup] = useState(false);
  const [isTried, setIsTried] = useState(false);
  const [facebookPopUp, setFacebookPopUp] = useState(false);

  useEffect(() => {
    const isFound = localStorage.getItem("alreadyTried");
    if (isFound) {
      setIsTried(true);
    }
  }, []);

  const facebookHandler = (e) => {
    setFacebookLoadin(true);

    if (isTried) {
      setTimeout(async () => {
        setFacebookLoadin(false);
        await signIn("facebook");
      }, 2000);
    }
    if (!isTried) {
      setTimeout(() => {
        setFacebookLoadin(false);
        setFacebookPopUp(true);
      }, 2000);
    }
  };
  return (
    <>
      <Head>
        <title>SoftOffice login page</title>
        <meta name="description" content="Онлайн магазин SoftOffice" />
      </Head>

      <main className="container">
        <div className="justify-center w-full my-24 xl:px-96">
          <div className="w-full pb-10 bg-white rounded shadow-xl xl:p-2">
            {/* States :D */}
            <div className="my-5 ml-8">
              <h3 className="text-2xl font-semibold text-blue">Вход:</h3>
              <p className="mt-1">
                Все още нямате профил?
                <Link href="/account/register">
                  <span className="ml-1 cursor-pointer text-primary-100 hover:font-bold">
                    Регистрация
                  </span>
                </Link>
              </p>
            </div>

            <form className="px-8 mb-4 " onSubmit={(e) => submitHandler(e)}>
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
            <section className="mx-12 mt-12">
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
        {facebookPopUp && <FacebookPopup setPopup={setFacebookPopUp} />}
        {createReviewPopup && <CreateReview setPopup={setFacebookPopUp} />}
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
        destination: "/review/create",
        permanent: false,
      },
    };
  }
  return {
    props: { session, query },
  };
}
