import { combineReducers, configureStore } from '@reduxjs/toolkit';
import client from '../services/api';
import { SliceNameSpace } from '../consts/enums';
import catalogSlice from './catalog-slice/catalog-slice';
import productSlice from './product-slice/product-slice';

const rootReducer = combineReducers({
  [SliceNameSpace.Catalog]: catalogSlice,
  [SliceNameSpace.Product]: productSlice
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: { extraArgument: client } })
});

export { store, rootReducer };
