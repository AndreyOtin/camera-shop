import { render, screen } from '@testing-library/react';
import { createMockStoreWithAPI, ProviderWrapper, RoutesWrapper } from '../../../utiils/jest';
import { createMockStore } from '../../../utiils/mock';
import AddItemSuccessModal from './add-item-success-modal';

const store = createMockStore();
const { fakeStore } = createMockStoreWithAPI(store);

describe('Component: AddItemSuccessModal', () => {
  it('should render correctly', () => {
    render(
      <ProviderWrapper fakeStore={fakeStore}>
        <RoutesWrapper jsxElement={<AddItemSuccessModal contentRef={{ current: document.createElement('div') }}/>}/>
      </ProviderWrapper>
    );


    expect(screen.getByText('Товар успешно добавлен в корзину')).toBeInTheDocument();
  });
});
