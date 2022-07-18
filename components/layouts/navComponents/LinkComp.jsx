import React from "react";
import Link from "next/link";
import { translationToRoute } from "../../../utils/translationToRoute";

function LinkComp({ route, mainRoute }) {
  return (
    <Link href={`/products/${translationToRoute(route)}`}>
      <li
        className={`hover:translate-x-1  text-[1rem]  cursor-pointer hover:text-primary  transition-transform`}
      >
        {route}
      </li>
    </Link>
  );
}

export default LinkComp;
