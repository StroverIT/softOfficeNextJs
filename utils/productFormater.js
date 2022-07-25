const productFormater = (product) => {
  let formated = {};
  formated.articleName = `${product.sectionName} ${product.article.articleName} ${product.article.item.weight}`;
  formated.imageUrl = product.imageUrl;
  formated.price = product.article.item.price;
  formated.sectionName = product.sectionName;
  formated.weight = product.article.item.weight;
  formated._id = product.article.item._id;
  return formated;
};

export default productFormater;
