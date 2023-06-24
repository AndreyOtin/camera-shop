import { createMockStore } from '../../../utiils/mock';
import { createMockStoreWithAPI, ProviderWrapper } from '../../../utiils/jest';
import { render, screen } from '@testing-library/react';
import CategoryFilter from './category-filter';

const store = createMockStore();
const { fakeStore } = createMockStoreWithAPI(store);

describe('Component: CategoryFilter', () => {
  it('should render correctly', () => {
    render(
      <ProviderWrapper fakeStore={fakeStore}>
        <CategoryFilter key={1} onChange={jest.fn}/>
      </ProviderWrapper>
    );

    expect(screen.getByText('Категория')).toBeInTheDocument();
  });
});
