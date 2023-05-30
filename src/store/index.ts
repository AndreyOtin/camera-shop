import {combineReducers, configureStore} from '@reduxjs/toolkit';
import client from '../services/api';

const rootReducer = combineReducers({});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({thunk: {extraArgument: client}})
});

export {store, rootReducer};
