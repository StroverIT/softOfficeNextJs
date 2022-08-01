import React from "react";

export default function ProductNotif(props) {
  console.log(props);
  return (
    <div className="absolute h-full w-full top-1/2 -translate-y-1/2 bg-green left-0 text-dark font-roboto mx-auto text-sm">
      <div className="flex justify-center items-center flex-col h-full">
        <span className="font-bold">{props.productName}</span> беше добавен
        успешно в количката
      </div>
    </div>
  );
}
