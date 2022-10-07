import { cyrylicToLatin } from "../../utils/translations";

const navDictionary = [
  { text: "Продукти", route: cyrylicToLatin("Продукти") },
  { text: "Поръчки", route: cyrylicToLatin("Доставки") },
  { text: "Промоции", route: cyrylicToLatin("Промоции") },
  { text: "Потребители", route: cyrylicToLatin("Потребители") },
];

export default navDictionary;
