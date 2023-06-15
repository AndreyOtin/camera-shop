import { createMockStore } from '../../utiils/mock';
import { createMockStoreWithAPI, ProviderWrapper, RoutesWrapper } from '../../utiils/jest';
import { render, screen } from '@testing-library/react';
import CatalogScreen from './catalog-screen';

const store = createMockStore();
const { fakeStore } = createMockStoreWithAPI(store);

describe('Screen: Catalog', () => {
  it('should render correctly', () => {

    render(
      <ProviderWrapper fakeStore={fakeStore}>
        <RoutesWrapper jsxElement={<CatalogScreen/>}/>;
      </ProviderWrapper>
    );

    expect(screen.getByText('Каталог фото- и видеотехники')).toBeInTheDocument();
  });
});
