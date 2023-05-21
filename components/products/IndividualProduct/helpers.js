import { addToCart } from "../../../redux/actions/productActions";
import { toastError, toastHideAll, toastProduct, toastPromise, toastSuccess } from "../../notificataions/Toast";

export  const addProduct = ({dispatch, product, imgUrl, currQty, customQtySelected}) => {
    const section = product.section;
    const article = product.article;
    const item = article.items[0];

    const newObj = {
      item: {
        route: item._id,
        tipove: item.tipove,
        cena: item.cena,
        promotionalPrice: item.promotionalPrice,
        isOnPromotions: item.isOnPromotions,
        isOnlyNumb: item.isOnlyNumb,
        katNomer: item.katNomer,
      },
      article: {
        imgUrl,
        name: article.nameToDisplay,
        route: article._id,
      },
      section: {
        name: section.nameToDisplay,
        route: `/products/${section.name}/${article._id}`,
      },
    };
    if (product.article.isCustomQty) {
      newObj.item.cena = customQtySelected.price;
      newObj.item.tipove += `;${customQtySelected.name}`;
    }
    toastProduct(
      `Добавихте ${currQty} ${currQty > 1 ? "броя" : "брой"} "${
        section.nameToDisplay
      }" в количката си`
    );
    dispatch(addToCart(newObj, currQty));
  };


export  const addFavourites = async (product,setIsFav) => {
    toastPromise("Изпраща се...");
    const section = product.section;
    const article = product.article;
    const item = article.items[0];
    let imgUrl;
    if (article.img) {
      imgUrl = article?.img?.originalname || article?.img[0]?.originalname;
    }
    const newObj = {
      item: {
        route: item._id,
        types: item.tipove,
        cena: item.cena,
        promoPrice: item.promotionalPrice,
        isOnPromotions: item.isOnPromotions,
        isOnlyNumb: item.isOnlyNumb,
      },
      article: {
        imgUrl: imgUrl,
        name: article.nameToDisplay,
        route: article._id,
      },
      section: {
        name: section.nameToDisplay,
        route: section.name,
      },
    };

    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ product: newObj }),
    };
    const res = await fetch("/api/account/favourites/adding", options);
    const data = await res.json();

    toastHideAll();

    if (data.error) {
      toastError(data.error);
    }
    if (data.message) {
      toastSuccess(data.message);
      setIsFav(true);
    }
  };

export  const removeFavourites = async (productId,setIsFav) => {
    toastPromise("Изпраща се...");

    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ productId }),
    };

    const res = await fetch("/api/account/favourites/remove", options);
    const data = await res.json();

    toastHideAll();

    if (data.error) {
      toastError(data.error);
    }
    if (data.message) {
      toastSuccess(data.message);
      setIsFav(false);
    }
  };