import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { WritableDraft } from "immer/dist/internal";
import { getListCategory } from "@/services/product";
import { ICategoryRes } from "@/interfaces/response/product";

interface IState {
  category: ICategoryRes[];
  loading: boolean;
  error: string;
}

export const fetchCategory = createAsyncThunk("/category", async () => {
  const res = await getListCategory();
  return res?.data;
});

const initialState: IState = {
  loading: false,
  category: [],
  error: "",
};
const slice = createSlice({
  name: "typeProduct",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCategory.pending, (state: WritableDraft<IState>) => {
      state.loading = true;
    });
    builder.addCase(
      fetchCategory.fulfilled,
      (state: WritableDraft<IState>, action: PayloadAction<ICategoryRes[]>) => {
        state.loading = false;
        state.category = action.payload;
        state.error = "";
      }
    );
    builder.addCase(fetchCategory.rejected, (state: WritableDraft<IState>) => {
      state.loading = true;
      state.category = [];
    });
  },
});

export default slice.reducer;
