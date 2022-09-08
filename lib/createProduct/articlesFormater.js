function articlesFormater(obj, articleImg, itemImg) {
  obj.articles = JSON.parse(obj.articles).map((article) => {
    // If image url
    if (article.imageUrl) {
      // Found image
      const newFileName = articleImg.find(
        (search) => article.imageUrl == search.orgName
      ).newFileName;
      // If found, set it
      article.imageUrl = newFileName || null;
    }
    // Checker if is found items
    if (article.items) {
      article.items = article.items.map((item) => {
        if (item.imageUrl) {
          const newItemFileName = itemImg.find(
            (search) => item.imageUrl == search.orgName
          ).newFileName;
          item.imageUrl = newItemFileName;
        }
        return item;
      });
    }
    return article;
  });
  return obj;
}
export default articlesFormater;
