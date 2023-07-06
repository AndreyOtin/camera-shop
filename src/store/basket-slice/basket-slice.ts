import { BasketCamera, Camera } from '../../types/camera';
import { createAsyncThunk, createEntityAdapter, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SliceNameSpace, Status } from '../../consts/enums';
import { RootState, ThunkConfig } from '../../types/store';
import { LOCAL_STORAGE_BASKET } from '../../consts/app';
import { calculateTotalWithCoupon, getInitialEntityAdapterState, saveToLocalStorage } from '../../utiils/store';
import { Coupon } from '../../types/coupon';
import { NewOrder } from '../../types/order';

type InitialState = {
  totalCount: number;
  total: number;
  coupon: number;
  totalWithCoupon: number;
  couponStatus: Status;
  couponPercent: number;
  couponName: string;
}

const initialState: InitialState = {
  totalCount: 0,
  total: 0,
  coupon: 0,
  totalWithCoupon: 0,
  couponStatus: Status.Idle,
  couponPercent: 0,
  couponName: ''
};

const checkCoupon = createAsyncThunk<Coupon, string, ThunkConfig>(
  `${SliceNameSpace.Basket}/checkCoupon`,
  async (coupon, { extra: api }) => {
    const { data } = await api.checkCoupon(coupon);

    return {
      couponPercent: data,
      coupon
    };
  }
);

const postOrder = createAsyncThunk<void, NewOrder, ThunkConfig>(
  `${SliceNameSpace.Basket}/postOrder`,
  async (order, { extra: api }) => {
    await api.postOrder(order);
  }
);

const productsAdapter = createEntityAdapter<BasketCamera>();

const localStorageResult = localStorage.getItem(LOCAL_STORAGE_BASKET);

const stateWithAdapter = getInitialEntityAdapterState(productsAdapter, initialState, localStorageResult);

const basketSlice = createSlice({
  initialState: stateWithAdapter,
  name: SliceNameSpace.Basket,
  reducers: {
    changeCount(state, action: PayloadAction<{ id: number; count: number }>) {
      const product = state.entities[action.payload.id];

      if (product) {
        state.totalCount -= product.count;
        product.count = action.payload.count;

        state.total -= product.totalPrice;
        product.totalPrice = product.count * product.price;

        state.totalCount += product.count;
        state.total += product.totalPrice;

        saveToLocalStorage(state);
        calculateTotalWithCoupon(state, state.couponPercent);
      }
    },
    increaseCount(state, action: PayloadAction<Camera>) {
      const product = state.entities[action.payload.id];

      if (product) {
        product.count++;
        product.totalPrice = product.count * product.price;

        state.totalCount++;
        state.total += product.price;

        saveToLocalStorage(state);
        calculateTotalWithCoupon(state, state.couponPercent);
      }
    },
    decreaseCount(state, action: PayloadAction<Camera>) {
      const product = state.entities[action.payload.id];

      if (product) {
        product.count--;
        product.totalPrice = product.count * product.price;

        state.totalCount--;
        state.total -= product.price;

        saveToLocalStorage(state);
        calculateTotalWithCoupon(state, state.couponPercent);
      }
    },
    addCameraToBasket(state, action: PayloadAction<Camera>) {
      const product = state.entities[action.payload.id];

      if (product) {
        product.count++;
        product.totalPrice = product.count * product.price;

        state.total += product.price;
      } else {
        state.total += action.payload.price;
        productsAdapter.addOne(state, { ...action.payload, count: 1, totalPrice: action.payload.price });
      }

      state.totalCount++;
      saveToLocalStorage(state);
      calculateTotalWithCoupon(state, state.couponPercent);
    },
    removeCameraFromBasket(state, action: PayloadAction<Camera>) {
      const product = state.entities[action.payload.id];

      if (product) {
        state.totalCount -= product.count;
        state.total -= product.totalPrice;
      }

      productsAdapter.removeOne(state, action.payload.id);
      saveToLocalStorage(state);
      calculateTotalWithCoupon(state, state.couponPercent);
    },
    changePromoStatus(state) {
      state.couponStatus = Status.Idle;
    },
    resetBasket() {
      localStorage.removeItem(LOCAL_STORAGE_BASKET);
      return productsAdapter.getInitialState(initialState);
    },
  },
  extraReducers(builder) {
    builder
      .addCase(checkCoupon.fulfilled, (state, action) => {
        state.couponPercent = +action.payload.couponPercent;
        state.couponName = action.payload.coupon;
        state.couponStatus = Status.Success;
        calculateTotalWithCoupon(state, state.couponPercent);
      })
      .addCase(checkCoupon.rejected, (state) => {
        state.couponStatus = Status.Error;
      });
  }
});


export const {
  selectIds,
  selectById: selectProductById,
  selectAll: selectAllBasketProducts,
} = productsAdapter.getSelectors<RootState>((state) => state[SliceNameSpace.Basket]);
const selectBasketProductsCount = (state: RootState) => state[SliceNameSpace.Basket].totalCount;
const selectBasketProductsTotal = (state: RootState) => state[SliceNameSpace.Basket].total;
const selectCouponStatus = (state: RootState) => state[SliceNameSpace.Basket].couponStatus;
const selectCoupon = (state: RootState) => state[SliceNameSpace.Basket].coupon;
const selectCouponName = (state: RootState) => state[SliceNameSpace.Basket].couponName;
const selectTotalWithCoupon = (state: RootState) => state[SliceNameSpace.Basket].totalWithCoupon;

export default basketSlice.reducer;
export const {
  changePromoStatus,
  addCameraToBasket,
  removeCameraFromBasket,
  increaseCount,
  decreaseCount,
  changeCount,
  resetBasket
} = basketSlice.actions;
export {
  postOrder,
  selectCouponName,
  selectBasketProductsCount,
  selectBasketProductsTotal,
  checkCoupon,
  selectTotalWithCoupon,
  selectCouponStatus,
  selectCoupon
};
