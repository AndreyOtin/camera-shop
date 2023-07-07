import { createFakeCamera, createMockStore } from '../../utiils/mock';
import { createMockStoreWithAPI, ProviderWrapper, RoutesWrapper } from '../../utiils/jest';
import { render, screen } from '@testing-library/react';
import BasketPreview from './basket-preview';

const store = createMockStore();
const { fakeStore } = createMockStoreWithAPI(store);
const camera = createFakeCamera();

describe('Component: BasketPreview', () => {
  it('should render correctly', () => {
    render(
      <ProviderWrapper fakeStore={fakeStore}>
        <RoutesWrapper jsxElement={
          <BasketPreview preview={camera}/>
        }
        />
      </ProviderWrapper>
    );

    expect(screen.getByText('Общая цена:')).toBeInTheDocument();
  });
});
