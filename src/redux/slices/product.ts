import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { WritableDraft } from "immer/dist/internal";
import { getListProduct, requestGetDetailProduct } from "@/services/product";
import { IProductRes } from "@/interfaces/response/product";

interface IState {
  product: IProductRes[];
  productDetail: Partial<IProductRes>;
  loading: boolean;
  error: string;
}

export const fetchListProduct = createAsyncThunk("/product", async () => {
  const res = await getListProduct();
  return res?.data;
});

export const fetchDetailProduct = createAsyncThunk(
  "/product/detail",
  async (productId: string | number) => {
    const res = await requestGetDetailProduct(productId);
    return res?.data;
  }
);

const initialState: IState = {
  loading: false,
  product: [],
  productDetail: {},
  error: "",
};
const slice = createSlice({
  name: "product",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    // list
    builder.addCase(
      fetchListProduct.pending,
      (state: WritableDraft<IState>) => {
        state.loading = true;
      }
    );
    builder.addCase(
      fetchListProduct.fulfilled,
      (state: WritableDraft<IState>, action: PayloadAction<IProductRes[]>) => {
        state.loading = false;
        state.product = action.payload;
        state.error = "";
      }
    );
    builder.addCase(
      fetchListProduct.rejected,
      (state: WritableDraft<IState>) => {
        state.loading = true;
        state.product = [];
      }
    );
    // list
    builder.addCase(
      fetchDetailProduct.pending,
      (state: WritableDraft<IState>) => {
        state.loading = true;
      }
    );
    builder.addCase(
      fetchDetailProduct.fulfilled,
      (state: WritableDraft<IState>, action: PayloadAction<IProductRes>) => {
        state.loading = false;
        state.productDetail = action.payload;
        state.error = "";
      }
    );
    builder.addCase(
      fetchDetailProduct.rejected,
      (state: WritableDraft<IState>) => {
        state.loading = true;
        state.productDetail = {};
      }
    );
  },
});

export default slice.reducer;
