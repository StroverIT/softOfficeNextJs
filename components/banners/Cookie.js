import Link from "next/link";

import { BsCheckLg } from "react-icons/bs";
import { AnimatePresence, motion } from "framer-motion";

const Cookie = ({ setIsCookie, isCookie }) => {
  return (
    <AnimatePresence mode="wait">
      {isCookie && (
        <motion.section
          initial="initialState"
          animate="animateState"
          exit="exitState"
          transition={{
            duration: 1,
          }}
          variants={{
            initialState: {
              opacity: 0,
              y: "100vh",
            },
            animateState: {
              opacity: 1,
              y: "0",
            },
            exitState: {
              opacity: 0,
              y: "100vh",
            },
          }}
          className={` fixed bottom-0 bg-blue w-full z-[999999]`}
        >
          <section className="flex items-center justify-between px-5 py-10 lg:container max-lg:flex-col md:px-14 gap-y-10">
            <section>
              <h1 className="text-2xl font-semibold text-white">
                Вашата поверителност
              </h1>
              <p className="text-white">
                Ние използваме бисквитки, за да подобрим изживяването ви на
                нашия сайт и да ви покажем подходящи реклами.
              </p>
              <p className="text-white">
                За да научите повече, прочетете нашата{" "}
                <Link href="/legal/privacy-policy" className="pr-1 underline">
                  политика за поверителност
                </Link>
                <Link href="/legal/cookie-policy" className="underline">
                  и политика за бисквитки
                </Link>
              </p>
            </section>
            <section
              className={`font-sans bg-primary-500 text-white rounded-full px-10 py-4 `}
            >
              <button
                aria-label="Приемане на бисквитките"
                type="button"
                onClick={() => setIsCookie(false)}
                className="flex items-center justify-center"
              >
                <span>
                  <BsCheckLg />
                </span>
                <span className="pl-1 font-semibold">Разбрах</span>
              </button>
            </section>
          </section>
        </motion.section>
      )}
    </AnimatePresence>
  );
};

export default Cookie;
