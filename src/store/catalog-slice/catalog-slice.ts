import { Camera, Promo } from '../../types/camera';
import { MaxElementCount, SliceNameSpace, Status } from '../../consts/enums';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, ThunkConfig } from '../../types/store';
import client from '../../services/api';
import { filterCameras } from '../../utiils/filter';
import queryString from 'query-string';
import { QueryParseResult } from '../../types/app';

type InitialState = {
  camerasStatus: Status;
  fullLoadStatus: {
    status: Status;
    page: number;
  };
  promoStatus: Status;
  cameras: Camera[];
  promo: Promo | null;
}

const initialState: InitialState = {
  camerasStatus: Status.Idle,
  promoStatus: Status.Idle,
  fullLoadStatus: {
    status: Status.Loading,
    page: 0
  },
  cameras: [],
  promo: null
};

const getCameras = createAsyncThunk<Camera[], undefined, ThunkConfig>(
  `${SliceNameSpace.Catalog}/getCameras`,
  async (_, { extra: api, dispatch }) => {
    const query = window.location.search;
    const parsedQuery = queryString.parse(window.location.search) as QueryParseResult;

    const { data: cameras } = await api.fetchCameras();

    const filteredCameras = filterCameras(cameras, query);

    const totalPages = Math.ceil(cameras.length / MaxElementCount.ProductCard);
    const currentPage = +(parsedQuery.page || 1) > totalPages ? 1 : +(parsedQuery.page || 1);
    const sliceStart = (currentPage - 1) * MaxElementCount.ProductCard;
    const leftCameras = filteredCameras.length - sliceStart;
    const maxElementsCount = Math.min(leftCameras, filteredCameras.length, MaxElementCount.ProductCard);

    const camerasWithRating = filteredCameras.slice();
    for (let i = sliceStart; i < sliceStart + maxElementsCount; i++) {
      const { data: reviews } = await client.getReviews(cameras[i].id.toString());

      const rating = Math.round(reviews.reduce((total, review) => total + review.rating, 0) / reviews.length);

      camerasWithRating[i] = { ...filteredCameras[i], rating };
    }

    dispatch(getCamerasFull());
    dispatch(catalogSlice.actions.initPage(currentPage));

    return camerasWithRating;
  }
);

const getCamerasFull = createAsyncThunk<Camera[], undefined, ThunkConfig>(
  `${SliceNameSpace.Catalog}/getCamerasFull`,
  async (currentPage, { extra: api }) => {
    const camerasWithRating: Camera[] = [];
    const query = window.location.search;

    const { data: cameras } = await api.fetchCameras();

    const filteredCameras = filterCameras(cameras, query);

    for (let i = 0; i < filteredCameras.length; i++) {
      const { data: reviews } = await client.getReviews(cameras[i].id.toString());

      const rating = Math.round(reviews.reduce((total, review) => total + review.rating, 0) / reviews.length);

      camerasWithRating.push({ ...filteredCameras[i], rating });
    }
    return camerasWithRating;
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
  reducers: {
    initPage(state, action: PayloadAction<number>) {
      state.fullLoadStatus.page = action.payload;
    }
  },
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
        state.fullLoadStatus.status = Status.Success;
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
const selectCamerasFullLoadStatus = (state: RootState) => state[SliceNameSpace.Catalog].fullLoadStatus;
const selectPromo = (state: RootState) => state[SliceNameSpace.Catalog].promo;
const selectPromoStatus = (state: RootState) => state[SliceNameSpace.Catalog].promoStatus;

export default catalogSlice.reducer;
export {
  getCameras,
  getPromo,
  selectCameras,
  selectCamerasStatus,
  selectPromo,
  selectPromoStatus,
  selectCamerasFullLoadStatus,
  initialState
};
