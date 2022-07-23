import React from "react";

import Section from "./deliveriesComp/Section";

export default function Deliveries({ deliveries }) {
  return (
    <section className="mt-10">
      {deliveries.map((delivery) => {
        return <Section delivery={delivery} key={delivery._id} />;
      })}
    </section>
  );
}
