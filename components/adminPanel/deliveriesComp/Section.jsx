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
          className="my-5 text-2xl text-primary-100"
          onClick={() => router.push("/adminPanel#dostavki")}
        >
          <BsArrowReturnLeft />
        </button>
      </div>
      {delivery &&
        delivery.map((delivery) => {
          let renderer = <Product delivery={delivery} key={delivery._id} />;
          if (!delivery.isVerified)
            renderer = (
              <div className="text-3xl text-secondary">
                {" "}
                Не потвърдена поръчка!
              </div>
            );
          return renderer;
        })}
    </section>
  );
}
