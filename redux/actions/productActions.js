import { ActionTypes } from "../constants/action-types";

export const addToCart = (item) => {
  return {
    type: ActionTypes.ADD_TO_CART,
    payload: {
      item,
    },
  };
};
export const removeFromCart = (itemId) => {
  return {
    type: ActionTypes.REMOVE_SELECTED_PRODUCTS,
    payload: {
      _id: itemId,
    },
  };
};
export const adjustQty = (itemId, value) => {
  return {
    type: ActionTypes.ADJUST_QTY,
    payload: {
      _id: itemId,
      qty: value,
    },
  };
};
export const loadCurrentItem = (item) => {
  return {
    type: ActionTypes.LOAD_CURRENT_ITEM,
    payload: item,
  };
};
