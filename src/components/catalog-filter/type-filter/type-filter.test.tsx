import { createMockStore } from '../../../utiils/mock';
import { createMockStoreWithAPI, ProviderWrapper, RoutesWrapper } from '../../../utiils/jest';
import { render, screen } from '@testing-library/react';
import TypeFilter from './type-filter';
import { typeFilter } from '../../../consts/filter';


const store = createMockStore();
const { fakeStore } = createMockStoreWithAPI(store);

describe('Component: TypeFilter', () => {
  it('should render correctly', () => {
    render(
      <ProviderWrapper fakeStore={fakeStore}>
        <RoutesWrapper jsxElement={<TypeFilter onChange={jest.fn} filter={typeFilter}/>}/>
      </ProviderWrapper>
    );

    expect(screen.getByText('Тип камеры')).toBeInTheDocument();
  });
});
