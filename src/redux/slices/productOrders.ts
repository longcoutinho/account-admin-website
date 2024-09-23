import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { WritableDraft } from "immer/dist/internal";
import { getAllProductOrder } from "@/services/sale-order";
import { ISaleOrderList } from "@/interfaces/request";

interface IState {
  listProductOrders: Partial<ISaleOrderList>;
  loading: boolean;
  error: string;
}

export const fetchListProductOders = createAsyncThunk(
  "/product/orders",
  async (request: any) => {
    const res = await getAllProductOrder(request);
    return res?.data;
  }
);

const initialState: IState = {
  loading: false,
  listProductOrders: {},
  error: "",
};
const slice = createSlice({
  name: "productOrders",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    // list
    builder.addCase(
      fetchListProductOders.pending,
      (state: WritableDraft<IState>) => {
        state.loading = true;
      }
    );
    builder.addCase(
      fetchListProductOders.fulfilled,
      (state: WritableDraft<IState>, action: PayloadAction<ISaleOrderList>) => {
        state.loading = false;
        state.listProductOrders = action.payload;
        state.error = "";
      }
    );
    builder.addCase(
      fetchListProductOders.rejected,
      (state: WritableDraft<IState>) => {
        state.loading = true;
        state.listProductOrders = {};
      }
    );
  },
});

export default slice.reducer;
