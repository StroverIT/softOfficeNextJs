import { cyrylicToLatin } from "./translations";
/*
 Todo:
 Remove the commas or semi colons
*/
const translationToRoute = (data) => {
  return data
    .toString()
    .split(" ")
    .map((word) => {
      word = word.replace(",", "");

      return cyrylicToLatin(word);
    })
    .join("-");
};
export default translationToRoute;
