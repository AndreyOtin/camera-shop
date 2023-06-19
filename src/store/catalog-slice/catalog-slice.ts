import { Camera, Promo } from '../../types/camera';
import { MaxElementCount, SliceNameSpace, Status } from '../../consts/enums';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState, ThunkConfig } from '../../types/store';
import { filterCameras } from '../../utiils/filter';
import client from '../../services/api';

type InitialState = {
  camerasStatus: Status;
  promoStatus: Status;
  cameras: Camera[];
  promo: Promo | null;
}

const initialState: InitialState = {
  camerasStatus: Status.Idle,
  promoStatus: Status.Idle,
  cameras: [],
  promo: null
};

const getCameras = createAsyncThunk<Camera[], undefined, ThunkConfig>(
  `${SliceNameSpace.Catalog}/getCameras`,
  async (_, { extra: api, dispatch }) => {
    const camerasWithRating: Camera[] = [];
    const query = window.location.search;

    const { data: cameras } = await api.fetchCameras();

    const filteredCameras = filterCameras(cameras, query);
    const maxElementsCount = Math.min(filteredCameras.length, MaxElementCount.ProductCard);

    for (let i = 0; i < maxElementsCount; i++) {
      const { data: reviews } = await client.getReviews(cameras[i].id.toString());

      const rating = Math.round(reviews.reduce((p, c) => p + c.rating, 0) / reviews.length);

      camerasWithRating.push({ ...filteredCameras[i], rating });
    }

    dispatch(getCamerasFull());

    return [...camerasWithRating, ...filteredCameras.slice(maxElementsCount)];
  }
);

const getCamerasFull = createAsyncThunk<Camera[], undefined, ThunkConfig>(
  `${SliceNameSpace.Catalog}/getCamerasFull`,
  async (currentPage, { extra: api }) => {
    const data: Camera[] = [];
    const query = window.location.search;

    const { data: cameras } = await api.fetchCameras();

    const filteredCameras = filterCameras(cameras, query);

    for (let i = 0; i < filteredCameras.length; i++) {
      const { data: reviews } = await client.getReviews(cameras[i].id.toString());

      const rating = Math.round(reviews.reduce((p, c) => p + c.rating, 0) / reviews.length);

      data.push({ ...filteredCameras[i], rating });
    }
    return data;
  }
);

const getPromo = createAsyncThunk<Promo, undefined, ThunkConfig>(
  `${SliceNameSpace.Catalog}/getPromo`,
  async (_, { extra: api }) => {
    const { data } = await api.getPromo();

    return data;
  }
);

const catalogSlice = createSlice({
  initialState,
  name: SliceNameSpace.Catalog,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getCameras.pending, (state) => {
        state.camerasStatus = Status.Loading;
      })
      .addCase(getCameras.rejected, (state) => {
        state.camerasStatus = Status.Error;
      })
      .addCase(getCameras.fulfilled, (state, action) => {
        state.camerasStatus = Status.Success;
        state.cameras = action.payload;
      })
      .addCase(getCamerasFull.fulfilled, (state, action) => {
        state.cameras = action.payload;
      })
      .addCase(getPromo.pending, (state) => {
        state.promoStatus = Status.Loading;
      })
      .addCase(getPromo.rejected, (state) => {
        state.promoStatus = Status.Error;
      })
      .addCase(getPromo.fulfilled, (state, action) => {
        state.promoStatus = Status.Success;
        state.promo = action.payload;
      });
  }
});

const selectCameras = (state: RootState) => state[SliceNameSpace.Catalog].cameras;
const selectCamerasStatus = (state: RootState) => state[SliceNameSpace.Catalog].camerasStatus;
const selectPromo = (state: RootState) => state[SliceNameSpace.Catalog].promo;
const selectPromoStatus = (state: RootState) => state[SliceNameSpace.Catalog].promoStatus;

export default catalogSlice.reducer;
export { getCameras, getPromo, selectCameras, selectCamerasStatus, selectPromo, selectPromoStatus, initialState };
