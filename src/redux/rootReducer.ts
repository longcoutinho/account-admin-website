import { combineReducers } from "@reduxjs/toolkit";
import typeProduct from "./slices/typeProduct";
import product from "./slices/product";
import payment from "./slices/payment";
import card from "./slices/card";

const rootReducer = combineReducers({
  typeProduct,
  product,
  payment,
  card,
});

export default rootReducer;
