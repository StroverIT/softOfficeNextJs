import React from "react";
import { useRouter } from "next/router";

import Link from "next/link";
// import { translationToRoute } from "../../../utils/translationToRoute";

function LinkComp({ route, name }) {
  return (
    <Link href={`/products/${route}`}>
      <li
        className={`hover:translate-x-1  text-[1rem]  cursor-pointer hover:text-primary  transition-transform`}
      >
        {name}
      </li>
    </Link>
  );
}

export default LinkComp;
