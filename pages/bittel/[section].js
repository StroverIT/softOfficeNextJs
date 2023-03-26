import React, { useEffect } from "react";

const Bittel = () => {
  useEffect(() => {
    (async function () {
      const data = await fetch(
        "https://dealers.bittel.bg/bg/api/json/341092012d162fa0d19e2ebad93fc708",
        {
          method: "GET",
        }
      );
      const res = await data.json();
      console.log("Res", res);
    })();
  }, []);
  return <div></div>;
};

export default Bittel;
