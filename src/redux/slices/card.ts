import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { WritableDraft } from "immer/dist/internal";
import { requestGetListCards } from "@/services/buy-card";
import { ICardsRes } from "@/interfaces/response";

interface IState {
  listCards: ICardsRes[];
  loading: boolean;
  error: string;
}

export const fetchListCard = createAsyncThunk("/card", async () => {
  const res = await requestGetListCards();
  return res?.data;
});

const initialState: IState = {
  loading: false,
  listCards: [],
  error: "",
};
const slice = createSlice({
  name: "card",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    // list
    builder.addCase(fetchListCard.pending, (state: WritableDraft<IState>) => {
      state.loading = true;
    });
    builder.addCase(
      fetchListCard.fulfilled,
      (state: WritableDraft<IState>, action: PayloadAction<ICardsRes[]>) => {
        state.loading = false;
        state.listCards = action.payload;
        state.error = "";
      }
    );
    builder.addCase(fetchListCard.rejected, (state: WritableDraft<IState>) => {
      state.loading = true;
      state.listCards = [];
    });
  },
});

export default slice.reducer;
