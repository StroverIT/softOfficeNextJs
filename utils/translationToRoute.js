import { cyrylicToLatin } from "./translations";
import { latinToCyrylic } from "./translations";

/*
 Todo:
 Remove the commas or semi colons
*/
export const translationToRoute = (data) => {
  return data
<<<<<<< HEAD
    ?.toString()
=======
    .toString()
>>>>>>> d26f7cda55573513073816b1ede2bc730122a61e
    .split(" ")
    .map((word) => {
      word = word.replace(",", "");

      return cyrylicToLatin(word);
    })
    .join("-");
};
export const translationToDb = (data) => {
  return data
<<<<<<< HEAD
    ?.toString()
=======
    .toString()
>>>>>>> d26f7cda55573513073816b1ede2bc730122a61e
    .split("-")
    .map((word) => {
      return latinToCyrylic(word);
    })
    .join(" ");
};
