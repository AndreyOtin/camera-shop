import { Camera } from '../../types/camera';
import { SliceNameSpace, Status } from '../../consts/enums';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState, ThunkConfig } from '../../types/store';

type InitialState = {
  product: Camera | null;
  productStatus: {
    status: Status;
    code: string;
  };
}

const initialState: InitialState = {
  product: null,
  productStatus: {
    status: Status.Idle,
    code: ''
  }
};

const fetchProduct = createAsyncThunk<Camera, number, ThunkConfig>(
  `${SliceNameSpace.Product}/fetchProduct`,
  async (id, { extra: api }) => {
    const { data } = await api.fetchCamera(id);

    return data;
  }
);

const productSlice = createSlice({
  initialState,
  name: SliceNameSpace.Product,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchProduct.pending, (state) => {
        state.productStatus.status = Status.Loading;
      })
      .addCase(fetchProduct.rejected, (state, action) => {
        state.productStatus.status = Status.Error;

        if (action.error.message) {
          state.productStatus.code = action.error.message;
        }
      })
      .addCase(fetchProduct.fulfilled, (state, action) => {
        state.productStatus.status = Status.Success;
        state.product = action.payload;
      });
  }
});

const selectProduct = (state: RootState) => state[SliceNameSpace.Product].product;
const selectProductStatus = (state: RootState) => state[SliceNameSpace.Product].productStatus;

export default productSlice.reducer;
export { selectProduct, selectProductStatus, fetchProduct };
