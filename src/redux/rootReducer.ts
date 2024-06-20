import { combineReducers } from "@reduxjs/toolkit";
import typeProduct from "./slices/typeProduct";
import product from "./slices/product";

const rootReducer = combineReducers({
  typeProduct,
  product,
});

export default rootReducer;
