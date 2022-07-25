import { useRouter } from "next/router";
import React from "react";
import { BsArrowReturnLeft } from "react-icons/bs";

import Product from "./Product";

export default function Section({ delivery }) {
  const router = useRouter();

  return (
    <section className="my-10">
      <div className="mb-5">
        <button
          className="my-5 text-2xl text-primary-lighter"
          onClick={() => router.push("/adminPanel#dostavki")}
        >
          <BsArrowReturnLeft />
        </button>
      </div>
      {delivery &&
        delivery.map((delivery) => {
          return <Product delivery={delivery} key={delivery._id} />;
        })}
    </section>
  );
}
