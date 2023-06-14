import { ReactNode } from 'react';
import { Provider } from 'react-redux';
import { HelmetProvider } from 'react-helmet-async';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { RootState } from '../types/store';
import { DeepPartial } from '@reduxjs/toolkit';
import thunk, { ThunkDispatch } from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import { BrowserRouter } from 'react-router-dom';
import { Action } from 'redux';
import { api } from '../services/api';

const mockStore = configureMockStore<RootState>()({});

type TestWrapperProps = {
  children: ReactNode;
  fakeStore?: typeof mockStore;
}

const ProviderWrapper = ({ children, fakeStore }: TestWrapperProps) => {
  const store = configureMockStore<RootState>()({});

  return (
    <Provider store={fakeStore || store}>
      <BrowserRouter>
        <HelmetProvider>
          {children}
        </HelmetProvider>
      </BrowserRouter>
    </Provider>
  );
};

const createMockStoreWithAPI = (fakeState: DeepPartial<RootState>) => {
  const mockAPI = new MockAdapter(api);
  const middlewares = [thunk.withExtraArgument(api)];

  const fakeStore = configureMockStore<
    RootState,
    Action<string>,
    ThunkDispatch<RootState, typeof api, Action<string>>
  >(middlewares)(fakeState);

  return { fakeStore, mockAPI };
};

export { ProviderWrapper, createMockStoreWithAPI };
