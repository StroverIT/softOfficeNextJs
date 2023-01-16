import * as React from "react";

import { motion } from "framer-motion";
const variants = {
  initial: {
    opacity: 0,
    pathLength: 0,
    // Light green
    stroke: "#3FFF00",
    // DARK GREEN
    // stroke: "hsl(110, 67%, 30%, 0%)"
  },

  animate: {
    opacity: 1,
    pathLength: 1,
    stroke: "#3FFF00",

    // stroke: "hsl(110, 67%, 30%, 100%)",
    transition: {
      duration: 1,
      delay: 0.5,
    },
  },
};
const pathVariant = {
  initial: {
    opacity: 0,
    pathLength: 0,
    stroke: "#3FFF00",

    // stroke: "hsl(110, 67%, 30%, 0%)",
  },
  animate: {
    opacity: 1,
    pathLength: 1,
    stroke: "#3FFF00",

    // stroke: "hsl(110, 67%, 30%, 100%)",

    transition: {
      duration: 1,
      delay: 1.2,
    },
  },
};
const Check = () => (
  <motion.svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 500 500"
    className="stroke-green-50"
    xmlSpace="preserve"
    animate="animate"
    initial="initial"
  >
    <motion.circle
      variants={variants}
      cx={261}
      cy={243.5}
      r={214.6}
      style={{
        fill: "none",
        strokeWidth: 25,
        strokeMiterlimit: 25,
      }}
    />

    <motion.path
      variants={pathVariant}
      style={{
        fill: "none",
        strokeWidth: 25,
        strokeLinejoin: "round",
        strokeMiterlimit: 25,
      }}
      d="m139.4 245.3 98 94.6 154.5-162.4"
    />
  </motion.svg>
);

export default Check;
