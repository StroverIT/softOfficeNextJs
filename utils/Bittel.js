const routerTranslator = (route) => {
  switch (route) {
    case "ergonomichni-ofis-stolove":
      route = "Ергономичен стол";
      break;
    case "prezidentski-stolove":
      route = "Президентски офис стол";
      break;
    case "geimurski-stol":
      route = "Геймърски стол";
      break;
    case "rabotni-stolove":
      route = "Работен офис стол";
      break;

    case "posetitelski-stolove":
      route = "Посетителски стол";
      break;
    case "ofis-kresla":
      route = "Офис кресло";
      break;
    case "detski-stolove":
      route = "Детски стол";
      break;
    case "ofis-kolela":
      route = "Офис стол";
      break;
    case "aksesoari-i-rezervni-chasti":
      route = "Аксесоар и резервни части";
      break;
  }
  return route;
};

export const formatter = (data, route) => {
  route = routerTranslator(route);
  data = data
    .filter((product) => product.title.includes(route))
    .map((product) => {
      return {
        item: {
          tipove: product.features
            .map((feature) => {
              return `${feature.name}: ${feature.value}`;
            })
            .join(";"),
          katNomer: product.id,
          cena: Number(product.price) - Number(product.price) * 0.20,
          promotionalPrice: Number(product.promo) - Number(product.promo) * 0.20,
          _id: product.id,
        },
        article: {
          opisanie: product.description,
          imgUrl: product.gallery[0],
        },
        section: {
          name: product.title,
        },
      };
    });

  return data;
};

export const formatterById = (data, id) => {
  data = data
    .filter((product) => product.id == id)
    .map((product) => {
      return {
        item: {
          tipove: product.features
            .map((feature) => {
              return `${feature.name}: ${feature.value}`;
            })
            .join(";"),
          katNomer: product.id,
          cena: Number(product.price) - Number(product.price) * 0.20,
          promotionalPrice: Number(product.promo) - Number(product.promo) * 0.20,
          _id: product.id,
        },
        article: {
          opisanie: product.description,
          imgUrl: product.gallery[0],
        },
        section: {
          name: product.title,
        },
      };
    })[0];
  console.log(data);
  return data;
};
