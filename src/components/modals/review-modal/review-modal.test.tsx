import { render, screen } from '@testing-library/react';
import { createMockStoreWithAPI, ProviderWrapper, RoutesWrapper } from '../../../utiils/jest';
import ReviewModal from './review-modal';
import { createMockStore } from '../../../utiils/mock';

const store = createMockStore();
const { fakeStore } = createMockStoreWithAPI(store);

describe('Component: ReviewModal', () => {
  it('should render correctly', () => {
    render(
      <ProviderWrapper fakeStore={fakeStore}>
        <RoutesWrapper jsxElement={<ReviewModal contentRef={{ current: document.createElement('div') }}/>}/>
      </ProviderWrapper>
    );


    expect(screen.getByText('Оставить отзыв')).toBeInTheDocument();
  });
});
