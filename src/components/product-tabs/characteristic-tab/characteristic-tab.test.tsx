import { createMockStore } from '../../../utiils/mock';
import { createMockStoreWithAPI, ProviderWrapper } from '../../../utiils/jest';
import { render, screen } from '@testing-library/react';
import CharacteristicTab from './characteristic-tab';

const store = createMockStore();
const { fakeStore } = createMockStoreWithAPI(store);

describe('Component: CharacteristicTab', () => {
  it('should render correctly', () => {
    render(
      <ProviderWrapper fakeStore={fakeStore}>
        <CharacteristicTab isActive/>
      </ProviderWrapper>
    );


    expect(screen.getByTestId('characteristic-tab-text')).toBeInTheDocument();
  });
});
