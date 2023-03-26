import React from "react";
import { useRouter } from "next/router";
import Link from "next/link";
// import { translationToRoute } from "../../../utils/translationToRoute";

import { motion } from "framer-motion";

const boxVariant = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: { ease: "easeOut" },
  },
};

function LinkComp({ route, name, isList, isOpen, setLoading }) {
  const router = useRouter();

  route = `/products/${route}`;

  if (route.includes("bittel")) {
    route = `/${route.split("/").splice(2).join("/")}`;
  }

  return (
    <>
      <motion.li
        variants={boxVariant}
        exit={{ opacity: 0, transition: { duration: 0.2 } }}
        onClick={() => {
          router.push(route);

          setLoading(true);
        }}
        className={`hover:translate-x-1  text-[1rem]  cursor-pointer hover:text-primary  transition-transform pl-2 pb-1`}
      >
        {name}
      </motion.li>
    </>
  );
}

export default LinkComp;
