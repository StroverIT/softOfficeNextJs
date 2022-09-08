import React from "react";

export default function AsideHeader({ text }) {
  return (
    <div className="relative my-5 filter-container">
      <h3 className="filter-header">{text}</h3>
    </div>
  );
}
