import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { WritableDraft } from "immer/dist/internal";
import { getAllSaleOrder } from "@/services/sale-order";
import { ISaleOrderList } from "@/interfaces/request";

interface IState {
  listTransaction: Partial<ISaleOrderList>;
  loading: boolean;
  error: string;
}

export const fetchListTransaction = createAsyncThunk(
  "/transaction",
  async (request: any) => {
    const res = await getAllSaleOrder(request);
    return res?.data;
  }
);

const initialState: IState = {
  loading: false,
  listTransaction: {},
  error: "",
};
const slice = createSlice({
  name: "transaction",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    // list
    builder.addCase(
      fetchListTransaction.pending,
      (state: WritableDraft<IState>) => {
        state.loading = true;
      }
    );
    builder.addCase(
      fetchListTransaction.fulfilled,
      (state: WritableDraft<IState>, action: PayloadAction<ISaleOrderList>) => {
        state.loading = false;
        state.listTransaction = action.payload;
        state.error = "";
      }
    );
    builder.addCase(
      fetchListTransaction.rejected,
      (state: WritableDraft<IState>) => {
        state.loading = true;
        state.listTransaction = {};
      }
    );
  },
});

export default slice.reducer;
