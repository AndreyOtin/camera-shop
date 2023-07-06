import { EntityAdapter, EntityId, EntityState } from '@reduxjs/toolkit';
import { RootState } from '../types/store';
import { LOCAL_STORAGE_BASKET } from '../consts/app';

const getInitialEntityAdapterState = <T, S extends object>(
  adapter: EntityAdapter<T>,
  initialState: S,
  localStorageResult?: string | null
) => {
  if (localStorageResult) {
    const result = JSON.parse(localStorageResult) as EntityState<T> & S;
    return adapter.setAll(
      adapter.getInitialState({ ...result }),
      result.entities as Record<EntityId, T>
    );
  }

  return adapter.getInitialState<S>(initialState);
};


const calculateTotalWithCoupon = (state: RootState['basket'], bonus: number) => {
  state.coupon = Math.round((bonus / 100) * state.total);
  state.totalWithCoupon = state.total - state.coupon;
};

const saveToLocalStorage = (state: RootState['basket']) => {
  const data = { ...state, totalWithCoupon: 0, coupon: 0, couponPercent: 0 } as RootState['basket'];
  localStorage.setItem(LOCAL_STORAGE_BASKET, JSON.stringify(data));
};

export { getInitialEntityAdapterState, saveToLocalStorage, calculateTotalWithCoupon };
