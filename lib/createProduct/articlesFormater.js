<<<<<<< HEAD
function articlesFormater(obj, articleImg) {
  obj.subsection = JSON.parse(obj.subsection).map((article) => {
    console.log(article);
    // If image url
    if (article.imageUrl) {
      // Found image
      console.log(articleImg);
      const newFileName = articleImg.find(
        (search) => article.imageUrl == search.originalname
      ).newFileName;
      // If found, set it
      article.img = [{ originalname: newFileName }] || null;
    }
    if (article.opisanie) {
      article.opisanie = article.opisanie.split("/n").join(";");
    }
    // Checker if is found items
    if (article.items) {
      const newItems = [];
      article.items.forEach((item) => {
        if (item.tipove) {
          item.tipove = item.tipove.split("\n").join(";");
        }
        if (item.colors) {
          const colorsArr = item.colors.split("\n");
          delete item.colors;
          const itemTipove = item.tipove;

          colorsArr.forEach((color) => {
            item.tipove = `${itemTipove};Цвят: ${color}`;

            newItems.push({
              ...item,
            });
          });
          return;
        }

        newItems.push(item);
      });
      article.items = newItems;
=======
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
>>>>>>> d26f7cda55573513073816b1ede2bc730122a61e
    }
    return article;
  });
  return obj;
}
export default articlesFormater;
