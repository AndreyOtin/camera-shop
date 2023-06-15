import { ReactNode } from 'react';
import { Provider } from 'react-redux';
import { HelmetProvider } from 'react-helmet-async';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { RootState } from '../types/store';
import { DeepPartial } from '@reduxjs/toolkit';
import thunk, { ThunkDispatch } from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import { Action } from 'redux';
import client, { api } from '../services/api';
import { createMemoryHistory } from 'history';
import HistoryRouter from '../components/history-router/history-router';
import { Route, Routes } from 'react-router-dom';
import Layout from '../components/layout/layout';
import { AppRoute } from '../consts/enums';

const mockStore = configureMockStore<RootState>()({});
const history = createMemoryHistory();

type TestWrapperProps = {
  children: ReactNode;
  fakeStore?: typeof mockStore;
  fakeHistory?: typeof history;
}

type RoutesWrapperProps = {
  jsxElement: JSX.Element;
}

const ProviderWrapper = ({ children, fakeStore, fakeHistory }: TestWrapperProps) => {
  const store = configureMockStore<RootState>()({});
  const brHistory = createMemoryHistory();

  return (
    <Provider store={fakeStore || store}>
      <HistoryRouter history={fakeHistory || brHistory}>
        <HelmetProvider>
          {children}
        </HelmetProvider>
      </HistoryRouter>
    </Provider>
  );
};

const RoutesWrapper = ({ jsxElement }: RoutesWrapperProps) => (
  <Routes>
    <Route path={AppRoute.Root} element={<Layout/>}>
      <Route
        index
        element={
          jsxElement
        }
      />
      <Route
        path="*"
        element={
          <div>not found</div>
        }
      />
    </Route>
  </Routes>
);

const createMockStoreWithAPI = (fakeState: DeepPartial<RootState>) => {
  const mockAPI = new MockAdapter(api);
  const middlewares = [thunk.withExtraArgument(client)];

  const fakeStore = configureMockStore<
    RootState,
    Action<string>,
    ThunkDispatch<RootState, typeof client, Action<string>>
  >(middlewares)(fakeState);

  return { fakeStore, mockAPI };
};

export { ProviderWrapper, createMockStoreWithAPI, RoutesWrapper };
