import { render, screen } from '@testing-library/react';
import CatalogSort from './catalog-sort';
import { createMockStore } from '../../utiils/mock';
import { createMockStoreWithAPI, ProviderWrapper } from '../../utiils/jest';

const store = createMockStore();
const { fakeStore } = createMockStoreWithAPI(store);

describe('Component: CatalogSort', () => {
  it('should render correctly', () => {
    render(
      <ProviderWrapper fakeStore={fakeStore}>
        <CatalogSort/>
      </ProviderWrapper>
    );

    expect(screen.getByText('Сортировать:')).toBeInTheDocument();
    expect(screen.getByLabelText('по популярности')).toBeInTheDocument();
  });
});
