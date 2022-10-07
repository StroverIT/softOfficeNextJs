<<<<<<< HEAD
import React, { useEffect, useState } from "react";

// Next
import { useRouter } from "next/router";

// Components
import Section from "./deliveriesComp/Section";
import Main from "./deliveriesComp/Main";
// Constants

export default function Deliveries({ forHome, forMagazine }) {
  const router = useRouter();
  const [action, setAction] = useState();

  useEffect(() => {
    const categoryComp = {
      "#dostavki": [<Main key="dostavki" />],
      "#delivery": [<Section key="forHome" delivery={forMagazine} />],
      "#magazine": [<Section key="forMagazine" delivery={forHome} />],
    };
    const hash = window.location.hash.split("#");
    const someData = categoryComp[`#${hash[2]}`] ?? categoryComp["#dostavki"]; // Retrieve data based on URL fragment
    setAction(someData[0]);
  }, [router, forHome, forMagazine]);

  return <div>{action}</div>;
=======
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
>>>>>>> d26f7cda55573513073816b1ede2bc730122a61e
}
