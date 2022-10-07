import React from "react";

export function Status({ type, isDiv }) {
  let color = {
    type: "",
    text: "",
  };
  switch (type) {
    case "sent":
<<<<<<< HEAD
      color.type = "text-primary-100";
=======
      color.type = "text-primary-lighter";
>>>>>>> d26f7cda55573513073816b1ede2bc730122a61e
      color.text = "Изпратена";
      break;
    case "progress":
      color.type = "text-primary";
      color.text = "В прогрес";
      break;
    case "finished":
      color.type = "text-green";
      color.text = "Завършена";
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
