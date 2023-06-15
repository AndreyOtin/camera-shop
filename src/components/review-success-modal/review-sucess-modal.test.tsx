import { render, screen } from '@testing-library/react';
import { createMockStoreWithAPI, ProviderWrapper } from '../../utiils/jest';
import ReviewSuccessModal from './review-success-modal';
import { createMockStore } from '../../utiils/mock';

const store = createMockStore();
const { fakeStore } = createMockStoreWithAPI(store);

describe('Component: ReviewSuccessModal', () => {
  it('should render correctly', () => {
    render(
      <ProviderWrapper fakeStore={fakeStore}>
        <ReviewSuccessModal/>
      </ProviderWrapper>
    );


    expect(screen.getByText('Спасибо за отзыв')).toBeInTheDocument();
  });
});
