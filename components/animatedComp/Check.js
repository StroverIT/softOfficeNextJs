import React from "react";
import { motion } from "framer-motion";

const firstVariants = {
  initial: {
    scale: 0,
    opacity: 0,
  },
  animate: {
    scale: 1,
    opacity: 1,
    transition: {
      duration: 1,
    },
  },
};
const secondVariant = {
  initial: {
    pathLength: 0,
    opacity: 0,
  },
  animate: {
    pathLength: 1,
    opacity: 1,
    transition: {
      duration: 1,
      delay: 0.5,
    },
  },
};
const secondVariant2 = {
  initial: {
    pathLength: 0,
    opacity: 0,
    rotate: 180,
  },
  animate: {
    pathLength: 1,

    opacity: 1,
    transition: {
      duration: 1.1,
      delay: 0.9,
    },
  },
};
const Check = () => {
  return (
    <motion.svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 500 500"
      style={{
        enableBackground: "new 0 0 500 500",
      }}
      xmlSpace="preserve"
      className="stroke-green"
      animate="animate"
      initial="initial"
    >
      <motion.circle
        cx={261}
        cy={243.5}
        r={214.6}
        variants={firstVariants}
        style={{
          fill: "none",
          strokeWidth: 40,
          strokeMiterlimit: 10,
        }}
      />
      <motion.path
        variants={secondVariant2}
        d="m135.7 251.2 96.9 93.5-96.9-93.5z"
        className=""
        style={{
          strokeWidth: 40,
          strokeLinejoin: "round",
          strokeMiterlimit: 10,
        }}
      />
      <motion.path
        variants={secondVariant}
        style={{
          fill: "none",
          strokeWidth: 40,
          strokeLinecap: "round",
          strokeLinejoin: "round",
          strokeMiterlimit: 10,
        }}
        d="M388.2 183.4 233.7 345.8"
      />
    </motion.svg>
  );
};

export default Check;
