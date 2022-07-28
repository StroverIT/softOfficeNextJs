import interiornaBoq from "./interiornaBoq";
import fasadnaBoq from "./fasadnaBoq";
import antibakterialnaBoq from "./antibakterialnaBoq";
import boqZaDirektnoPolaganeVurhyBeton from "./boqZaDirektnoPolaganeVurhyBeton";
import boqNaVarovaOsnova from "./boqNaVarovaOsnova";
import boqZaMetalDurvoPlastmasa from "./boqZaMetalDurvoPlastmasa";

const index = [
  { menu: "Интериорна Боя", subMenu: interiornaBoq },

  {
    menu: "Фасадна Боя",
    subMenu: fasadnaBoq,
  },
  { menu: "Антибактериална Боя", subMenu: antibakterialnaBoq },
  {
    menu: "Боя за директно полагане върху бетон",
    subMenu: boqZaDirektnoPolaganeVurhyBeton,
  },
  { menu: "Боя на варова основа", subMenu: boqNaVarovaOsnova },
  {
    menu: "Боя за метал, дърво, пластмаса и др. ",
    subMenu: boqZaMetalDurvoPlastmasa,
  },
];

export default index;
