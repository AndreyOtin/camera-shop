import { Camera } from '../../types/camera';
import { SliceNameSpace, Status } from '../../consts/enums';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState, ThunkConfig } from '../../types/store';

type InitialState = {
  product: Camera | null;
  similarProducts: Camera [];
  productStatus: {
    status: Status;
    code: string;
  };
  similarProductStatus: {
    status: Status;
    code: string;
  };
}

const initialState: InitialState = {
  product: null,
  similarProducts: [],
  productStatus: {
    status: Status.Idle,
    code: ''
  },
  similarProductStatus: {
    status: Status.Idle,
    code: ''
  }
};

const fetchProduct = createAsyncThunk<Camera, string, ThunkConfig>(
  `${SliceNameSpace.Product}/fetchProduct`,
  async (id, { extra: api }) => {
    const { data } = await api.fetchCamera(id);

    return data;
  }
);

const fetchSimilarProducts = createAsyncThunk<Camera[], string, ThunkConfig>(
  `${SliceNameSpace.Product}/fetchSimilarProducts`,
  async (id, { extra: api }) => {
    const { data } = await api.fetchSimilarCameras(id);

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

        if (action.error?.message) {
          state.productStatus.code = action.error.message;
        }
      })
      .addCase(fetchProduct.fulfilled, (state, action) => {
        state.productStatus.status = Status.Success;
        state.product = action.payload;
      })
      .addCase(fetchSimilarProducts.pending, (state) => {
        state.similarProductStatus.status = Status.Loading;
      })
      .addCase(fetchSimilarProducts.rejected, (state, action) => {
        state.similarProductStatus.status = Status.Error;

        if (action.error?.message) {
          state.similarProductStatus.code = action.error.message;
        }
      })
      .addCase(fetchSimilarProducts.fulfilled, (state, action) => {
        state.similarProductStatus.status = Status.Success;
        state.similarProducts = action.payload;
      });
  }
});

const selectProduct = (state: RootState) => state[SliceNameSpace.Product].product;
const selectProductStatus = (state: RootState) => state[SliceNameSpace.Product].productStatus;
const selectSimilarProducts = (state: RootState) => state[SliceNameSpace.Product].similarProducts;
const selectSimilarProductStatus = (state: RootState) => state[SliceNameSpace.Product].similarProductStatus;

export default productSlice.reducer;
export {
  selectProduct,
  selectProductStatus,
  fetchProduct,
  fetchSimilarProducts,
  selectSimilarProducts,
  selectSimilarProductStatus,
  initialState
};
