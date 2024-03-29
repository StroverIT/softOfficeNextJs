const articles = [
  {
    menu: "Хартии и хартиени изделия",
    subMenu:
      // SubMenu
      [
        { displayName: "Бяла копирна хартия и картон", name: "hartiq" },
        { displayName: "Картон", name: "karton" },
        { displayName: "Фолио", name: "folio" },

        { displayName: "Фотохартия", name: "fotohartiq" },

        { displayName: "Цветна хартия и картон", name: "cvetnaHartiq" },
        {
          displayName: "Дизайнерска хартия и картон",
          name: "dizainerskaHartiqIKarton",
        },

        { displayName: "Карирана и линирана хартия", name: "kariranaHartiq" },
        { displayName: "Паус", name: "paus" },
        {
          displayName: "Хартия на руло за плотери",
          name: "hartiqNaRyloZaPloteri",
        },
        {
          displayName: "Хартия за плотери",
          name: "hartiqZaPloteri",
        },
        { displayName: "Касови термо ролки", name: "kasoviRolki" },
        {
          displayName: "Безконечна принтерна хартия",
          name: "bezkonechnaPrintHartiq",
        },

        { displayName: "Етикети", name: "etiketi" },

        { displayName: "Самозалепващи знаци", name: "zamoZalepvashtiZnaci" },

        { displayName: "Маркиращи клещи", name: "markirashtiKleshti" },
        { displayName: "Бели пликове", name: "plikoveBeli" },
        { displayName: "Кафяви пликове", name: "plikoveKafqvi" },
        { displayName: "Цветни пликове", name: "cvetniPlikove" },

        { displayName: "Формуляри", name: "formylqri" },
        { displayName: "Бележници", name: "belejnici" },
        { displayName: "Тетрадки", name: "tetradki" },
      ],
  },
  {
    menu: "Организация и архивиране",
    subMenu:
      // Submenu
      [
        { displayName: "Класьори", name: "klasiori" },
        { displayName: "Джобове", name: "djobove" },
        { displayName: "Разделители", name: "razdeliteli" },
        { displayName: "Папки", name: "papki" },
        { displayName: "Кутии, кашони", name: "arhivnaKytiqIKashon" },
        { displayName: "Амбалажна хартия", name: "ambalajnaHartiq" },
        {
          displayName: "Фолио с въздушни мехурчета",
          name: "folioSVuzdyshniMehyrcheta",
        },
        { displayName: "Стреч фолио", name: "stretchFolio" },

        { displayName: "Тубус", name: "tubus" },
        { displayName: "Клипборд", name: "clipBoard" },
        { displayName: "Визитник", name: "vizitnik" },
        { displayName: "Раници, чанти, сакове, куфари", name: "raniciChanti" },
      ],
  },
  {
    menu: "Пишещи и коригиращи пособия",
    subMenu: [
      { displayName: "Химикалки", name: "himikalki" },
      { displayName: "Ролери", name: "roleri" },
      { displayName: "Тънкописци", name: "tankopisci" },
      { displayName: "Маркери", name: "markeri" },
      { displayName: "Автоматични моливи", name: "avtomatichniMolivi" },
      { displayName: "Графити", name: "grafiti" },
      { displayName: "Моливи", name: "molivi" },
      { displayName: "Острилки", name: "ostrilki" },
      { displayName: "Гуми", name: "gumi" },
      { displayName: "Флумастери", name: "flumasteri" },
      { displayName: "Бои за рисуване", name: "vodniBoi" },
      { displayName: "Коректори", name: "korektor" },
    ],
  },
  {
    menu: "Принадлежности за бюро",
    subMenu: [
      { displayName: "Телбод", name: "telbod" },
      { displayName: "Антителбод, ", name: "antitelbod" },

      { displayName: "Телчета за телбод", name: "telchetaZaTelbod" },
      { displayName: "Перфоратор", name: "perforator" },
      {
        displayName: "Поставка, моливник, органайзер за бюро",
        name: "postavkaMolivnikOrganaizerZaBjuro",
      },
      { displayName: "Метална поставка", name: "metalnaPostavka" },
      { displayName: "Метално кошче", name: "postavkaZabjuroIliStena" },
      { displayName: "Поставки", name: "postavkaMolivnikOrganaizerZaBjuro" },

      { displayName: "Монетник", name: "monetnik" },
    ],
  },
  {
    menu: "Канцеларски материали",
    subMenu: [
      { displayName: "Бели, цветни кубчета", name: "beliICvetniKubcheta" },
      {
        displayName: "Самозалепващи листчета",
        name: "samozalepvashiListcheta",
      },
      {
        displayName: "Лепящи индекси",
        name: "lepqshiIndeksi",
      },
      { displayName: "Лепило", name: "lepilo" },
      {
        displayName: "Ленторезачки",
        name: "lentorezachki",
      },
      {
        displayName: "Лепящи ленти",
        name: "lepqshtaLenta",
      },
      {
        displayName: "Машинки за опаковъчна лента",
        name: "mashinkaZaOpakovuchnaLenta",
      },
      { displayName: "Ножици", name: "nojiza" },
      { displayName: "Макетен нож", name: "maketenNoj" },
      {
        displayName: "Щипки за документи",
        name: "shipki",
      },
      { displayName: "Кламери", name: "klameri" },
      { displayName: "Линии", name: "linii" },
      { displayName: "Карфици", name: "karfici" },
      {
        displayName: "Кабари",
        name: "kabari",
      },
      { displayName: "Лупи", name: "lupa" },
      { displayName: "Бадж", name: "badj" },

      { displayName: "Мокрилник", name: "mokrilnik" },
      { displayName: "Ластици", name: "lastici" },
      {
        displayName: "Мастило",
        name: "mastilo",
      },
      {
        displayName: "Тампон",
        name: "tampon",
      },
      {
        displayName: "Мастило, тампон и поставка за печати",
        name: "mastiloTamponIPostavkaZaPechati",
      },
      // {
      //   displayName: "Печати и изработка на печати и клишета",
      //   name: "postavkaMolivnikOrganaizerZaBjuro",
      // },
    ],
  },
  // {
  //   menu: "Услуги",
  //   subMenu: [
  //     "Изработка на клише за печати",
  //     "Изработка на печат Brother",
  //     "Изработка на визитки",
  //     "Изработка на фактури",
  //     "Подвързване, ламиниране и др",
  //   ],
  // },
];

export default articles;
