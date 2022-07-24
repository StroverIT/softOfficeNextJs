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
    // Menu
    articles: officeMatArt,
    icon: "",
  },
  {
    title: "Техника и консумативи",
    articles: tehnikiKonsymativiArt,
    icon: "",
  },
  {
    title: "Средства за презентация",
    articles: sredstvaZaPrezentaciqArt,
    icon: "",
  },
  {
    title: "Храни и напитки",
    articles: hraniINapitkiArt,
    icon: "",
  },
  {
    title: "Хигиенни средства",
    articles: higienniSredstvaArt,
    icon: "",
  },
  {
    title: "Обзавеждане за офис",
    articles: obzavejdaneZaOfisArt,
    icon: "",
  },
];

export default dictionary;
