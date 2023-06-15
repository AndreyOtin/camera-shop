import { createFakeCamera, createMockStore } from '../../utiils/mock';
import { render, screen } from '@testing-library/react';
import SimilarProductsSlider from './similar-products-slider';
import { createMockStoreWithAPI, ProviderWrapper, RoutesWrapper } from '../../utiils/jest';

const fakeProducts = [createFakeCamera()];
const store = createMockStore();
const { fakeStore } = createMockStoreWithAPI(store);

describe('Component: SimilarProductsSlider', () => {
  it('should render correctly', () => {
    render(
      <ProviderWrapper fakeStore={fakeStore}>
        <RoutesWrapper jsxElement={<SimilarProductsSlider products={fakeProducts}/>}/>
      </ProviderWrapper>
    );

    expect(screen.getByTestId('slider')).toBeInTheDocument();
  });
});
