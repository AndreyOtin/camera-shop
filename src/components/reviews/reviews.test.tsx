import { createMockStore } from '../../utiils/mock';
import { createMockStoreWithAPI, ProviderWrapper, RoutesWrapper } from '../../utiils/jest';
import { render, screen } from '@testing-library/react';
import Reviews from './reviews';

const store = createMockStore();
const { fakeStore } = createMockStoreWithAPI(store);

describe('Component: Reviews', () => {
  it('should render correctly', () => {
    render(
      <ProviderWrapper fakeStore={fakeStore}>
        <RoutesWrapper jsxElement={<Reviews/>}/>
      </ProviderWrapper>
    );
    expect(screen.getByText('Оставить свой отзыв')).toBeInTheDocument();
    expect(screen.getByText('Отзывы')).toBeInTheDocument();
  });
});
