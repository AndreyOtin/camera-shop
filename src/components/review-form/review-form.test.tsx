import { createMockStore } from '../../utiils/mock';
import { createMockStoreWithAPI, ProviderWrapper, RoutesWrapper } from '../../utiils/jest';
import { render, screen } from '@testing-library/react';
import ReviewForm from './review-form';

const store = createMockStore();
const { fakeStore } = createMockStoreWithAPI(store);

describe('Component: ReviewForm', () => {
  it('should render correctly', () => {
    render(
      <ProviderWrapper fakeStore={fakeStore}>
        <RoutesWrapper jsxElement={<ReviewForm/>}/>
      </ProviderWrapper>
    );

    expect(screen.getByText('Достоинства')).toBeInTheDocument();
  });
});
