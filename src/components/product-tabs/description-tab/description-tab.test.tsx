import { createMockStore } from '../../../utiils/mock';
import { createMockStoreWithAPI, ProviderWrapper } from '../../../utiils/jest';
import { render, screen } from '@testing-library/react';
import DescriptionTab from './description-tab';

const store = createMockStore();
const { fakeStore } = createMockStoreWithAPI(store);

describe('Component: DescriptionTab', () => {
  it('should render correctly', () => {
    render(
      <ProviderWrapper fakeStore={fakeStore}>
        <DescriptionTab isActive/>
      </ProviderWrapper>
    );


    expect(screen.getByTestId('description-tab-text')).toBeInTheDocument();
  });
});
