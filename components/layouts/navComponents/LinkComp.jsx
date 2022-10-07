import React from "react";
<<<<<<< HEAD
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
=======
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
>>>>>>> d26f7cda55573513073816b1ede2bc730122a61e
  );
}

export default LinkComp;
