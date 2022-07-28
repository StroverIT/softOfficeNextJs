import boiLateksi from "./boiLateksi/index";
import pqni from "./pqni";
import grundove from "./grundove";
import grundoveZaPetna from "./grundoveZaPetna";
import alkidnaBoqZaMetal from "./boiLateksi/alkidnaBoqZaMetal";
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
    title: "Бои/Латекси",
    // Menu
    articles: boiLateksi,
    icon: "",
  },

  { title: "Пяни", articles: pqni },

  { title: "Грундове", articles: grundove },
  { title: "Грундове за петна", articles: grundoveZaPetna },

  { title: "Алкидна Боя За Метал", articles: alkidnaBoqZaMetal },

  {
    title: "Двукомпонентни Хидроизолации",
    articles: dvykomponentniHidroizolacii,
  },

  { title: "Силикони", articles: silikoni },
];

export default dictionary;
