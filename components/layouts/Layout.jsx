import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";

import Footer from "./Footer";
import Navbar from "./Navbar";
import Loader from "./Loader";

import { GlobalLoadingContext } from "./GlobalLoadingContext";

import { BsFillTelephoneFill } from "react-icons/bs";
import { FiPhoneCall } from "react-icons/fi";
import { HiOutlineMail,  } from "react-icons/hi";
import {
 
  FaViber,
} from "react-icons/fa";
import { AnimatePresence, motion } from "framer-motion";



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
      <div className="container fixed bottom-0 z-30 max-lg:hidden left-24">
        <div className="bg-primary-100 h-36 w-[3px] relative">
      
          <div className="absolute -top-14 left-1/2 -translate-x-1/2 border-[2px] border-primary-100 rounded-full">
          <a href="tel:+359879988825" className="cursor-pointer text-primary-100">
            <div className="flex items-center justify-center px-4 py-3 text-3xl rounded-full pulse">
            
                <BsFillTelephoneFill />
            </div>
          </a>

          </div>

        </div>
      </div>
        
          <motion.section
            key="subsectionMenuTel"
            initial="initialState"
            animate="animateState"
            exit="exitState"
            transition={{
              duration: 0.9,
            }}
            variants={{
              initialState: {
                y: "100vw",
              },
              animateState: {
                opacity: 1,
                y: 0,
              },
              exitState: {
                y: "100vw",
              },
            }}
            className="fixed bottom-0 w-full bg-[#0D6EFD] lg:hidden z-20"
          >
            <div className="container flex items-center justify-between py-4 text-2xl text-white max-sm:px-10 text-blue-250">
              <div>
                <a
                  href="tel:+359879988825"
                  aria-label="Button for calling on telehone"
                >
                  <FiPhoneCall />
                </a>
              </div>

              <div>
                <a
                  href="mailto:office@softofficebg.com"
                  aria-label="Button for writting on email"
                >
                  <HiOutlineMail />
                </a>
              </div>
              <div>
                <a
                  href="viber://chat?number=+359879988825"
                  aria-label="Button for calling on viber"
                >
                  <FaViber />
                </a>
              </div>
            </div>
          </motion.section>
    </GlobalLoadingContext.Provider>
  );
}
