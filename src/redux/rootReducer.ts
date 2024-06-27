import { combineReducers } from "@reduxjs/toolkit";
import typeProduct from "./slices/typeProduct";
import product from "./slices/product";
import payment from "./slices/payment";
import card from "./slices/card";
import transaction from "./slices/transaction";

const rootReducer = combineReducers({
  typeProduct,
  product,
  payment,
  card,
  transaction,
});

export default rootReducer;
