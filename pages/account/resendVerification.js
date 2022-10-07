import React, { useState } from "react";

// NextJs
import Head from "next/head";

// Components
import Input from "../../components/form/Input";

function MessageStatus({ isErr, text }) {
  return (
    <div
      className={`mt-5 -mb-3 text-center ${
        isErr ? "text-secondary" : "text-green"
      } `}
    >
      {text}
    </div>
  );
}

export default function ResetPassword() {
  const [message, setMessage] = useState([null, false]);
  const [isLoading, setLoader] = useState(false);
  async function submitHandler(e) {
    e.preventDefault();
    setLoader(true);
    const formData = new FormData(e.target);
    const email = formData.get("email");
    const res = await fetch("/api/account/forgotten/verifyingAcc", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });
    const data = await res.json();
    setMessage([data.message, data.isErr]);
<<<<<<< HEAD
    setLoader(false);
=======
>>>>>>> d26f7cda55573513073816b1ede2bc730122a61e
  }

  return (
    <>
      <Head>
        <title>SoftOffice resend verification</title>
        <meta name="description" content="Онлайн магазин SoftOffice" />
      </Head>
      <main>
        <div className="container flex justify-center my-10">
          <div className="w-full bg-white rounded shadow-xl lg:w-1/2">
            <div className="mt-5 ml-8">
              <h3 className="text-3xl text-center ">Верификация на акаунта</h3>
<<<<<<< HEAD
              <p className="mt-5 text-sm">
=======
              <p className="mt-5 font-thin">
>>>>>>> d26f7cda55573513073816b1ede2bc730122a61e
                За да имате възможността да си влезете в акаунта, трябва да си
                потвърдите акаунта. След като си напишете и-мейла, ще ви се
                пратят инструкции
              </p>
              {/* <div className="my-2 text-secondary">
                <ul>
                  {errorMessage.map((e) => {
                    return <li key={e}>{e}</li>;
                  })}
                </ul>
              </div> */}
            </div>
            {message[0] && (
              <MessageStatus text={message[0]} isErr={message[1]} />
            )}
            <form className="px-8 pt-1 pb-8 mt-6 mb-4" onSubmit={submitHandler}>
              <Input
                placeholder="И-мейл"
                type="email"
                id="email"
                isReq={true}
                iconType="email"
              />

              <div className="flex items-center justify-center ">
                <button
<<<<<<< HEAD
                  className="flex items-center justify-center w-full px-4 py-2 font-bold text-white rounded shadow-md disabled:opacity-25 bg-primary hover:bg-primary focus:outline-none focus:shadow-outline"
                  type="submit"
                >
                  {isLoading ? <div className="loader "></div> : "Изпрати"}
=======
                  className="w-full px-4 py-2 font-bold text-white rounded shadow-md disabled:opacity-25 bg-primary hover:bg-primary focus:outline-none focus:shadow-outline"
                  type="submit"
                >
                  Изпрати
>>>>>>> d26f7cda55573513073816b1ede2bc730122a61e
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </>
  );
}
