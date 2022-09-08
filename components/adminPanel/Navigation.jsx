import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

import navDictionary from "./navDictionary";
export default function Navigation() {
  const router = useRouter();

  const [isCategory, setIsCategory] = useState(null);

  useEffect(() => {
    const hash = window.location.hash?.split("#");

    setIsCategory(hash[1]);
  }, [router]);
  const changeCategory = (category) => {
    // Trigger fragment change to fetch the new data
    router.push(`/adminPanel/#${category}`, undefined, { shallow: true });
  };
  return (
    <aside className="container text-center shadow-lg bg-primary sm:rounded-bl-full sm:rounded-br-full">
      <ul className="grid items-center justify-center gap-2 text-white sm:flex grid-col-1 xs:grid-cols-2">
        <li className="p-2 font-medium cursor-pointer hover:bg-primary-0 hover:text-green">
          <Link href="/">Начало</Link>
        </li>

        {navDictionary.map((item) => {
          return (
            <li
              className={`cursor-pointer hover:bg-primary-0 p-2 font-medium hover:text-green
              ${item.route == isCategory && "text-green"}
              `}
              key={item.text}
              onClick={() => changeCategory(item.route)}
            >
              {item.text}
            </li>
          );
        })}
      </ul>
    </aside>
  );
}
