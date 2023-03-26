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
  console.log(route);
  data = data
    .filter((product) => product.title.includes(route))
    .map((product) => {
      console.log(product.id);
      return {
        item: {
          tipove: product.features
            .map((feature) => {
              return `${feature.name}: ${feature.value}`;
            })
            .join(";"),
          katNomer: product.id,
          cena: product.price,
          promotionalPrice: product.promo,
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
