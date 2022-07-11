import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

import navDictionary from "./navDictionary";
export default function Navigation() {
  const router = useRouter();

  const [isCategory, setIsCategory] = useState(null);

  useEffect(() => {
    const hash = window.location.hash.slice(1);

    setIsCategory(hash);
  }, [router]);
  const changeCategory = (category) => {
    // Trigger fragment change to fetch the new data
    router.push(`/adminPanel/#${category}`, undefined, { shallow: true });
  };
  return (
    <aside className="container bg-primary shadow-lg  sm:rounded-bl-full sm:rounded-br-full text-center">
      <ul className="sm:flex gap-2  items-center justify-center grid-col-1 xs:grid-cols-2 grid text-white">
        <li className="cursor-pointer hover:bg-primary-0 hover:text-green p-2 font-medium">
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
