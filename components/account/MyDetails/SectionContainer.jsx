import React from "react";

export default function Section({ children }) {
  return (
    <section className="flex flex-col justify-center md:justify-between items-center md:items-start md:grid grid-cols-[45%55%] py-3 gap-5 md:gap-0 w-full">
      {children}
    </section>
  );
}
