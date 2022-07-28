const productFormater = (product) => {
  console.log(product);
  let formated = {};
  formated.articleName = `${product.sectionName} ${product.articleName} ${product.item.weight}`;
  formated.imageUrl = product.imageUrl;
  formated.price = product.item.price;
  formated.sectionName = product.sectionName;
  formated.weight = product.item.weight;
  formated._id = product.item._id;
  return formated;
};

export default productFormater;
