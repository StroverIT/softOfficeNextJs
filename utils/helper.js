import { toastProduct } from "../components/notificataions/Toast";

import { addToCart } from "../redux/actions/productActions";

export const addProduct = (dispatch, product) => {
  toastProduct(`Добавихте "${product.article.name}" в количката си`);

  dispatch(addToCart(product));
};
