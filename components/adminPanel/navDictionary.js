import { cyrylicToLatin } from "../../utils/translations";

const navDictionary = [
  { text: "Продукти", route: cyrylicToLatin("Продукти") },
<<<<<<< HEAD
  { text: "Поръчки", route: cyrylicToLatin("Доставки") },
=======
  { text: "Доставки", route: cyrylicToLatin("Доставки") },
>>>>>>> d26f7cda55573513073816b1ede2bc730122a61e
  { text: "Промоции", route: cyrylicToLatin("Промоции") },
  { text: "Потребители", route: cyrylicToLatin("Потребители") },
];

export default navDictionary;
