import React from "react";

export default function Description({ text }) {
  return (
    <section className="text-sm text-gray-darker text-center sm:w-2/3 md:w-4/5 md:text-left">
      <p>{text}</p>
    </section>
  );
}
