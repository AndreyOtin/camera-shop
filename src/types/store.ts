import client from '../services/api';
import { store } from '../store';

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export type ThunkConfig = {
  state: RootState;
  dispatch: AppDispatch;
  extra: typeof client;
}
