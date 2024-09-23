import { combineReducers } from "@reduxjs/toolkit";
import typeProduct from "./slices/typeProduct";
import product from "./slices/product";
import payment from "./slices/payment";
import card from "./slices/card";
import transaction from "./slices/transaction";
import productOrders from "./slices/productOrders";

const rootReducer = combineReducers({
  typeProduct,
  product,
  payment,
  card,
  transaction,
  productOrders,
});

export default rootReducer;
