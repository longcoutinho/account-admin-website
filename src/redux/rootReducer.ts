import { combineReducers } from "@reduxjs/toolkit";
import typeProduct from "./slices/typeProduct";
import product from "./slices/product";
import payment from "./slices/payment";

const rootReducer = combineReducers({
  typeProduct,
  product,
  payment,
});

export default rootReducer;
