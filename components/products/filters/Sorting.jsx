import React from "react";

function Option({ value, text }) {
  return <option value={value}>{text}</option>;
}

function Quantity({ qty }) {
  return <span className="pl-1 text-sm text-primary-lighter">{qty}</span>;
}
export default function Sorting({ title, name, data, qty }) {
  return (
    <div className="flex text-[#888] items-center justify-center">
      <label htmlFor={name} className="text-sm">
        {title}
        {qty && <Quantity qty={qty} />}:
      </label>
      <div>
        <select name={name} id={name} className="border border-gray p-1 ml-2">
          {data.map((e) => {
            return <Option value={e.val} text={e.text} key={e.val} />;
          })}
        </select>
      </div>
    </div>
  );
}