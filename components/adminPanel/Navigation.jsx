import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";

import navDictionary from "./navDictionary";
export default function Navigation({ changeCategoryFn }) {
  const router = useRouter();

  const changeCategory = (category, e) => {
    console.log(e);
    // Trigger fragment change to fetch the new data
    router.push(`/adminPanel/#${category}`, undefined, { shallow: true });
  };
  return (
    <aside className="container">
      <ul className="flex gap-2 mt-5">
        <li className="cursor-pointer">
          <Link href="/">Начало</Link>
        </li>

        {navDictionary.map((item) => {
          return (
            <li
              className="cursor-pointer"
              key={item.text}
              onClick={(e) => changeCategory(item.route, e)}
            >
              {item.text}
            </li>
          );
        })}
      </ul>
    </aside>
  );
}
