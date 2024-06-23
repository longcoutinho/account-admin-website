import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { WritableDraft } from "immer/dist/internal";
import { IPaymentMethodRes } from "@/interfaces/response/product";
import { requestGetListPaymentMethod } from "@/services/product";

interface IState {
  paymentMethods: IPaymentMethodRes[];
  loading: boolean;
  error: string;
}

export const fetchListPaymentMethod = createAsyncThunk("/payment", async () => {
  const res = await requestGetListPaymentMethod();
  return res?.data;
});

const initialState: IState = {
  loading: false,
  paymentMethods: [],
  error: "",
};
const slice = createSlice({
  name: "payment",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      fetchListPaymentMethod.pending,
      (state: WritableDraft<IState>) => {
        state.loading = true;
      }
    );
    builder.addCase(
      fetchListPaymentMethod.fulfilled,
      (
        state: WritableDraft<IState>,
        action: PayloadAction<IPaymentMethodRes[]>
      ) => {
        state.loading = false;
        state.paymentMethods = action.payload;
        state.error = "";
      }
    );
    builder.addCase(
      fetchListPaymentMethod.rejected,
      (state: WritableDraft<IState>) => {
        state.loading = true;
        state.paymentMethods = [];
      }
    );
  },
});

export default slice.reducer;
