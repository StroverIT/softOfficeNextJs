import React from "react";
import { useRouter } from "next/router";

export default function Main({ products }) {
  const router = useRouter();
  const changeTypeAction = (type) => {
    // Trigger fragment change to fetch the new data
    router.push(`/adminPanel/#prodykti#${type}`, undefined, { shallow: true });
  };
  return (
    <div className="mt-10">
      <div className="flex justify-end">
        <button
          onClick={() => changeTypeAction("create")}
          className="px-5 text-sm border border-green text-green hover"
        >
          Създай продукт
        </button>
      </div>
      <section></section>
    </div>
  );
}
