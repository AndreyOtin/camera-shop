import { render, screen } from '@testing-library/react';
import { createMockStoreWithAPI, ProviderWrapper, RoutesWrapper } from '../../../utiils/jest';
import { createMockStore } from '../../../utiils/mock';
import BuyErrorModal from './buy-error-modal';

const store = createMockStore();
const { fakeStore } = createMockStoreWithAPI(store);

describe('Component: BuyErrorModal', () => {
  it('should render correctly', () => {
    render(
      <ProviderWrapper fakeStore={fakeStore}>
        <RoutesWrapper jsxElement={<BuyErrorModal contentRef={{ current: document.createElement('div') }}/>}/>
      </ProviderWrapper>
    );

    expect(screen.getByText('Не удалось осуществить покупку')).toBeInTheDocument();
  });
});
