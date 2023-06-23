import { createFakeCamera, createMockStore } from '../../utiils/mock';
import { createMockStoreWithAPI, ProviderWrapper, RoutesWrapper } from '../../utiils/jest';
import { render, screen } from '@testing-library/react';
import CatalogContent from './catalog-content';

const store = createMockStore();
const { fakeStore } = createMockStoreWithAPI(store);

describe('Component: CatalogContent', () => {
  it('should render correctly', () => {
    render(
      <ProviderWrapper fakeStore={fakeStore}>
        <RoutesWrapper jsxElement={<CatalogContent bannerPosition={0} cameras={[createFakeCamera()]}/>}/>
      </ProviderWrapper>
    );

    expect(screen.getByTestId('catalog-content')).toBeInTheDocument();
  });
});
