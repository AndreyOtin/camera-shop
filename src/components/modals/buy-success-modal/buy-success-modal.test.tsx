import { render, screen } from '@testing-library/react';
import { createMockStoreWithAPI, ProviderWrapper, RoutesWrapper } from '../../../utiils/jest';
import { createMockStore } from '../../../utiils/mock';
import BuySuccessModal from './buy-success-modal';

const store = createMockStore();
const { fakeStore } = createMockStoreWithAPI(store);

describe('Component: BuySuccessModal', () => {
  it('should render correctly', () => {
    render(
      <ProviderWrapper fakeStore={fakeStore}>
        <RoutesWrapper jsxElement={<BuySuccessModal contentRef={{ current: document.createElement('div') }}/>}/>
      </ProviderWrapper>
    );

    expect(screen.getByText('Спасибо за покупку')).toBeInTheDocument();
  });
});
