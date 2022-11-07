import { useState } from "react";

// Icons
import { IoIosArrowDropright, IoIosArrowDropdown } from "react-icons/io";

import LinkComp from "./LinkComp";

function NavLinkSubMenu({ subMenuData, menu }) {
  const [isOpen, setIsOpen] = useState(false);

  const subMenu = JSON.parse(subMenuData);
  return (
    <li className="list-none ">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`${
          isOpen ? "text-primary-100" : ""
        } transition-colors text-left text-[1rem] hover:text-primary pr-3`}
      >
        <div className="relative flex items-center justify-center">
          {menu}
          <div className="absolute -translate-y-1/2 bottom-1/2 -right-5 text-primary">
            {isOpen ? <IoIosArrowDropdown /> : <IoIosArrowDropright />}
          </div>
        </div>
      </button>
      {isOpen && (
        <ul>
          {subMenu.map((item, index) => {
            return (
              <LinkComp
                key={item.name}
                route={item.name}
                name={item.displayName}
              />
            );
          })}
        </ul>
      )}
    </li>
  );
}
export default NavLinkSubMenu;
