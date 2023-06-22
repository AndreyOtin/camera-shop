import { render, screen } from '@testing-library/react';
import CatalogFilter from './catalog-filter';
import { createMockStoreWithAPI, ProviderWrapper } from '../../utiils/jest';
import { createMockStore } from '../../utiils/mock';

const store = createMockStore();
const { fakeStore } = createMockStoreWithAPI(store);

describe('Component: CatalogFilter', () => {
  it('should render correctly', () => {
    render(
      <ProviderWrapper fakeStore={fakeStore}>
        <CatalogFilter maxPrice="100" minPrice="0"/>
      </ProviderWrapper>
    );

    expect(screen.getByText('Фотокамера')).toBeInTheDocument();
    expect(screen.getByText('Тип камеры')).toBeInTheDocument();
  });
});
