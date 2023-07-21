import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";

import Footer from "./Footer";
import Navbar from "./Navbar";
import Loader from "./Loader";

import { GlobalLoadingContext } from "./GlobalLoadingContext";
import { BsFillTelephoneFill } from "react-icons/bs";

export default function Layout({ children }) {
  const router = useRouter();
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(false);
  }, [router]);
  return (
    <GlobalLoadingContext.Provider value={{ setLoading }}>
      <div className="flex flex-col justify-between min-h-screen">
        <Navbar />
        {children}
        <Footer />
        {isLoading && (
          <div className="fixed z-50 -translate-x-1/2 -translate-y-1/2 bottom-10 right-10">
            <div className="p-3 rounded-full bg-primary-500">
              <Loader w="w-8" h="h-8" />
            </div>
          </div>
        )}
      </div>
      <div className="fixed bottom-0 left-24 container">
        <div className="bg-primary-100 h-44 w-[3px] relative">
      
          <div className="absolute top-0 left-1/2 -translate-x-1/2 border-[2px] border-primary-100 rounded-full">
          <a href="tel:+359879988825" className="text-primary-100 cursor-pointer">
            <div className="pulse flex items-center justify-center text-3xl bg-white px-4 py-3 rounded-full">
            
                <BsFillTelephoneFill />
            </div>
          </a>

          </div>

        </div>
      </div>
    </GlobalLoadingContext.Provider>
  );
}
