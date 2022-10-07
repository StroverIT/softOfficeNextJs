import { ActionTypes } from "../constants/action-types";

const initialState = {
  cart: [], //{id, title, descr, price, img, qty}
  currentItem: null,
};

const shopReducer = (state = initialState, action) => {
  const item = action.payload;
<<<<<<< HEAD
=======

>>>>>>> d26f7cda55573513073816b1ede2bc730122a61e
  switch (action.type) {
    case ActionTypes.ADD_TO_CART:
      // Get the items data from products array
      // Check if Item is in cart already
      const inCart = state.cart.find((cartItem) =>
<<<<<<< HEAD
        cartItem.item.item.route == item.item.item.route ? true : false
=======
        cartItem.item._id == item.item._id ? true : false
>>>>>>> d26f7cda55573513073816b1ede2bc730122a61e
      );
      return {
        ...state,
        cart: inCart
          ? state.cart.map((cartItem) =>
<<<<<<< HEAD
              cartItem.item.item.route == item.item.item.route
=======
              cartItem.item._id == item.item._id
>>>>>>> d26f7cda55573513073816b1ede2bc730122a61e
                ? { ...cartItem, qty: cartItem.qty + item.customQty }
                : cartItem
            )
          : [...state.cart, { ...item, qty: item.customQty }],
      };

    case ActionTypes.REMOVE_SELECTED_PRODUCTS:
      return {
        ...state,
<<<<<<< HEAD
        cart: state.cart.filter((cartItem) => {
          return cartItem.item.item.route != item._id;
        }),
=======
        cart: state.cart.filter((cartItem) => cartItem.item._id != item._id),
>>>>>>> d26f7cda55573513073816b1ede2bc730122a61e
      };
    case ActionTypes.ADJUST_QTY:
      return {
        ...state,
<<<<<<< HEAD
        cart: state.cart.map((cartItem) => {
          return cartItem.item.item.route === item._id
            ? { ...cartItem, qty: item.qty }
            : cartItem;
        }),
=======
        cart: state.cart.map((cartItem) =>
          cartItem.item._id === item._id
            ? { ...cartItem, qty: item.qty }
            : cartItem
        ),
>>>>>>> d26f7cda55573513073816b1ede2bc730122a61e
      };
    case ActionTypes.LOAD_CURRENT_ITEM:
      return { ...state, currentItem: action.payload };
    default:
      return state;
  }
};
export default shopReducer;
