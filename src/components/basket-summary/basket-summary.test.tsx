import { createMockStore } from '../../utiils/mock';
import { createMockStoreWithAPI, ProviderWrapper, RoutesWrapper } from '../../utiils/jest';
import { render, screen } from '@testing-library/react';
import BasketSummary from './basket-summary';

const store = createMockStore();
const { fakeStore } = createMockStoreWithAPI(store);

describe('Component: BasketSummary', () => {
  it('should render correctly', () => {
    render(
      <ProviderWrapper fakeStore={fakeStore}>
        <RoutesWrapper jsxElement={
          <BasketSummary/>
        }
        />
      </ProviderWrapper>
    );

    expect(screen.getByText('Если у вас есть промокод на скидку, примените его в этом поле')).toBeInTheDocument();
  });
});
