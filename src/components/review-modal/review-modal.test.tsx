import { render, screen } from '@testing-library/react';
import { ProviderWrapper, RoutesWrapper } from '../../utiils/jest';
import ReviewModal from './review-modal';

describe('Component: ReviewModal', () => {
  it('should render correctly', () => {
    render(
      <ProviderWrapper>
        <RoutesWrapper jsxElement={<ReviewModal cameraId={1}/>}/>
      </ProviderWrapper>
    );


    expect(screen.getByText('Оставить отзыв')).toBeInTheDocument();
  });
});
