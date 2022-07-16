import { cyrylicToLatin } from "./translations";

const translationToRoute = (data) => {
  return data
    .toString()
    .split(" ")
    .map((word) => {
      return cyrylicToLatin(word);
    })
    .join("-");
};
export default translationToRoute;
