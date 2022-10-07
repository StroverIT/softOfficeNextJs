import { useState } from "react";

// Icons
import { IoIosArrowDropright, IoIosArrowDropdown } from "react-icons/io";

import LinkComp from "./LinkComp";

<<<<<<< HEAD
function NavLinkSubMenu({ subMenuData, menu }) {
  const [isOpen, setIsOpen] = useState(false);

  const subMenu = JSON.parse(subMenuData);
=======
function NavLinkSubMenu({ subMenuData }) {
  const [isOpen, setIsOpen] = useState(false);

  const data = JSON.parse(subMenuData);
  const subMenu = data.subMenu;
>>>>>>> d26f7cda55573513073816b1ede2bc730122a61e
  return (
    <li className="list-none ">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`${
<<<<<<< HEAD
          isOpen ? "text-primary-100" : ""
        } transition-colors text-left text-[1rem] hover:text-primary pr-3`}
      >
        <div className="relative flex items-center justify-center">
          {menu}
          <div className="absolute -translate-y-1/2 top-1/2 -right-5 text-primary">
=======
          isOpen ? "text-primary-lighter" : ""
        } transition-colors text-left text-[1rem] hover:text-primary pr-3`}
      >
        <div className="flex items-center justify-center relative">
          {data.menu}
          <div className="absolute top-1/2 -translate-y-1/2 -right-5  text-primary">
>>>>>>> d26f7cda55573513073816b1ede2bc730122a61e
            {isOpen ? <IoIosArrowDropdown /> : <IoIosArrowDropright />}
          </div>
        </div>
      </button>
      {isOpen && (
        <ul>
          {subMenu.map((item, index) => {
<<<<<<< HEAD
            return (
              <LinkComp
                key={item.name}
                route={item.name}
                name={item.displayName}
              />
            );
=======
            return <LinkComp key={item} route={item} />;
>>>>>>> d26f7cda55573513073816b1ede2bc730122a61e
          })}
        </ul>
      )}
    </li>
  );
}
export default NavLinkSubMenu;
