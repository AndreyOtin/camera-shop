import { Camera, Promo } from '../../types/camera';
import { SearchParam, SliceNameSpace, Status } from '../../consts/enums';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, ThunkConfig } from '../../types/store';
import { filterCameras } from '../../utiils/filter';
import queryString from 'query-string';
import getPaginationVariables from '../../utiils/pagination';
import sortBy from '../../utiils/sort';
import { ParsedQueryString } from '../../types/app';

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
    const parsedQuery = queryString.parse(window.location.search) as ParsedQueryString;
    const sortType = parsedQuery[SearchParam.SortType];
    const sortDirection = parsedQuery[SearchParam.SortDirection];

    const { data: cameras } = await api.fetchCameras();

    const { filteredCamerasWithPrice } = filterCameras(cameras, parsedQuery);

    if (sortType && sortDirection) {
      filteredCamerasWithPrice.sort(sortBy(sortType, sortDirection));
    }

    const {
      currentPage,
      sliceStart,
      sliceEnd,
    } = getPaginationVariables(filteredCamerasWithPrice.length, parsedQuery.page);


    for (let i = sliceStart; i < sliceEnd; i++) {
      const { data: reviews } = await api.getReviews(filteredCamerasWithPrice[i].id.toString());

      const rating = Math.ceil(reviews.reduce((total, review) => total + review.rating, 0) / reviews.length);

      filteredCamerasWithPrice[i] = { ...filteredCamerasWithPrice[i], rating: Number.isNaN(rating) ? 0 : rating };
    }

    dispatch(getCamerasFull());
    dispatch(catalogSlice.actions.initPage(currentPage));

    return filteredCamerasWithPrice;
  }
);

const getCamerasFull = createAsyncThunk<Camera[], undefined, ThunkConfig>(
  `${SliceNameSpace.Catalog}/getCamerasFull`,
  async (currentPage, { extra: api }) => {
    const { data: cameras } = await api.fetchCameras();

    const camerasWithRating: Camera[] = [];
    for (let i = 0; i < cameras.length; i++) {
      const { data: reviews } = await api.getReviews(cameras[i].id.toString());

      const rating = Math.ceil(reviews.reduce((total, review) => total + review.rating, 0) / reviews.length);

      camerasWithRating.push({ ...cameras[i], rating: Number.isNaN(rating) ? 0 : rating });
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
  getCamerasFull,
  initialState
};
