import { createMockStore } from '../../../utiils/mock';
import { createMockStoreWithAPI, ProviderWrapper, RoutesWrapper } from '../../../utiils/jest';
import { render, screen } from '@testing-library/react';
import TypeFilter from './type-filter';

const store = createMockStore();
const { fakeStore } = createMockStoreWithAPI(store);

describe('Component: TypeFilter', () => {
  it('should render correctly', () => {
    render(
      <ProviderWrapper fakeStore={fakeStore}>
        <RoutesWrapper jsxElement={<TypeFilter/>}/>
      </ProviderWrapper>
    );

    expect(screen.getByText('Тип камеры')).toBeInTheDocument();
  });
});
