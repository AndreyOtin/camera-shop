import { createMockStore } from '../../utiils/mock';
import { createMockStoreWithAPI, ProviderWrapper, RoutesWrapper } from '../../utiils/jest';
import { render, screen } from '@testing-library/react';
import ProductCardScreen from './product-card-screen';

const store = createMockStore();
const { fakeStore } = createMockStoreWithAPI(store);

describe('Screen: ProductCard', () => {
  it('should render correctly', () => {
    window.scrollTo = jest.fn();

    render(
      <ProviderWrapper fakeStore={fakeStore}>
        <RoutesWrapper jsxElement={<ProductCardScreen/>}/>;
      </ProviderWrapper>
    );

    expect(screen.getByTestId('product-card-screen')).toBeInTheDocument();
    expect(window.scrollTo).toBeCalled();
  });
});
