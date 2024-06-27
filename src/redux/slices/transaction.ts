import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { WritableDraft } from "immer/dist/internal";
import { getAllSaleOrder, requestGetOrderDetail } from "@/services/sale-order";
import { IOrderDetail, ISaleOrderList } from "@/interfaces/request";

interface IState {
  listTransaction: Partial<ISaleOrderList>;
  detailTrans: IOrderDetail[];
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

export const fetchDetailTransaction = createAsyncThunk(
  "/transaction/detail",
  async (id: string) => {
    const res = await requestGetOrderDetail(id);
    return res?.data;
  }
);

const initialState: IState = {
  loading: false,
  listTransaction: {},
  detailTrans: [],
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
    // detail
    builder.addCase(
      fetchDetailTransaction.pending,
      (state: WritableDraft<IState>) => {
        state.loading = true;
      }
    );
    builder.addCase(
      fetchDetailTransaction.fulfilled,
      (state: WritableDraft<IState>, action: PayloadAction<IOrderDetail[]>) => {
        state.loading = false;
        state.detailTrans = action.payload;
        state.error = "";
      }
    );
    builder.addCase(
      fetchDetailTransaction.rejected,
      (state: WritableDraft<IState>) => {
        state.loading = true;
        state.detailTrans = [];
      }
    );
  },
});

export default slice.reducer;
