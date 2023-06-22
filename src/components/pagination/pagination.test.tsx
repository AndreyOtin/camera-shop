import { render, screen } from '@testing-library/react';
import { createMockStoreWithAPI, ProviderWrapper } from '../../utiils/jest';
import Pagination from './pagination';
import { createFakeCamera, createMockStore } from '../../utiils/mock';

const store = createMockStore();
const { fakeStore } = createMockStoreWithAPI(store);

describe('Component: Pagination', () => {
  it('should render correctly', () => {
    render(
      <ProviderWrapper fakeStore={fakeStore}>
        <Pagination bannerPosition={0} cameras={Array(10).fill(createFakeCamera())}/>
      </ProviderWrapper>
    );


    expect(screen.getByText('Далее')).toBeInTheDocument();
    expect(screen.getByText('1')).toBeInTheDocument();
  });
});
