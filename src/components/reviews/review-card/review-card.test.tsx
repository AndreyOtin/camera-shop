import { createFakeComment } from '../../../utiils/mock';
import { render, screen } from '@testing-library/react';
import ReviewCard from './review-card';


const fakeComment = createFakeComment();

describe('Component: ReviewCard', () => {
  it('should render correctly', () => {
    render(
      <ReviewCard review={fakeComment}/>
    );

    expect(screen.getByTestId('card-list')).toBeInTheDocument();
    expect(screen.getByText('Достоинства:')).toBeInTheDocument();
  });
});
