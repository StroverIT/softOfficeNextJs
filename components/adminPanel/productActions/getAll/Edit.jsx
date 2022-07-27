import React from "react";

function Edit({
  theme = "blueLight",
  size = "sm",
  clickHandler,
  text = "Редактирай",
}) {
  const genTheme = (color) => {
    return `border-${color} bg-${color} hover:text-${color}`;
  };

  let typeOfTheme = `border text-white hover:bg-transparent py-1 px-4 text-${size} uppercase font-semibold`;

  // Switch statement
  if (theme == "blueLight") {
    typeOfTheme += genTheme("primary-lighter");
  }
  if (theme == "green") {
    typeOfTheme += genTheme("green");
  }
  if (theme == "red") {
    typeOfTheme += genTheme("secondary");
  }

  return (
    <button className={typeOfTheme} onClick={clickHandler}>
      {text}
    </button>
  );
}
export default Edit;
