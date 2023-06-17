import { ReactNode, useState } from 'react';
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
import { Outlet, Route, Routes } from 'react-router-dom';
import { AppRoute } from '../consts/enums';
import { PreviewModal } from '../types/app';
import Header from '../components/header/header';
import Footer from '../components/footer/footer';

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

const RoutesWrapper = ({ jsxElement }: RoutesWrapperProps) => {
  const [, setPreviewDisplay] = useState<PreviewModal>({ isModalOpened: false });
  const [, setReviewDisplay] = useState(false);

  const mockContext = {
    preview: { isModalOpened: true },
    isReviewOpened: true,
    setPreviewDisplay,
    setReviewDisplay
  };

  const mockLayout = (
    <div className="wrapper">
      <Header/>
      <Outlet context={mockContext}/>
      <Footer/>
    </div>
  );

  return (
    <Routes>
      <Route path={AppRoute.Root} element={mockLayout}>
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
};

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
