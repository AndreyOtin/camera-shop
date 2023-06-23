import { render, screen } from '@testing-library/react';
import { createMockStoreWithAPI, ProviderWrapper, RoutesWrapper } from '../../utiils/jest';
import ProductCard from './product-card';
import { createFakeCamera, createMockStore } from '../../utiils/mock';

const fakeCamera = createFakeCamera();
const store = createMockStore();
const { fakeStore } = createMockStoreWithAPI(store);


describe('Component: ProductCard', () => {
  it('should render correctly', () => {
    render(
      <ProviderWrapper fakeStore={fakeStore}>
        <RoutesWrapper jsxElement={<ProductCard camera={fakeCamera}/>}/>
      </ProviderWrapper>
    );


    expect(screen.getByText('Всего оценок:')).toBeInTheDocument();
  });
});
