import { render, screen } from '@testing-library/react';
import { createMockStoreWithAPI, ProviderWrapper, RoutesWrapper } from '../../utiils/jest';
import PreviewModal from './preview-modal';
import { createMockStore } from '../../utiils/mock';

const store = createMockStore();
const { fakeStore } = createMockStoreWithAPI(store);

describe('Component: PreviewModal', () => {
  it('should render correctly', () => {
    render(
      <ProviderWrapper fakeStore={fakeStore}>
        <RoutesWrapper jsxElement={<PreviewModal contentRef={{ current: document.createElement('div') }}/>}/>
      </ProviderWrapper>
    );

    expect(screen.getByText('Добавить товар в корзину')).toBeInTheDocument();
  });
});
