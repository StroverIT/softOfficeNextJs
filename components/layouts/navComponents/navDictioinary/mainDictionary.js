import interiornaBoq from "./interiornaBoq";
import fasadnaBoq from "./fasadnaBoq";
import antibakterialnaBoq from "./antibakterialnaBoq";
import boqZaDirektnoPolaganeVurhyBeton from "./boqZaDirektnoPolaganeVurhyBeton";
import pqni from "./pqni";
import boqNaVarovaOsnova from "./boqNaVarovaOsnova";
import grundove from "./grundove";
import grundoveZaPetna from "./grundoveZaPetna";
import alkidnaBoqZaMetal from "./alkidnaBoqZaMetal";
import boqZaMetalDurvoPlastmasa from "./boqZaMetalDurvoPlastmasa";
import dvykomponentniHidroizolacii from "./dvykomponentniHidroizolacii";
import silikoni from "./silikoni";
/*
mainRoute: "Main route"
articles: {
  menu: "Menu",
  subMenu: [
    "subMenu name",
    "subMenu name"...
  ]
}
]
*/
const dictionary = [
  {
    title: "Интериорна боя",
    // Menu
    articles: interiornaBoq,
    icon: "",
  },
  { title: "Фасадна Боя", articles: fasadnaBoq },
  { title: "Антибактериална боя", articles: antibakterialnaBoq },

  {
    title: "Боя за директно полагане върху бетон",
    articles: boqZaDirektnoPolaganeVurhyBeton,
  },

  { title: "Пяни", articles: pqni },

  { title: "Боя на варова основа", articles: boqNaVarovaOsnova },

  { title: "Грундове", articles: grundove },
  { title: "Грундове за петна", articles: grundoveZaPetna },

  { title: "Алкидна Боя За Метал", articles: alkidnaBoqZaMetal },
  {
    title: "Боя за метал, дърво, пластмаса",
    articles: boqZaMetalDurvoPlastmasa,
  },
  {
    title: "Двукомпонентни Хидроизолации",
    articles: dvykomponentniHidroizolacii,
  },

  { title: "Силикони", articles: silikoni },

  { title: "", articles: [] },

  { title: "", articles: [] },

  { title: "", articles: [] },

  { title: "", articles: [] },

  { title: "", articles: [] },
  { title: "", articles: [] },

  { title: "", articles: [] },

  { title: "", articles: [] },

  { title: "", articles: [] },
];

export default dictionary;
