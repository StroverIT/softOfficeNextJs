import React from "react";
import { MAGAZINE, DELIVERY } from "../../cart/cartCostants";
import { useRouter } from "next/router";

const styling = `text-lg cursor-pointer uppercase bg-primary-100 hover:text-primary-100 hover:bg-transparent border border-primary-100 text-white px-10 py-2 rounded-full`;

export default function Main() {
  const router = useRouter();

  const changeCategory = (category) => {
    // Trigger fragment change to fetch the new data
    router.push(`/adminPanel/#dostavki#${category}`, undefined, {
      shallow: true,
    });
  };
  return (
    <section className="flex flex-wrap items-center justify-around my-20 gap-y-5">
      <div className={`${styling}`} onClick={() => changeCategory(DELIVERY)}>
        за вкъщи
      </div>
    </section>
  );
}
