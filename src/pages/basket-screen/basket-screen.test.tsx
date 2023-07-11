import { createMockStore } from '../../utiils/mock';
import { createMockStoreWithAPI, ProviderWrapper, RoutesWrapper } from '../../utiils/jest';
import { render, screen } from '@testing-library/react';
import BasketScreen from './basket-screen';

const store = createMockStore();
const { fakeStore } = createMockStoreWithAPI(store);

describe('Screen: BasketScreen', () => {
  it('should render correctly', () => {
    window.scrollTo = jest.fn();

    render(
      <ProviderWrapper fakeStore={fakeStore}>
        <RoutesWrapper jsxElement={<BasketScreen/>}/>;
      </ProviderWrapper>
    );

    expect(screen.getByText('Пусто')).toBeInTheDocument();
    expect(screen.getByText('Корзина')).toBeInTheDocument();
  });
});
