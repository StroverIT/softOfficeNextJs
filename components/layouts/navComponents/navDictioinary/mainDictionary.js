import officeMatArt from "./officeMatArt";
import tehnikiKonsymativiArt from "./tehnikiKonsymativiArt";
import sredstvaZaPrezentaciqArt from "./sredstvaZaPrezentaciqArt";
import hraniINapitkiArt from "./hraniINapitkiArt";
import higienniSredstvaArt from "./higienniSredstvaArt";
import obzavejdaneZaOfisArt from "./obzavejdaneZaOfisArt";
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
    title: "Офис материали",
    mainRoute: "ofis-materiali",
    // Menu
    articles: officeMatArt,
    icon: "",
  },
  {
    title: "Техника и консумативи",
    mainRoute: "tehnika-i-konsymativi",
    articles: tehnikiKonsymativiArt,
    icon: "",
  },
  {
    title: "Средства за презентация",
    mainRoute: "sredstva-za-prezentaciq",
    articles: sredstvaZaPrezentaciqArt,
    icon: "",
  },
  {
    title: "Храни и напитки",
    mainRoute: "hrani-i-napitki",
    articles: hraniINapitkiArt,
    icon: "",
  },
  {
    title: "Хигиенни средства",
    mainRoute: "heatingCoolingAndVick",
    articles: higienniSredstvaArt,
    icon: "",
  },
  {
    title: "Обзавеждане за офис",
    mainRoute: "floorAndWallCoverings",
    articles: obzavejdaneZaOfisArt,
    icon: "",
  },
];

export default dictionary;
