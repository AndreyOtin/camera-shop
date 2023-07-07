import { createFakeCamera, createMockStore } from '../../utiils/mock';
import { createMockStoreWithAPI, ProviderWrapper, RoutesWrapper } from '../../utiils/jest';
import { render, screen } from '@testing-library/react';
import AddItemButton from './add-item-button';

const store = createMockStore();
const { fakeStore } = createMockStoreWithAPI(store);
const camera = createFakeCamera();

describe('Component: AddItemButton', () => {
  it('should render correctly', () => {
    render(
      <ProviderWrapper fakeStore={fakeStore}>
        <RoutesWrapper jsxElement={
          <AddItemButton camera={camera}/>
        }
        />
      </ProviderWrapper>
    );

    expect(screen.getByText('Добавить в корзину')).toBeInTheDocument();
  });
});
