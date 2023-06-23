import { render, screen } from '@testing-library/react';
import Header from './header';
import { createMockStoreWithAPI, ProviderWrapper } from '../../utiils/jest';
import { createMockStore } from '../../utiils/mock';

const store = createMockStore();
const { fakeStore } = createMockStoreWithAPI(store);

describe('Component: Header', () => {
  it('should render correctly', () => {
    render(
      <ProviderWrapper fakeStore={fakeStore}>
        <Header/>
      </ProviderWrapper>
    );

    expect(screen.getByTestId('form-search')).toBeInTheDocument();
    expect(screen.getByText('Сбросить поиск')).toBeInTheDocument();
  });
});
