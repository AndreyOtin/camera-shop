import { combineReducers, configureStore } from '@reduxjs/toolkit';
import client from '../services/api';
import { SliceNameSpace } from '../consts/enums';
import catalogSlice from './catalog-slice/catalog-slice';
import productSlice from './product-slice/product-slice';
import commentsSlice from './comments-slice/comments-slice';
import basketSlice from './basket-slice/basket-slice';

const rootReducer = combineReducers({
  [SliceNameSpace.Catalog]: catalogSlice,
  [SliceNameSpace.Product]: productSlice,
  [SliceNameSpace.Comments]: commentsSlice,
  [SliceNameSpace.Basket]: basketSlice
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: { extraArgument: client } })
});

export { store, rootReducer };
