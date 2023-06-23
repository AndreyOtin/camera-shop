import { createMockStore } from '../../../utiils/mock';
import { createMockStoreWithAPI, ProviderWrapper, RoutesWrapper } from '../../../utiils/jest';
import { render, screen } from '@testing-library/react';
import LevelFilter from './level-filter';

const store = createMockStore();
const { fakeStore } = createMockStoreWithAPI(store);

describe('Component: LevelFilter', () => {
  it('should render correctly', () => {
    render(
      <ProviderWrapper fakeStore={fakeStore}>
        <RoutesWrapper jsxElement={<LevelFilter/>}/>
      </ProviderWrapper>
    );

    expect(screen.getByText('Уровень')).toBeInTheDocument();
  });
});
