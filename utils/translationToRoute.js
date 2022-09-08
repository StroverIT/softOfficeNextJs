import { cyrylicToLatin } from "./translations";
import { latinToCyrylic } from "./translations";

/*
 Todo:
 Remove the commas or semi colons
*/
export const translationToRoute = (data) => {
  return data
    ?.toString()
    .split(" ")
    .map((word) => {
      word = word.replace(",", "");

      return cyrylicToLatin(word);
    })
    .join("-");
};
export const translationToDb = (data) => {
  return data
    ?.toString()
    .split("-")
    .map((word) => {
      return latinToCyrylic(word);
    })
    .join(" ");
};
