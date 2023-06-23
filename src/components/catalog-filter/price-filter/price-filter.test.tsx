import { createMockStore } from '../../../utiils/mock';
import { createMockStoreWithAPI, ProviderWrapper, RoutesWrapper } from '../../../utiils/jest';
import { render, screen } from '@testing-library/react';
import PriceFilter from './price-filter';

const store = createMockStore();
const { fakeStore } = createMockStoreWithAPI(store);

describe('Component: PriceFilter', () => {
  it('should render correctly', () => {
    render(
      <ProviderWrapper fakeStore={fakeStore}>
        <RoutesWrapper jsxElement={<PriceFilter max={'100'} min={'10'}/>}/>
      </ProviderWrapper>
    );

    expect(screen.getByPlaceholderText('100')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('10')).toBeInTheDocument();
  });
});
