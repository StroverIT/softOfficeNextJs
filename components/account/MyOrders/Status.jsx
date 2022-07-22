import React from "react";

export function Status({ type, isDiv }) {
  let color = {
    type: "",
    text: "",
  };
  switch (type) {
    case "progress":
      color.type = "text-primary";
      color.text = "В прогрес";
      break;
    case "sent":
      color.type = "text-green";
      color.text = "Изпратена";
      break;
    case "returned":
      color.type = "text-secondary";
      color.text = "Върната";
  }
  return (
    <>
      {!isDiv && (
        <td className={`font-semibold ${color.type}`}>{color.text}</td>
      )}
      {isDiv && (
        <div className={`font-semibold ${color.type}`}>{color.text}</div>
      )}
    </>
  );
}
