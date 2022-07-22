import { combineReducers } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import session from "redux-persist/lib/storage";

import productReducer from "./productReducer";

const persistConfig = {
  key: "root",
  storage: session,
  // whitelist: ["card"]
};

const reducers = combineReducers({
  allProducts: productReducer,
});

const persistedReducer = persistReducer(persistConfig, reducers);

export default persistedReducer;
