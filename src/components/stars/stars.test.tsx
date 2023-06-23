import { createMockStore } from '../../utiils/mock';
import { createMockStoreWithAPI, ProviderWrapper, RoutesWrapper } from '../../utiils/jest';
import { render, screen } from '@testing-library/react';
import Stars from './stars';

const store = createMockStore();
const { fakeStore } = createMockStoreWithAPI(store);

describe('Component: Stars', () => {
  it('should render correctly', () => {
    render(
      <ProviderWrapper fakeStore={fakeStore}>
        <RoutesWrapper jsxElement={<Stars rating={4}/>}/>
      </ProviderWrapper>
    );

    expect(screen.getAllByTestId('star')).toHaveLength(5);
  });
});
