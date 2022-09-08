import { ActionTypes } from "../constants/action-types";

const initialState = {
  cart: [], //{id, title, descr, price, img, qty}
  currentItem: null,
};

const shopReducer = (state = initialState, action) => {
  const item = action.payload;
  switch (action.type) {
    case ActionTypes.ADD_TO_CART:
      // Get the items data from products array
      // Check if Item is in cart already
      const inCart = state.cart.find((cartItem) =>
        cartItem.item.item.route == item.item.item.route ? true : false
      );
      return {
        ...state,
        cart: inCart
          ? state.cart.map((cartItem) =>
              cartItem.item.item.route == item.item.item.route
                ? { ...cartItem, qty: cartItem.qty + item.customQty }
                : cartItem
            )
          : [...state.cart, { ...item, qty: item.customQty }],
      };

    case ActionTypes.REMOVE_SELECTED_PRODUCTS:
      return {
        ...state,
        cart: state.cart.filter((cartItem) => {
          return cartItem.item.item.route != item._id;
        }),
      };
    case ActionTypes.ADJUST_QTY:
      return {
        ...state,
        cart: state.cart.map((cartItem) => {
          return cartItem.item.item.route === item._id
            ? { ...cartItem, qty: item.qty }
            : cartItem;
        }),
      };
    case ActionTypes.LOAD_CURRENT_ITEM:
      return { ...state, currentItem: action.payload };
    default:
      return state;
  }
};
export default shopReducer;
