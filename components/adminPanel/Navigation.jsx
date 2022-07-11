import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Navigation({ changeCategoryFn }) {
  const router = useRouter();

  const changeCategory = (category) => {
    // Trigger fragment change to fetch the new data
    router.push(`/adminPanel/#${category}`, undefined, { shallow: true });
  };

  return (
    <ul className="flex gap-2">
      <li className="cursor-pointer">
        <Link href="/">Начало</Link>
      </li>
      <li
        className="cursor-pointer"
        onClick={() => changeCategory("deliveries")}
      >
        Доставки
      </li>
      <li className="cursor-pointer" onClick={() => changeCategory("products")}>
        Продукти
      </li>
      <li
        className="cursor-pointer"
        onClick={() => changeCategory("promotions")}
      >
        Промоции
      </li>
      <li className="cursor-pointer" onClick={() => changeCategory("users")}>
        Потребители
      </li>
    </ul>
  );
}
