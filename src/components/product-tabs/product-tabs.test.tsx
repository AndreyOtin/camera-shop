import { render, screen } from '@testing-library/react';
import { createMockStoreWithAPI, ProviderWrapper } from '../../utiils/jest';
import ProductTabs from './product-tabs';
import { createMockStore } from '../../utiils/mock';

const store = createMockStore();
const { fakeStore } = createMockStoreWithAPI(store);

describe('Component: ProductTabs', () => {
  it('should render correctly', () => {
    render(
      <ProviderWrapper fakeStore={fakeStore}>
        <ProductTabs/>
      </ProviderWrapper>
    );


    expect(screen.getByText('Описание')).toBeInTheDocument();
  });
});
