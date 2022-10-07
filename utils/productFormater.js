const productFormater = (product) => {
<<<<<<< HEAD
  let formated = {};
  formated.articleName = `${product.sectionName} ${product.articleName} ${product.item.weight}`;
  formated.imageUrl = product.imageUrl;
  formated.price = product.item.price;
  formated.sectionName = product.sectionName;
  formated.weight = product.item.weight;
  formated._id = product.item._id;
  return formated;
=======
  let newObj = {};

  for (let [key, value] of Object.entries(product.item)) {
    newObj[key] = value;
  }
  for (let [key, value] of Object.entries(product)) {
    if (key != "item") {
      newObj[key] = value;
    }
  }
  return newObj;
>>>>>>> d26f7cda55573513073816b1ede2bc730122a61e
};

export default productFormater;
