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
        cartItem.item._id == item.item._id ? true : false
      );
      return {
        ...state,
        cart: inCart
          ? state.cart.map((cartItem) =>
              cartItem.item._id == item.item._id
                ? { ...cartItem, qty: cartItem.qty + 1 }
                : cartItem
            )
          : [...state.cart, { ...item, qty: item.customQty }],
      };

    case ActionTypes.REMOVE_SELECTED_PRODUCTS:
      return {
        ...state,
        cart: state.cart.filter((cartItem) => cartItem.item._id != item._id),
      };
    case ActionTypes.ADJUST_QTY:
      return {
        ...state,
        cart: state.cart.map((cartItem) =>
          cartItem.item._id === item._id
            ? { ...cartItem, qty: item.qty }
            : cartItem
        ),
      };
    case ActionTypes.LOAD_CURRENT_ITEM:
      return { ...state, currentItem: action.payload };
    default:
      return state;
  }
};
export default shopReducer;
