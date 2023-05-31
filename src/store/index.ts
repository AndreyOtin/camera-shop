import { combineReducers, configureStore } from '@reduxjs/toolkit';
import client from '../services/api';
import { SliceNameSpace } from '../consts/enums';
import catalogSlice from './catalog-slice/catalog-slice';

const rootReducer = combineReducers({
  [SliceNameSpace.Catalog]: catalogSlice
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: { extraArgument: client } })
});

export { store, rootReducer };
