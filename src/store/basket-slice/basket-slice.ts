import { BasketCamera, Camera } from '../../types/camera';
import { createEntityAdapter, createSlice, EntityId, EntityState, PayloadAction } from '@reduxjs/toolkit';
import { SliceNameSpace } from '../../consts/enums';
import { RootState } from '../../types/store';
import { LOCAL_STORAGE_BASKET } from '../../consts/app';

type InitialState = {
  totalCount: number;
}

export const productsAdapter = createEntityAdapter<BasketCamera>();

const localStorageResult = localStorage.getItem(LOCAL_STORAGE_BASKET);

let initialState = productsAdapter.getInitialState<InitialState>({ totalCount: 0 });

if (localStorageResult) {
  const result = JSON.parse(localStorageResult) as EntityState<BasketCamera> & InitialState;
  initialState = productsAdapter.setAll(
    productsAdapter.getInitialState({ totalCount: result.totalCount }),
    result.entities as Record<EntityId, BasketCamera>
  );
}

const basketSlice = createSlice({
  initialState,
  name: SliceNameSpace.Basket,
  reducers: {
    changeCount(state, action: PayloadAction<{ id: number; count: number }>) {
      const product = state.entities[action.payload.id];

      if (product) {
        state.totalCount -= product.count;
        product.count = action.payload.count;
        product.totalPrice = product.count * product.price;
        state.totalCount += product.count;
        localStorage.setItem(LOCAL_STORAGE_BASKET, JSON.stringify(state));
      }
    },
    increaseCount(state, action: PayloadAction<Camera>) {
      const product = state.entities[action.payload.id];

      if (product) {
        product.count++;
        product.totalPrice = product.count * product.price;
        state.totalCount++;
        localStorage.setItem(LOCAL_STORAGE_BASKET, JSON.stringify(state));
      }
    },
    decreaseCount(state, action: PayloadAction<Camera>) {
      const product = state.entities[action.payload.id];

      if (product) {
        product.count--;
        product.totalPrice = product.count * product.price;
        state.totalCount--;
        localStorage.setItem(LOCAL_STORAGE_BASKET, JSON.stringify(state));
      }
    },
    addCameraToBasket(state, action: PayloadAction<Camera>) {
      const product = state.entities[action.payload.id];

      if (product) {
        product.count++;
        product.totalPrice = product.count * product.price;
      } else {
        productsAdapter.addOne(state, { ...action.payload, count: 1, totalPrice: action.payload.price });
      }

      state.totalCount++;
      localStorage.setItem(LOCAL_STORAGE_BASKET, JSON.stringify(state));
    },
    removeCameraFromBasket(state, action: PayloadAction<Camera>) {
      const product = state.entities[action.payload.id];

      if (product) {
        state.totalCount -= product.count;
      }

      productsAdapter.removeOne(state, action.payload.id);
      localStorage.setItem(LOCAL_STORAGE_BASKET, JSON.stringify(state));
    }
  },
});


export const {
  selectById: selectProductById,
  selectAll: selectAllBasketProducts,
} = productsAdapter.getSelectors<RootState>((state) => state[SliceNameSpace.Basket]);
const selectTotalBasketProducts = (state: RootState) => state[SliceNameSpace.Basket].totalCount;

export default basketSlice.reducer;
export const {
  addCameraToBasket,
  removeCameraFromBasket,
  increaseCount,
  decreaseCount,
  changeCount
} = basketSlice.actions;
export { selectTotalBasketProducts };
