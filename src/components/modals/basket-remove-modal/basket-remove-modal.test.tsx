import { render, screen } from '@testing-library/react';
import { createMockStoreWithAPI, ProviderWrapper, RoutesWrapper } from '../../../utiils/jest';
import { createMockStore } from '../../../utiils/mock';
import BasketRemoveModal from './basket-remove-modal';

const store = createMockStore();
const { fakeStore } = createMockStoreWithAPI(store);

describe('Component: BasketRemoveModal', () => {
  it('should render correctly', () => {
    render(
      <ProviderWrapper fakeStore={fakeStore}>
        <RoutesWrapper jsxElement={<BasketRemoveModal contentRef={{ current: document.createElement('div') }}/>}/>
      </ProviderWrapper>
    );

    expect(screen.getByText('Удалить этот товар?')).toBeInTheDocument();
  });
});
