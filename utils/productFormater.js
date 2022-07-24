const productFormater = (product) => {
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
};

export default productFormater;
