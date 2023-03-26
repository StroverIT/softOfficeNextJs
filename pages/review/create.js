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
import CreateStar from "../../lib/createProduct/CreateStar";
import Loader from "../../components/layouts/Loader";

const Create = ({ session }) => {
  console.log(session);
  const router = useRouter();
  const [isLoading, setLoader] = useState(false);
  const [stars, setStars] = useState(0);
  const [inputs, setInputs] = useState({
    comment: "",
  });
  async function submitHandler(e) {
    e.preventDefault();
    setLoader(true);

    const res = await fetch("/api/account/review", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ stars, comment: inputs.comment }),
    });
    const data = res.json();
    if ((data.message = "Успешно")) {
      router.push("/");
    }
  }
  const handler = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const starChangeHandler = (val) => {
    setStars(val);
  };
  return (
    <>
      <Head>
        <title>SoftOffice login page</title>
        <meta name="description" content="Онлайн магазин SoftOffice" />
      </Head>

      <main className="container">
        <div className="fixed top-0 left-0 w-screen h-screen bg-[#f0f2f5] z-50 overflow-auto flex items-center justify-center ">
          <div className="relative mt-10 w-full">
            <section className="py-5 mx-4 bg-white rounded-md shadow-facebook ">
              <section className="container">
                <div className="flex items-center justify-center mt-3 mb-3">
                  <div className="relative h-16 w-16 rounded-full "></div>
                </div>

                <div className="flex items-center justify-center">
                  <CreateStar onChange={starChangeHandler} />
                </div>
                <form autoComplete="off" onSubmit={submitHandler}>
                  <div className="pt-4">
                    <input
                      type="text"
                      value={inputs.comment}
                      onChange={handler}
                      name="comment"
                      autoComplete="off"
                      placeholder="Коментар"
                      className="w-full px-4 py-3 text-lg border rounded-md border-[#dddfe2] font-meidum placeholder-[#dddfe2] outline-0 "
                    />
                  </div>

                  <div className="w-full mt-4">
                    <button
                      className="bg-[#166fe5] text-white w-full py-2 rounded-md font-semibold text-2xl flex justify-center items-center"
                      onClick={() => setLoader(true)}
                    >
                      {isLoading ? <Loader /> : "Създай"}
                    </button>
                  </div>
                </form>
              </section>
            </section>
          </div>
        </div>
      </main>
    </>
  );
};

export default Create;

export async function getServerSideProps(context) {
  const { query } = context;
  const session = await getSession({ req: context.req });

  if (!session) {
    return {
      redirect: {
        destination: "/review/login",
        permanent: false,
      },
    };
  }
  return {
    props: { session, query },
  };
}
