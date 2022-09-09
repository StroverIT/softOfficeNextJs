import React from "react";
import { useRouter } from "next/router";
import Link from "next/link";
// import { translationToRoute } from "../../../utils/translationToRoute";

function LinkComp({ route, name }) {
  const router = useRouter();

  return (
    <li
      onClick={() => router.push(`/products/${route}`)}
      className={`hover:translate-x-1  text-[1rem]  cursor-pointer hover:text-primary  transition-transform`}
    >
      {name}
    </li>
  );
}

export default LinkComp;
