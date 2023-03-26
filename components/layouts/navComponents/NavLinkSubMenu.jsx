import { useEffect, useState } from "react";

// Icons
import { IoIosArrowDropright, IoIosArrowDropdown } from "react-icons/io";

import LinkComp from "./LinkComp";

import { motion, AnimatePresence } from "framer-motion";

const iconVariant = {
  closed: {
    rotate: 0,
    transition: {
      duration: 0.7,
      type: "spring",
    },
  },
  open: {
    rotate: 90,
    transition: {
      duration: 0.7,
      type: "spring",
    },
  },
};

const ulVariant = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: { duration: 0.5, staggerChildren: 0.095 },
  },
};

function NavLinkSubMenu({ subMenuData, menu, setLoading }) {
  const [isOpen, setIsOpen] = useState(false);

  const subMenu = JSON.parse(subMenuData);

  return (
    <li className="list-none ">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`${
          isOpen ? "text-primary-100" : "text-dark"
        } transition-colors text-left text-[1rem] hover:text-primary pr-3 text-lg`}
      >
        <div className="relative flex items-center justify-center">
          <div className="pb-1 text-lg">{menu}</div>
          <motion.div
            className={` ml-1 text-primary  `}
            animate={isOpen ? "open" : "closed"}
            variants={iconVariant}
            onClick={() => {
              () => setIsOpen(!isOpen);
            }}
          >
            <IoIosArrowDropright />
          </motion.div>
        </div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.ul variants={ulVariant} initial="initial" animate="animate">
            {subMenu.map((item, index) => {
              return (
                <LinkComp
                  key={index}
                  route={item.name}
                  name={item.displayName}
                  setLoading={setLoading}
                />
              );
            })}
          </motion.ul>
        )}
      </AnimatePresence>
    </li>
  );
}
export default NavLinkSubMenu;
