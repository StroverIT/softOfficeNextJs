import { useState } from "react";

// Icons
import { IoIosArrowDropright, IoIosArrowDropdown } from "react-icons/io";

import LinkComp from "./LinkComp";

function NavLinkSubMenu({ subMenuData }) {
  const [isOpen, setIsOpen] = useState(false);

  const data = JSON.parse(subMenuData);
  const subMenu = data.subMenu;
  return (
    <li className="list-none ">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`${
          isOpen ? "text-primary-lighter" : ""
        } transition-colors text-left text-[1rem] hover:text-primary pr-3`}
      >
        <div className="relative flex items-center justify-center">
          {data.menu}
          <div className="absolute -translate-y-1/2 top-1/2 -right-5 text-primary">
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
