import React from "react";

function Option({ value, text }) {
  return <option value={value}>{text}</option>;
}

function Quantity({ qty }) {
  return <span className="pl-1 text-sm text-primary-100">{qty}</span>;
}
export default function Sorting({ title, name, data, qty, setFilters }) {
  const changeHandler = (e) => {
    let val = e.target.value;
    setFilters((prevState) => ({
      ...prevState,
      filterByNameOrPrice: val,
    }));
  };
  return (
    <div className="flex text-[#888] items-center justify-center flex-col lg:flex-row max-lg:container">
      <div className="flex items-center justify-end w-full mt-5 lg:justify-center lg:mt-2">
        <label htmlFor={name} className="text-sm">
          {title}
          {qty && <Quantity qty={qty} />}:
        </label>
      </div>
      <div className="w-full mt-1">
        <select
          onChange={changeHandler}
          name={name}
          id={name}
          className="w-full p-1 border border-gray lg:ml-2 lg:w-auto text-dark"
        >
          {data.map((e) => {
            return <Option value={e.val} text={e.text} key={e.val} />;
          })}
        </select>
      </div>
    </div>
  );
}
