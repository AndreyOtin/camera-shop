import { render, screen } from '@testing-library/react';
import App from './app';
import { createMockStoreWithAPI, ProviderWrapper } from '../../utiils/jest';
import { AppRoute } from '../../consts/enums';
import { createMockStore } from '../../utiils/mock';
import { createMemoryHistory } from 'history';
import { generatePath } from 'react-router-dom';

const store = createMockStore();
const { fakeStore } = createMockStoreWithAPI(store);
const history = createMemoryHistory();

const fakeApp = (
  <ProviderWrapper fakeStore={fakeStore} fakeHistory={history}>
    <App/>
  </ProviderWrapper>
);

describe('Application Routing', () => {
  it('should render "CatalogScreen" when user navigate to "/"', () => {
    history.push(AppRoute.Root);

    render(fakeApp);

    expect(screen.getByText('Каталог фото- и видеотехники')).toBeInTheDocument();
  });

  it('should render "CatalogScreen" when user navigate to "/catalog.tsx"', () => {
    history.push(AppRoute.Catalog);

    render(fakeApp);

    expect(screen.getByText(/Каталог фото- и видеотехники/i)).toBeInTheDocument();
  });

  it('should render "ProductCardScreen" when user navigate to "/catalog.tsx/1"', () => {
    history.push(generatePath(AppRoute.Product, { product: '1' }));
    window.scrollTo = jest.fn();

    render(fakeApp);

    expect(screen.getByTestId('product-card-screen')).toBeInTheDocument();
    expect(window.scrollTo).toBeCalled();
  });

  it('should render "NotFoundPage" when user navigate to non-existent route', () => {
    history.push('/non-existent-route');

    render(fakeApp);

    expect(screen.getByText('Страница не найдена')).toBeInTheDocument();
  });
});
